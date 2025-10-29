import { CharacterApi } from './api/character.api-model';
import { Character, CharacterEntityVm } from './character.vm';

export const mapCharacterFromApiToVm = (character: CharacterApi): Character => ({
  id: character.id.toString(),
  name: character.name,
  status: character.status,
  species: character.species,
  type: character.type,
  gender: character.gender,
  origin: character.origin,
  location: character.location,
  image: character.image,
  episode: character.episode,
  url: character.url,
  created: character.created,
  bestSentence: character.bestSentence,
});

export const mapCharacterFromApiToEntityVm = (character: CharacterApi): CharacterEntityVm => ({
  id: character.id.toString(),
  name: character.name,
  status: character.status,
  species: character.species,
  type: character.type,
  gender: character.gender,
  origin: character.origin.name,
  location: character.location.name,
  image: character.image,
  episodeCount: character.episode.length,
  bestSentence: character.bestSentence,
});
