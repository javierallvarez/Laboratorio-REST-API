import React from 'react';
import { CharacterCollectionComponent } from '../character-collection/character-collection.component';
import { useCharacterCollectionMock } from './character-collection-mock.hook';

export const CharacterCollectionMockContainer: React.FunctionComponent = () => {
  const {
    characterCollection,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    onSearchChange,
    onCharacterClick,
    onPageChange,
    refreshCharacters,
  } = useCharacterCollectionMock();

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      currentPage={currentPage}
      totalPages={totalPages}
      onSearchChange={onSearchChange}
      onCharacterClick={onCharacterClick}
      onPageChange={onPageChange}
      refreshCharacters={refreshCharacters}
    />
  );
};
