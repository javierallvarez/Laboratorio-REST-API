import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocationEntityVm } from './location.vm';
import { getLocations, searchLocations } from './location.api';
import { mapLocationFromApiToEntityVm } from './location.mappers';

export const useLocationCollection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationCollection, setLocationCollection] = useState<LocationEntityVm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLocations = useCallback(async (page: number = 1, search: string = '') => {
    try {
      console.log('locations, page:', page, 'search:', search);
      setLoading(true);
      setError(null);

      const response = search
        ? await searchLocations(search, page)
        : await getLocations(page);

      console.log('API response received:', response);

      const locations = response.results.map(mapLocationFromApiToEntityVm);

      setLocationCollection(locations);
      setTotalPages(response.info.pages);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error al cargar las locations:', err);
      setError('Failed to load locations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations(1, searchTerm);
  }, [fetchLocations, searchTerm]);

  // Refrescar la lista cuando se regrese de la página de detalle
  useEffect(() => {
    if (location.pathname === '/locations' && locationCollection.length > 0) {
      fetchLocations(currentPage, searchTerm);
    }
  }, [location.pathname, fetchLocations, currentPage, searchTerm, locationCollection.length]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);


  const handlePageChange = useCallback((page: number) => {
    fetchLocations(page, searchTerm);
  }, [fetchLocations, searchTerm]);

  const refreshLocations = useCallback(() => {
    fetchLocations(currentPage, searchTerm);
  }, [fetchLocations, currentPage, searchTerm]);

  return {
    locationCollection,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    onSearchChange: handleSearchChange,
    onPageChange: handlePageChange,
    refreshLocations,
  };
};
