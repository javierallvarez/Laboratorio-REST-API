import React from 'react';
import { CharacterCollectionComponent } from './character-collection.component';
import { useCharacterCollection } from './character-collection.hook';

export const CharacterCollectionContainer: React.FunctionComponent = () => {
  const characterCollectionHook = useCharacterCollection();

  return <CharacterCollectionComponent {...characterCollectionHook} />;
};
