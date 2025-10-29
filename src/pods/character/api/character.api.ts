import { CharacterApi, CharactersResponseApi } from './character.api-model';
import { API_CONFIG } from '#common/config/api.config';


export const getCharacters = async (page: number = 1): Promise<CharactersResponseApi> => {
  try {
    console.log('Fetch personajes desde GraphQL, página:', page);

    // Query de GraphQL para traer campos especificos de los personajes
    const query = `
      query GetCharacters($page: Int) {
        characters(page: $page) {
          info {
            count, pages, next, prev
          }
          results {
            id, name, status, species, type, gender, origin { name }, location { name }, image, episode { id, name }, created
            image
            episode {
              id
              name
            }
            created
          }
        }
      }
    `;

    const response = await fetch(API_CONFIG.GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { page },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('>>data de GraphQL:', data);

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error('GraphQL errors: ' + data.errors.map((e: any) => e.message).join(', '));
    }

    return data.data.characters;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw new Error('Failed to fetch characters');
  }
};

export const getCharacterById = async (id: string): Promise<CharacterApi> => {
  try {
    const query = `
      query GetCharacter($id: ID!) {
        character(id: $id) {
          id, name, status, species, type, gender, origin { name }, location { name }, image, episode { id, name }, created
          image
          episode {
            id
            name
          }
          created
        }
      }
    `;

    const response = await fetch(API_CONFIG.GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { id },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error('GraphQL errors: ' + data.errors.map((e: any) => e.message).join(', '));
    }

    return data.data.character;
  } catch (error) {
    throw new Error('Failed to fetch character');
  }
};

export const searchCharacters = async (name: string, page: number = 1): Promise<CharactersResponseApi> => {
  try {
    const query = `
      query SearchCharacters($name: String!, $page: Int) {
        characters(page: $page, filter: { name: $name }) {
          info {
            count, pages, next, prev
            pages
            next
            prev
          }
          results {
            id, name, status, species, type, gender, origin { name }, location { name }, image, episode { id, name }, created
          }
        }
      }
    `;

    const response = await fetch(API_CONFIG.GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { name, page },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error('GraphQL errors: ' + data.errors.map((e: any) => e.message).join(', '));
    }

    return data.data.characters;
  } catch (error) {
    throw new Error('Failed to search characters');
  }
};
