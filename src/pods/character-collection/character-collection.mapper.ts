import { CharacterApi } from '../character/api/character.api-model';
import { CharacterEntityVm } from './character-collection.vm';

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
