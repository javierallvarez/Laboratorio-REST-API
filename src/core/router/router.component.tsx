import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { switchRoutes } from './routes';
import {
  CharacterCollectionScene,
  CharacterScene,
  LocationCollectionScene,
  EpisodeCollectionScene,
  CharacterCollectionMockScene
} from '#scenes';

export const RouterComponent: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de GraphQL */}
        <Route
          path={switchRoutes.characterCollection}
          element={<CharacterCollectionScene />}
        />
        <Route path={switchRoutes.character} element={<CharacterScene />} />
        <Route
          path={switchRoutes.locationCollection}
          element={<LocationCollectionScene />}
        />
        <Route
          path={switchRoutes.episodeCollection}
          element={<EpisodeCollectionScene />}
        />

        {/* Rutas de Mock API */}
        <Route
          path={switchRoutes.mockCharacterCollection}
          element={<CharacterCollectionMockScene />}
        />
        <Route path={switchRoutes.mockCharacter} element={<CharacterScene />} />

        <Route
          path={switchRoutes.root}
          element={<Navigate to={switchRoutes.characterCollection} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
