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
import { LocationEntityVm } from './location.vm';

interface Props {
  locationCollection: LocationEntityVm[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  refreshLocations: () => void;
}

export const LocationCollectionComponent: React.FunctionComponent<Props> = ({
  locationCollection,
  loading,
  error,
  searchTerm,
  currentPage,
  totalPages,
  onSearchChange,
  onPageChange,
  refreshLocations,
}) => {
  if (loading && locationCollection.length === 0) {
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
        <Button onClick={refreshLocations} className="bg-rick-purple text-rick-pink hover:bg-rick-lavender">
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
            Locations
          </Text>

          <HStack justify="center" spacing={4}>
            <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
              {locationCollection.length} locations
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
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-rick-indigo border-rick-purple text-rick-pink placeholder:text-rick-lavender focus:border-rick-purple focus:ring-rick-purple"
          />
        </InputGroup>

        {locationCollection.length === 0 && !loading ? (
          <Box textAlign="center" py={8}>
            <Text className="text-rick-white" fontSize="lg">
              No locations found
            </Text>
          </Box>
        ) : (
          <>
            <Box overflowX="auto">
              <Table variant="simple" size="md">
                <Thead>
                  <Tr className="bg-rick-indigo">
                    <Th className="text-rick-pink border-rick-purple">Name</Th>
                    <Th className="text-rick-pink border-rick-purple">Type</Th>
                    <Th className="text-rick-pink border-rick-purple">Dimension</Th>
                    <Th className="text-rick-pink border-rick-purple">Residents</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {locationCollection.map((location) => (
                    <Tr key={location.id} className="hover:bg-rick-indigo/50 transition-colors">
                      <Td className="text-rick-white border-rick-purple font-medium">
                        {location.name}
                      </Td>
                      <Td className="text-rick-white border-rick-purple">
                        <Badge
                          colorScheme={
                            location.type.toLowerCase() === 'planet' ? 'green' :
                            location.type.toLowerCase() === 'space station' ? 'blue' :
                            location.type.toLowerCase() === 'dimension' ? 'purple' :
                            location.type.toLowerCase() === 'unknown' ? 'gray' : 'orange'
                          }
                          size="sm"
                        >
                          {location.type || 'Unknown'}
                        </Badge>
                      </Td>
                      <Td className="text-rick-white border-rick-purple">
                        {location.dimension || 'Unknown'}
                      </Td>
                      <Td className="text-rick-white border-rick-purple">
                        <Badge colorScheme="blue" size="sm">
                          {location.residentsCount}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
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
                  Page {currentPage} of {totalPages} • {locationCollection.length} locations on this page
                </Text>
              </VStack>
            )}
          </>
        )}

        {loading && locationCollection.length > 0 && (
          <Box display="flex" justifyContent="center" py={4}>
            <Spinner className="text-rick-white" />
          </Box>
        )}
      </VStack>
    </Box>
  );
};
