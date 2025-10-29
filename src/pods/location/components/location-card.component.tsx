import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
} from '@chakra-ui/react';
import { LocationEntityVm } from '../location.vm';

interface Props {
  location: LocationEntityVm;
  onLocationClick: (id: string) => void;
}

export const LocationCard: React.FunctionComponent<Props> = ({ location, onLocationClick }) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'planet':
        return 'green';
      case 'space station':
        return 'blue';
      case 'dimension':
        return 'purple';
      case 'unknown':
        return 'gray';
      default:
        return 'orange';
    }
  };

  return (
    <Box
      className="bg-rick-indigo border border-rick-purple rounded-lg p-6 hover:border-rick-lavender transition-all duration-200 cursor-pointer transform hover:scale-105"
      onClick={() => onLocationClick(location.id)}
    >
      <VStack spacing={4} align="stretch">
        <VStack spacing={2} align="stretch">
          <Text fontSize="lg" fontWeight="bold" className="text-rick-pink" textAlign="center">
            {location.name}
          </Text>

          <HStack justify="center" spacing={2}>
            <Badge colorScheme={getTypeColor(location.type)} size="sm">
              {location.type || 'Unknown'}
            </Badge>
          </HStack>
        </VStack>

        <VStack spacing={1} align="stretch">
          <Text fontSize="sm" className="text-rick-pink">
            <Text as="span" fontWeight="bold">Dimension:</Text> {location.dimension || 'Unknown'}
          </Text>
          <Text fontSize="sm" className="text-rick-pink">
            <Text as="span" fontWeight="bold">Residents:</Text> {location.residentsCount}
          </Text>
        </VStack>

        <Button
          className="bg-rick-purple text-rick-pink hover:bg-rick-lavender transition-colors duration-200"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onLocationClick(location.id);
          }}
        >
          View Details
        </Button>
      </VStack>
    </Box>
  );
};
