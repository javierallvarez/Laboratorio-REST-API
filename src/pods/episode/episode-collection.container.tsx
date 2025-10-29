import React from 'react';
import { EpisodeCollectionComponent } from './episode-collection.component';
import { useEpisodeCollection } from './episode-collection.hook';

export const EpisodeCollectionContainer: React.FunctionComponent = () => {
  const {
    episodeCollection,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    onSearchChange,
    onPageChange,
    refreshEpisodes,
  } = useEpisodeCollection();

  return (
    <EpisodeCollectionComponent
      episodeCollection={episodeCollection}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      currentPage={currentPage}
      totalPages={totalPages}
      onSearchChange={onSearchChange}
      onPageChange={onPageChange}
      refreshEpisodes={refreshEpisodes}
    />
  );
};
