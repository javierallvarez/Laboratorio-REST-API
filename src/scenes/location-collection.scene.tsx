import React from 'react';
import { AppLayout } from '#layouts';
import { LocationCollectionContainer } from '#pods/location';

export const LocationCollectionScene: React.FunctionComponent = () => {
  return (
    <AppLayout>
      <LocationCollectionContainer />
    </AppLayout>
  );
};
