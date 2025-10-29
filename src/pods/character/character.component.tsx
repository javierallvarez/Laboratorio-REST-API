import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Divider,
  Heading,
  Container,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { Character } from './character.vm';
import { updateCharacterMock } from './api/character-mock.api';
import { linkRoutes } from '#core/router/routes';
import { useLocation } from 'react-router-dom';

interface Props {
  character: Character;
  onCharacterUpdate?: (updatedCharacter: Character) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Alive':
      return 'green';
    case 'Dead':
      return 'red';
    default:
      return 'gray';
  }
};

export const CharacterComponent: React.FunctionComponent<Props> = ({ character, onCharacterUpdate }) => {
  const [bestSentence, setBestSentence] = useState(character.bestSentence || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const isMockMode = location.pathname.startsWith('/mock');

  console.log('Character recibido:', character);
  console.log('BestSentence:', character.bestSentence);

  // Actualizar el estado local cuando cambie el personaje
  useEffect(() => {
    console.log('Editamos bestSentence:', character.bestSentence);
    setBestSentence(character.bestSentence || '');
  }, [character.bestSentence]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log('Guarda bestSentence:', bestSentence, 'para el personaje:', character.id);

      // Solo permitir guardar en modo Mock, ya que GraphQL no permite actualizaciones
      if (isMockMode) {
        await updateCharacterMock(character.id, { bestSentence });

        const updatedCharacter = { ...character, bestSentence };
        onCharacterUpdate?.(updatedCharacter);

        setIsEditing(false);
        toast({
          title: 'Best sentence updated!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Si estamos en modo GraphQL, mostrar mensaje informativo
        toast({
          title: 'Update not available',
          description: 'Best sentence editing is only available in Mock API mode',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('[CharacterComponent] Error saving bestSentence:', error);
      toast({
        title: 'Error updating character',
        description: 'Failed to save the best sentence',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setBestSentence(character.bestSentence || '');
    setIsEditing(false);
  };
  return (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
        <GridItem>
          <VStack spacing={6} align="stretch">
            <Button
              leftIcon={<ArrowBackIcon />}
              onClick={() => navigate(linkRoutes.mockCharacterCollection)}
              className="bg-rick-purple text-rick-pink hover:bg-rick-lavender transition-colors duration-200"
              alignSelf="flex-start"
            >
              Back to Characters
            </Button>
            <Image
              src={character.image}
              alt={character.name}
              borderRadius="lg"
              boxShadow="2xl"
              maxW="300px"
              w="100%"
            />
            <VStack spacing={2} align="flex-start">
              <Heading size="lg" textAlign="left" className="text-rick-pink">
                {character.name}
              </Heading>
              <HStack spacing={4} justify="flex-start">
                <Badge colorScheme={getStatusColor(character.status)} size="lg">
                  {character.status}
                </Badge>
              </HStack>
            </VStack>
          </VStack>
        </GridItem>

        <GridItem>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={4} className="text-rick-lavender">
                Character Information
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Stat>
                  <StatLabel className="text-rick-pink">Species</StatLabel>
                  <StatNumber className="text-rick-pink">{character.species}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel className="text-rick-pink">Type</StatLabel>
                  <StatNumber className="text-rick-pink">
                    {character.type || 'Unknown'}
                  </StatNumber>
                </Stat>
              </Grid>
            </Box>

            <Divider className="border-rick-purple" />

            <Box>
              <Heading size="md" mb={4} className="text-rick-lavender">
                Origin & Location
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Stat>
                  <StatLabel className="text-rick-pink">Origin</StatLabel>
                  <StatNumber className="text-rick-pink">{character.origin.name}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel className="text-rick-pink">Current Location</StatLabel>
                  <StatNumber className="text-rick-pink">{character.location.name}</StatNumber>
                </Stat>
              </Grid>
            </Box>

            <Divider className="border-rick-purple" />

            <Box>
              <Heading size="md" mb={4} className="text-rick-lavender">
                Episodes
              </Heading>
              <Stat>
                <StatLabel className="text-rick-pink">Total Episodes</StatLabel>
                <StatNumber className="text-rick-pink">{character.episode.length}</StatNumber>
                <StatHelpText className="text-rick-pink">
                  Appeared in {character.episode.length} episodes
                </StatHelpText>
              </Stat>
            </Box>

            <Divider className="border-rick-purple" />

            <Box>
              <Heading size="md" mb={4} className="text-rick-lavender">
                Best Sentence
              </Heading>
              <VStack spacing={4} align="stretch">
                {isEditing ? (
                  <>
                    <Textarea
                      value={bestSentence}
                      onChange={(e) => setBestSentence(e.target.value)}
                      placeholder="Enter the character's best sentence or quote..."
                      className="bg-rick-indigo border-rick-purple text-rick-pink placeholder:text-rick-lavender focus:border-rick-purple focus:ring-rick-purple"
                      rows={3}
                    />
                    <HStack spacing={2}>
                      <Button
                        onClick={handleSave}
                        isLoading={isSaving}
                        loadingText="Saving..."
                        className="bg-rick-purple text-rick-pink hover:bg-rick-lavender"
                        size="sm"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-rick-purple text-rick-pink hover:bg-rick-purple"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </>
                ) : (
                  <>
                    <Box
                      p={4}
                      className="bg-rick-indigo border border-rick-purple rounded-lg"
                    >
                      <Text className="text-rick-pink">
                        {bestSentence || 'No best sentence added yet. Click edit to add one!'}
                      </Text>
                    </Box>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-rick-purple text-rick-pink hover:bg-rick-lavender"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      {bestSentence ? 'Edit' : 'Add'} Best Sentence
                    </Button>
                  </>
                )}
              </VStack>
            </Box>

            <Divider className="border-rick-purple" />

          </VStack>
        </GridItem>
        </Grid>
    </Container>
  );
};
