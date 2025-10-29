import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CharacterEntityVm } from './character-collection.vm';
import { getCharacters, searchCharacters } from '../character/api/character.api';
import { mapCharacterFromApiToEntityVm } from './character-collection.mapper';

export const useCharacterCollection = () => {
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
      setLoading(true);
      setError(null);

      const response = search
        ? await searchCharacters(search, page)
        : await getCharacters(page);

      console.log('>>response', response);

      const characters = response.results.map(mapCharacterFromApiToEntityVm);

      setCharacterCollection(characters);
      setTotalPages(response.info.pages);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error al cargar los personajes:', err);
      setError('Failed to load characters');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(1, searchTerm);
  }, [fetchCharacters, searchTerm]);

  // Refrescar la lista cuando se regrese de la página de detalle
  useEffect(() => {
    if (location.pathname === '/characters' && characterCollection.length > 0) {
      fetchCharacters(currentPage, searchTerm);
    }
  }, [location.pathname, fetchCharacters, currentPage, searchTerm, characterCollection.length]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleCharacterClick = useCallback((id: string) => {
    navigate(`/characters/${id}`);
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
