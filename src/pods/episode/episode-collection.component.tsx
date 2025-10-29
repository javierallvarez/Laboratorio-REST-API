import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Badge,
} from '@chakra-ui/react';
import { SearchIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { EpisodeEntityVm } from './episode.vm';

interface Props {
  episodeCollection: EpisodeEntityVm[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  refreshEpisodes: () => void;
}

export const EpisodeCollectionComponent: React.FunctionComponent<Props> = ({
  episodeCollection,
  loading,
  error,
  searchTerm,
  currentPage,
  totalPages,
  onSearchChange,
  onPageChange,
  refreshEpisodes,
}) => {
  if (loading && episodeCollection.length === 0) {
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
        <Button onClick={refreshEpisodes} className="bg-rick-purple text-rick-pink hover:bg-rick-lavender">
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={4} align="stretch">
          <Text fontSize="3xl" fontWeight="bold" className="text-rick-pink" textAlign="center">
            Episodes
          </Text>

          <HStack justify="center" spacing={4}>
            <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
              {episodeCollection.length} episodes
            </Badge>
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
              Page {currentPage} of {totalPages}
            </Badge>
          </HStack>
        </VStack>

        <InputGroup maxW="400px" mx="auto">
          <InputLeftElement pointerEvents="none">
            <SearchIcon className="text-rick-lavender" />
          </InputLeftElement>
          <Input
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-rick-indigo border-rick-purple text-rick-pink placeholder:text-rick-lavender focus:border-rick-purple focus:ring-rick-purple"
          />
        </InputGroup>

        {episodeCollection.length === 0 && !loading ? (
          <Box textAlign="center" py={8}>
            <Text className="text-rick-white" fontSize="lg">
              No episodes found
            </Text>
          </Box>
        ) : (
          <>
            <Box overflowX="auto">
              <Table variant="simple" size="md">
                <Thead>
                  <Tr className="bg-rick-indigo">
                    <Th className="text-rick-pink border-rick-purple">Name</Th>
                    <Th className="text-rick-pink border-rick-purple">Episode</Th>
                    <Th className="text-rick-pink border-rick-purple">Air Date</Th>
                    <Th className="text-rick-pink border-rick-purple">Characters</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {episodeCollection.map((episode) => {
                    const getSeasonColor = (episodeCode: string) => {
                      const season = episodeCode.split('E')[0].replace('S', '');
                      const seasonNum = parseInt(season);

                      switch (seasonNum) {
                        case 1: return 'green';
                        case 2: return 'blue';
                        case 3: return 'purple';
                        case 4: return 'orange';
                        case 5: return 'red';
                        default: return 'gray';
                      }
                    };

                    const formatAirDate = (dateString: string) => {
                      try {
                        const date = new Date(dateString);
                        return date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        });
                      } catch {
                        return dateString;
                      }
                    };

                    return (
                      <Tr key={episode.id} className="hover:bg-rick-indigo/50 transition-colors">
                        <Td className="text-rick-white border-rick-purple font-medium">
                          {episode.name}
                        </Td>
                        <Td className="text-rick-white border-rick-purple">
                          <Badge
                            colorScheme={getSeasonColor(episode.episode)}
                            size="sm"
                          >
                            {episode.episode}
                          </Badge>
                        </Td>
                        <Td className="text-rick-white border-rick-purple">
                          {formatAirDate(episode.air_date)}
                        </Td>
                        <Td className="text-rick-white border-rick-purple">
                          <Badge colorScheme="blue" size="sm">
                            {episode.charactersCount}
                          </Badge>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>

            {totalPages > 1 && (
              <VStack spacing={4} pt={8}>
                <HStack justify="center" spacing={2} wrap="wrap">
                  {/* Botón Previous */}
                  <Button
                    leftIcon={<ArrowBackIcon />}
                    onClick={() => onPageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="border-rick-purple text-rick-white hover:bg-rick-purple"
                  >
                    Previous
                  </Button>

                  {/* Primera página */}
                  {currentPage > 3 && (
                    <>
                      <Button
                        onClick={() => onPageChange(1)}
                        variant="outline"
                        size="sm"
                        className="border-rick-purple text-rick-white hover:bg-rick-purple"
                      >
                        1
                      </Button>
                      {currentPage > 4 && (
                        <Text className="text-rick-white">...</Text>
                      )}
                    </>
                  )}

                  {/* Páginas alrededor de la actual */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                    const pageNum = startPage + i;

                    if (pageNum > totalPages) return null;

                    return (
                      <Button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        variant={pageNum === currentPage ? "solid" : "outline"}
                        size="sm"
                        className={
                          pageNum === currentPage
                            ? "bg-rick-purple text-rick-pink hover:bg-rick-lavender"
                            : "border-rick-purple text-rick-white hover:bg-rick-purple"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  {/* Última página */}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <Text className="text-rick-white">...</Text>
                      )}
                      <Button
                        onClick={() => onPageChange(totalPages)}
                        variant="outline"
                        size="sm"
                        className="border-rick-purple text-rick-white hover:bg-rick-purple"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}

                  {/* Botón Next */}
                  <Button
                    rightIcon={<ArrowForwardIcon />}
                    onClick={() => onPageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className="border-rick-purple text-rick-white hover:bg-rick-purple"
                  >
                    Next
                  </Button>
                </HStack>

                {/* Información de página */}
                <Text className="text-rick-white text-sm">
                  Page {currentPage} of {totalPages} • {episodeCollection.length} episodes on this page
                </Text>
              </VStack>
            )}
          </>
        )}

        {loading && episodeCollection.length > 0 && (
          <Box display="flex" justifyContent="center" py={4}>
            <Spinner className="text-rick-white" />
          </Box>
        )}
      </VStack>
    </Box>
  );
};
