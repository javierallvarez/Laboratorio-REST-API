import { EpisodeApi } from './episode.api-model';
import { Episode, EpisodeEntityVm } from './episode.vm';

export const mapEpisodeFromApiToVm = (episode: EpisodeApi): Episode => ({
  id: episode.id.toString(),
  name: episode.name,
  air_date: episode.air_date,
  episode: episode.episode,
  characters: episode.characters,
  created: episode.created,
});

export const mapEpisodeFromApiToEntityVm = (episode: EpisodeApi): EpisodeEntityVm => ({
  id: episode.id.toString(),
  name: episode.name,
  air_date: episode.air_date,
  episode: episode.episode,
  charactersCount: episode.characters.length,
});
