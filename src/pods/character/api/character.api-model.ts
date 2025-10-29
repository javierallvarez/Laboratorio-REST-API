export interface CharacterApi {
  id: number | string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: Array<{
    id: string;
    name: string;
  }>;
  created: string;
  bestSentence?: string;
}

export interface CharactersResponseApi {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterApi[];
}
