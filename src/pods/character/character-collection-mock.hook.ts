import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CharacterEntityVm } from './character.vm';
import { getCharactersMock, searchCharactersMock } from './api/character-mock.api';
import { mapCharacterFromApiToEntityVm } from './character.mappers';

export const useCharacterCollectionMock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [characterCollection, setCharacterCollection] = useState<CharacterEntityVm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCharacters = useCallback(async (page: number = 1, search: string = '') => {
    try {
      console.log('page:', page, 'search:', search);
      setLoading(true);
      setError(null);

      const response = search
        ? await searchCharactersMock(search, page)
        : await getCharactersMock(page);

      console.log('>>Mock API response:', response);
      // console.log('>> Response info:', response.info);
      console.log('Numero de personajes:', response.results?.length);

      const characters = response.results.map(mapCharacterFromApiToEntityVm);
      console.log('Personajes:', characters);
      console.log('bestSentence (Mock):', characters[0]?.bestSentence);

      setCharacterCollection(characters);
      setTotalPages(response.info.pages);
      setCurrentPage(page);
    } catch (err) {
      console.error('❌ Error in fetchCharacters (MOCK):', err);
      setError('Failed to load characters from mock API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(1, searchTerm);
  }, [fetchCharacters, searchTerm]);

  // Refrescar la lista cuando se regrese de la página de detalle
  useEffect(() => {
    if (location.pathname === '/mock' && characterCollection.length > 0) {
      fetchCharacters(currentPage, searchTerm);
    }
  }, [location.pathname, fetchCharacters, currentPage, searchTerm, characterCollection.length]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleCharacterClick = useCallback((id: string) => {
    navigate(`/mock/characters/${id}`);
  }, [navigate]);

  const handlePageChange = useCallback((page: number) => {
    fetchCharacters(page, searchTerm);
  }, [fetchCharacters, searchTerm]);

  const refreshCharacters = useCallback(() => {
    fetchCharacters(currentPage, searchTerm);
  }, [fetchCharacters, currentPage, searchTerm]);

  return {
    characterCollection,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    onSearchChange: handleSearchChange,
    onCharacterClick: handleCharacterClick,
    onPageChange: handlePageChange,
    refreshCharacters,
  };
};
