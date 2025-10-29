export interface EpisodeApi {
  id: number | string;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<{
    id: string;
    name: string;
  }>;
  created: string;
}

export interface EpisodesResponseApi {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: EpisodeApi[];
}
