import { EpisodeApi, EpisodesResponseApi } from './episode.api-model';
import { API_CONFIG } from '#common/config/api.config';

export const getEpisodes = async (page: number = 1): Promise<EpisodesResponseApi> => {
  try {
    console.log('episodes, page:', page);

    const query = `
      query GetEpisodes($page: Int) {
        episodes(page: $page) {
          info {
            count, pages, next, prev
          }
          results {
            id, name, air_date, episode, characters { id, name }, created
          }
        }
      }
    `;

    const response = await fetch(API_CONFIG.GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { page },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('>>data de GraphQL:', data);

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error('GraphQL errors: ' + data.errors.map((e: any) => e.message).join(', '));
    }

    return data.data.episodes;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw new Error('Failed to fetch episodes');
  }
};

export const getEpisodeById = async (id: string): Promise<EpisodeApi> => {
  try {
    const query = `
      query GetEpisode($id: ID!) {
        episode(id: $id) {
          id, name, air_date, episode, characters { id, name }, created
        }
      }
    `;

    const response = await fetch(API_CONFIG.GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { id },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error('GraphQL errors: ' + data.errors.map((e: any) => e.message).join(', '));
    }

    return data.data.episode;
  } catch (error) {
    throw new Error('Failed to fetch episode');
  }
};

export const searchEpisodes = async (name: string, page: number = 1): Promise<EpisodesResponseApi> => {
  try {
    const query = `
      query SearchEpisodes($name: String!, $page: Int) {
        episodes(page: $page, filter: { name: $name }) {
          info {
            count, pages, next, prev
            pages
            next
            prev
          }
          results {
            id, name, air_date, episode, characters { id, name }, created
            name
            air_date, episode, characters { id, name }, created
          }
        }
      }
    `;

    const response = await fetch(API_CONFIG.GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { name, page },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error('GraphQL errors: ' + data.errors.map((e: any) => e.message).join(', '));
    }

    return data.data.episodes;
  } catch (error) {
    throw new Error('Failed to search episodes');
  }
};
