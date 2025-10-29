import { LocationApi, LocationsResponseApi } from './location.api-model';
import { API_CONFIG } from '#common/config/api.config';

export const getLocations = async (page: number = 1): Promise<LocationsResponseApi> => {
  try {
    console.log('locations, page:', page);

    const query = `
      query GetLocations($page: Int) {
        locations(page: $page) {
          info {
            count, pages, next, prev
          }
          results {
            id, name, type, dimension, residents { id, name }, created
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
      console.log('>>>>data de GraphQL:', data);

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error('GraphQL errors: ' + data.errors.map((e: any) => e.message).join(', '));
    }

    return data.data.locations;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw new Error('Failed to fetch locations');
  }
};

export const getLocationById = async (id: string): Promise<LocationApi> => {
  try {
    const query = `
      query GetLocation($id: ID!) {
        location(id: $id) {
          id, name, type, dimension, residents { id, name }, created
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

    return data.data.location;
  } catch (error) {
    throw new Error('Failed to fetch location');
  }
};

export const searchLocations = async (name: string, page: number = 1): Promise<LocationsResponseApi> => {
  try {
    const query = `
      query SearchLocations($name: String!, $page: Int) {
        locations(page: $page, filter: { name: $name }) {
          info {
            count, pages, next, prev
          }
          results {
            id, name, type, dimension, residents { id, name }, created
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

    return data.data.locations;
  } catch (error) {
    throw new Error('Failed to search locations');
  }
};
