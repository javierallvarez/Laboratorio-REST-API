import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
} from '@chakra-ui/react';
import { EpisodeEntityVm } from '../episode.vm';

interface Props {
  episode: EpisodeEntityVm;
  onEpisodeClick: (id: string) => void;
}

export const EpisodeCard: React.FunctionComponent<Props> = ({ episode, onEpisodeClick }) => {
  const getSeasonColor = (episodeCode: string) => {
    const season = episodeCode.split('E')[0].replace('S', '');
    const seasonNum = parseInt(season);

    switch (seasonNum) {
      case 1:
        return 'green';
      case 2:
        return 'blue';
      case 3:
        return 'purple';
      case 4:
        return 'orange';
      case 5:
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatAirDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Box
      className="bg-rick-indigo border border-rick-purple rounded-lg p-6 hover:border-rick-lavender transition-all duration-200 cursor-pointer transform hover:scale-105"
      onClick={() => onEpisodeClick(episode.id)}
    >
      <VStack spacing={4} align="stretch">
        <VStack spacing={2} align="stretch">
          <Text fontSize="lg" fontWeight="bold" className="text-rick-pink" textAlign="center">
            {episode.name}
          </Text>

          <HStack justify="center" spacing={2}>
            <Badge colorScheme={getSeasonColor(episode.episode)} size="sm">
              {episode.episode}
            </Badge>
          </HStack>
        </VStack>

        <VStack spacing={1} align="stretch">
          <Text fontSize="sm" className="text-rick-pink">
            <Text as="span" fontWeight="bold">Air Date:</Text> {formatAirDate(episode.air_date)}
          </Text>
          <Text fontSize="sm" className="text-rick-pink">
            <Text as="span" fontWeight="bold">Characters:</Text> {episode.charactersCount}
          </Text>
        </VStack>

        <Button
          className="bg-rick-purple text-rick-pink hover:bg-rick-lavender transition-colors duration-200"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEpisodeClick(episode.id);
          }}
        >
          View Details
        </Button>
      </VStack>
    </Box>
  );
};
