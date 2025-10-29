import React from 'react';
import {
  Box,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react';
import { SearchIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';

interface Props {
  characterCollection: CharacterEntityVm[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  onSearchChange: (value: string) => void;
  onCharacterClick: (id: string) => void;
  onPageChange: (page: number) => void;
  refreshCharacters: () => void;
}

export const CharacterCollectionComponent: React.FunctionComponent<Props> = ({
  characterCollection,
  loading,
  error,
  searchTerm,
  currentPage,
  totalPages,
  onSearchChange,
  onCharacterClick,
  onPageChange,
  refreshCharacters,
}) => {
  if (loading && characterCollection.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
        <Spinner size="xl" color="brand.100" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={8} maxW="container.xl" mx="auto">
      <VStack spacing={8} align="stretch">
        <VStack spacing={4} align="stretch">
          <Heading className="text-rick-white text-center tracking-widest !font-thin">
            CHARACTERS
          </Heading>

          <InputGroup maxW="400px" mx="auto">
            <InputLeftElement pointerEvents="none">
              <SearchIcon className="text-rick-white" />
            </InputLeftElement>
            <Input
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-rick-indigo border-rick-purple text-rick-white placeholder:text-rick-white focus:border-rick-purple focus:ring-rick-purple"
            />
          </InputGroup>
        </VStack>

        {characterCollection.length === 0 && !loading ? (
          <Box textAlign="center" py={8}>
            <Text className="text-rick-white" fontSize="lg">
              No characters found. Try a different search term.
            </Text>
          </Box>
        ) : (
          <>
            <Grid
              templateColumns={{
                base: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)',
              }}
              gap={6}
            >
              {characterCollection.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onCharacterClick={onCharacterClick}
                />
              ))}
            </Grid>

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
                  Page {currentPage} of {totalPages} • {characterCollection.length} characters on this page
                </Text>
              </VStack>
            )}
          </>
        )}

        {loading && characterCollection.length > 0 && (
          <Box display="flex" justifyContent="center" py={4}>
            <Spinner className="text-rick-white" />
          </Box>
        )}
      </VStack>
    </Box>
  );
};
