import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Spinner, Alert, AlertIcon, Button } from '@chakra-ui/react';
import { CharacterComponent } from './character.component';
import { Character } from './character.vm';
import { getCharacterById } from './api/character.api';
import { getCharacterByIdMock } from './api/character-mock.api';
import { mapCharacterFromApiToVm } from './character.mappers';
import { linkRoutes } from '#core/router/routes';

export const CharacterContainer: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMockMode = location.pathname.startsWith('/mock');

  // Fetcheamos la información del personaje desde mock o GraphQL, según se seleccione en el header
  const fetchCharacter = async () => {
    if (!id) {
      setError('Character ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log(`Personaje id ${id} de ${isMockMode ? 'Mock API' : 'GraphQL API'}`);


      const characterApi = isMockMode
        ? await getCharacterByIdMock(id)
        : await getCharacterById(id);

      console.log(`personaje:`, characterApi);

      const characterVm = mapCharacterFromApiToVm(characterApi);
      console.log(`bestSentence del personaje:`, characterVm.bestSentence);

      setCharacter(characterVm);
    } catch (err) {
      setError('Failed to load character');
      console.error(`Error fetching character ${id}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [id, isMockMode]);

  // Refrescar el personaje cuando volvamos a la página de detalle
  useEffect(() => {
    if (location.pathname.includes('/characters/') && character) {
      fetchCharacter();
    }
  }, [location.pathname, id, isMockMode]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
        <Spinner size="xl" className="text-rick-lavender" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
        <Button onClick={() => navigate(linkRoutes.mockCharacterCollection)} className="bg-rick-purple text-rick-pink hover:bg-rick-lavender">
          Back to Characters
        </Button>
      </Box>
    );
  }

  if (!character) {
    return (
      <Box p={8}>
        <Alert status="warning" mb={4}>
          <AlertIcon />
          Character not found
        </Alert>
        <Button onClick={() => navigate(linkRoutes.mockCharacterCollection)} className="bg-rick-purple text-rick-pink hover:bg-rick-lavender">
          Back to Characters
        </Button>
      </Box>
    );
  }

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    setCharacter(updatedCharacter);
  };

  return <CharacterComponent character={character} onCharacterUpdate={handleCharacterUpdate} />;
};
