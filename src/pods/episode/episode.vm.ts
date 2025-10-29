export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<{
    id: string;
    name: string;
  }>;
  created: string;
}

export interface EpisodeEntityVm {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  charactersCount: number;
}
