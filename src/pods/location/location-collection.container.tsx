import React from 'react';
import { LocationCollectionComponent } from './location-collection.component';
import { useLocationCollection } from './location-collection.hook';

export const LocationCollectionContainer: React.FunctionComponent = () => {
  const {
    locationCollection,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    onSearchChange,
    onPageChange,
    refreshLocations,
  } = useLocationCollection();

  return (
    <LocationCollectionComponent
      locationCollection={locationCollection}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      currentPage={currentPage}
      totalPages={totalPages}
      onSearchChange={onSearchChange}
      onPageChange={onPageChange}
      refreshLocations={refreshLocations}
    />
  );
};
