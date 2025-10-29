import { generatePath } from 'react-router';

interface SwitchRoutes {
  root: string;
  characterCollection: string;
  character: string;
  locationCollection: string;
  episodeCollection: string;
  mockCharacterCollection: string;
  mockCharacter: string;
  mockLocationCollection: string;
  mockEpisodeCollection: string;
}

export const switchRoutes: SwitchRoutes = {
  // Rutas de GraphQL
  root: '/',
  characterCollection: '/',
  character: '/characters/:id',
  locationCollection: '/locations',
  episodeCollection: '/episodes',
  // Rutas de Mock API
  mockCharacterCollection: '/mock',
  mockCharacter: '/mock/characters/:id',
  mockLocationCollection: '/mock/locations',
  mockEpisodeCollection: '/mock/episodes',
};

type NavigationFunction = (id: string) => string;

interface LinkRoutes extends Omit<SwitchRoutes, 'character' | 'mockCharacter'> {
  character: NavigationFunction;
  mockCharacter: NavigationFunction;
}

export const linkRoutes: LinkRoutes = {
  ...switchRoutes,
  character: (id) => generatePath(switchRoutes.character, { id }),
  mockCharacter: (id) => generatePath(switchRoutes.mockCharacter, { id }),
};
