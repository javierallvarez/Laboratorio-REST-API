import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { CharacterEntityVm } from '../character-collection.vm';

interface Props {
  character: CharacterEntityVm;
  onCharacterClick: (id: string) => void;
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


export const CharacterCard: React.FunctionComponent<Props> = ({
  character,
  onCharacterClick,
}) => {
  return (
    <Box
      className="bg-rick-indigo border border-rick-purple rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-rick-purple/30 hover:border-rick-purple"
      onClick={() => onCharacterClick(character.id)}
    >
      <Image
        src={character.image}
        alt={character.name}
        w="100%"
        h="200px"
        objectFit="cover"
      />
      <VStack p={4} spacing={3} align="stretch">
        <Heading size="md" className="text-rick-pink text-center">
          {character.name}
        </Heading>

        <HStack spacing={2} justify="center">
          <Badge colorScheme={getStatusColor(character.status)} size="sm">
            {character.status}
          </Badge>
        </HStack>

        <VStack spacing={1} align="stretch">
          <Text fontSize="sm" className="text-rick-pink">
            <Text as="span" fontWeight="bold">Species:</Text> {character.species}
          </Text>
          <Text fontSize="sm" className="text-rick-pink">
            <Text as="span" fontWeight="bold">Origin:</Text> {character.origin}
          </Text>
          <Text fontSize="sm" className="text-rick-pink">
            <Text as="span" fontWeight="bold">Location:</Text> {character.location}
          </Text>
          <Text fontSize="sm" className="text-rick-pink">
            <Text as="span" fontWeight="bold">Episodes:</Text> {character.episodeCount}
          </Text>

          {character.bestSentence && (
            <Box mt={2} p={2} className="bg-rick-black/50 border border-rick-purple/30 rounded">
              <Text fontSize="xs" className="text-rick-lavender" fontWeight="bold" mb={1}>
                Best Quote:
              </Text>
              <Text fontSize="xs" className="text-rick-pink" fontStyle="italic">
                "{character.bestSentence}"
              </Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};
