import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { characters } from './mock-data.js';
import { CharacterListResponse } from './model.js';

let db = {
  characters,
};

const app = new Hono();
app.use(logger());

app.use('/api/*', cors());

app.get('/api/character', async (context) => {
  console.log(`Total personajes: ${db.characters.length}`);
  console.log(`First character bestSentence: "${db.characters[0]?.bestSentence || 'No tiene sentence'}"`);

  const response: CharacterListResponse = {
    info: {
      count: db.characters.length,
    },
    results: db.characters,
  };

  return context.json(response);
});

app.get('/api/character/:id', (context) => {
  const id = context.req.param('id');
  console.log(`>>> [SERVER] Fetching personaje por su ID: ${id}`);

  const character = db.characters.find((c) => c.id === Number(id));

  if (character) {
    console.log(`Personaje encontrado: ${character.name}`);
    console.log(`Best sentence: "${character.bestSentence || 'No tiene sentence'}"`);
    console.log(`Character data:`, JSON.stringify(character, null, 2));
  } else {
    console.log(`Personaje no encontrado con ID: ${id}`);
  }

  return context.json(character);
});

app.put('/api/character/:id', async (context) => {
  const id = Number(context.req.param('id'));
  const updateData = await context.req.json();

  console.log(`Updating character ${id} with data:`, JSON.stringify(updateData, null, 2));

  const originalCharacter = db.characters.find((c) => c.id === id);
  if (originalCharacter) {
    console.log(`Original best sentence: "${originalCharacter.bestSentence || 'No tiene sentence'}"`);
  }

  db.characters = db.characters.map((c) =>
    c.id === id ? { ...c, ...updateData } : c
  );

  const updatedCharacter = db.characters.find((c) => c.id === id);
  if (updatedCharacter) {
    console.log(`Updated best sentence: "${updatedCharacter.bestSentence || 'No tiene sentence'}"`);
  }

  console.log('Response: 204 No Content');
  return context.body(null, 204);
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`API running on ${info.port}`);
});
