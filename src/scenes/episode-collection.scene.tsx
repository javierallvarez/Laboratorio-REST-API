import React from 'react';
import { AppLayout } from '#layouts';
import { EpisodeCollectionContainer } from '#pods/episode';

export const EpisodeCollectionScene: React.FunctionComponent = () => {
  return (
    <AppLayout>
      <EpisodeCollectionContainer />
    </AppLayout>
  );
};
