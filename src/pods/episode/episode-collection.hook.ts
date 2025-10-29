import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EpisodeEntityVm } from './episode.vm';
import { getEpisodes, searchEpisodes } from './episode.api';
import { mapEpisodeFromApiToEntityVm } from './episode.mappers';

export const useEpisodeCollection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [episodeCollection, setEpisodeCollection] = useState<EpisodeEntityVm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEpisodes = useCallback(async (page: number = 1, search: string = '') => {
    try {
      console.log('Starting fetchEpisodes, page:', page, 'search:', search);
      setLoading(true);
      setError(null);

      const response = search
        ? await searchEpisodes(search, page)
        : await getEpisodes(page);

      console.log('API response received:', response);
      console.log('Response info:', response.info);
      console.log('Episodes count:', response.results?.length);

      const episodes = response.results.map(mapEpisodeFromApiToEntityVm);
      console.log('Mapped episodes:', episodes);

      setEpisodeCollection(episodes);
      setTotalPages(response.info.pages);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error in fetchEpisodes:', err);
      setError('Failed to load episodes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEpisodes(1, searchTerm);
  }, [fetchEpisodes, searchTerm]);

  // Refrescar la lista cuando se regrese de la página de detalle
  useEffect(() => {
    if (location.pathname === '/episodes' && episodeCollection.length > 0) {
      fetchEpisodes(currentPage, searchTerm);
    }
  }, [location.pathname, fetchEpisodes, currentPage, searchTerm, episodeCollection.length]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);


  const handlePageChange = useCallback((page: number) => {
    fetchEpisodes(page, searchTerm);
  }, [fetchEpisodes, searchTerm]);

  const refreshEpisodes = useCallback(() => {
    fetchEpisodes(currentPage, searchTerm);
  }, [fetchEpisodes, currentPage, searchTerm]);

  return {
    episodeCollection,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    onSearchChange: handleSearchChange,
    onPageChange: handlePageChange,
    refreshEpisodes,
  };
};
