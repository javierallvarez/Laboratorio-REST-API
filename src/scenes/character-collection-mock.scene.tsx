import React from 'react';
import { AppLayout } from '#layouts';
import { CharacterCollectionMockContainer } from '#pods/character';

export const CharacterCollectionMockScene: React.FunctionComponent = () => {
  return (
    <AppLayout>
      <CharacterCollectionMockContainer />
    </AppLayout>
  );
};
