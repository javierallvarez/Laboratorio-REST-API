import { CharacterApi, CharactersResponseApi } from './character.api-model';
import { API_CONFIG } from '#common/config/api.config';

export const getCharactersMock = async (page: number = 1): Promise<CharactersResponseApi> => {
  try {
    console.log('>>Fetch personajes desde Mock, página:', page);

    const response = await fetch(`${API_CONFIG.MOCK_API_URL}/character`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('data del mock:', data);

    // Simular paginación para el mock
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedResults = data.results.slice(startIndex, endIndex);

    return {
      info: {
        count: data.info.count,
        pages: Math.ceil(data.info.count / itemsPerPage),
        next: endIndex < data.info.count ? `page=${page + 1}` : null,
        prev: page > 1 ? `page=${page - 1}` : null,
      },
      results: paginatedResults,
    };
  } catch (error) {
    console.error('❌ Mock API error:', error);
    throw new Error('Failed to fetch characters from mock API');
  }
};

export const getCharacterByIdMock = async (id: string): Promise<CharacterApi> => {
  try {
    console.log(`>> Fetch personaje id ${id} desde Mock`);

    const response = await fetch(`${API_CONFIG.MOCK_API_URL}/character/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`data del personaje id ${id}:`, data);

    return data;
  } catch (error) {
    console.error(`Mock API error fetching character ${id}:`, error);
    throw new Error('Failed to fetch character from mock API');
  }
};

export const searchCharactersMock = async (name: string, page: number = 1): Promise<CharactersResponseApi> => {
  try {
    console.log('>> Buscamos personajes en Mock, nombre:', name);

    const response = await fetch(`${API_CONFIG.MOCK_API_URL}/character`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Filtrar por nombre en el cliente
    const filteredResults = data.results.filter((character: CharacterApi) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );

    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    return {
      info: {
        count: filteredResults.length,
        pages: Math.ceil(filteredResults.length / itemsPerPage),
        next: endIndex < filteredResults.length ? `page=${page + 1}` : null,
        prev: page > 1 ? `page=${page - 1}` : null,
      },
      results: paginatedResults,
    };
  } catch (error) {
    console.error('❌ Mock API error:', error);
    throw new Error('Failed to search characters in mock API');
  }
};

export const updateCharacterMock = async (id: string, character: Partial<CharacterApi>): Promise<void> => {
  try {
    console.log(`>> Updateamos personaje id ${id} en Mock con datos:`, character);

    const response = await fetch(`${API_CONFIG.MOCK_API_URL}/character/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[character-mock.api.ts] HTTP error! status: ${response.status}, response: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
    }

    console.log(`>> Personaje id ${id} actualizado en Mock.`);
  } catch (error) {
    console.error(`Mock API update error for character ${id}:`, error);
    throw new Error('Failed to update character in mock API');
  }
};
