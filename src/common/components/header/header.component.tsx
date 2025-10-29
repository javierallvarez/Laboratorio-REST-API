import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  HStack,
  VStack,
  Button,
  Select,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { linkRoutes } from '#core/router/routes';
import rickMortyLogo from '../../../assets/images/rickMortyLogo.png';

export const HeaderComponent: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getCurrentVersion = () => {
    if (location.pathname.startsWith('/mock')) return 'mock';
    return 'graphql';
  };

  const isVersionSelectorEnabled = () => {
    // Solo habilitar el selector en páginas de Characters
    return location.pathname === '/' ||
           location.pathname === '/mock' ||
           location.pathname.startsWith('/characters/') ||
           location.pathname.startsWith('/mock/characters/');
  };

  const isMockMode = () => {
    return location.pathname.startsWith('/mock');
  };

  const handleVersionChange = (version: string) => {
    const currentPath = location.pathname;
    let newPath = currentPath;

    if (version === 'mock') {
      // Cambiar a versión mock
      if (currentPath === '/') newPath = '/mock';
      else if (currentPath.startsWith('/characters/')) {
        const id = currentPath.split('/')[2];
        newPath = `/mock/characters/${id}`;
      } else if (currentPath === '/locations') newPath = '/mock/locations';
      else if (currentPath === '/episodes') newPath = '/mock/episodes';
    } else {
      // Cambiar a versión GraphQL
      if (currentPath === '/mock') newPath = '/';
      else if (currentPath.startsWith('/mock/characters/')) {
        const id = currentPath.split('/')[3];
        newPath = `/characters/${id}`;
      } else if (currentPath === '/mock/locations') newPath = '/locations';
      else if (currentPath === '/mock/episodes') newPath = '/episodes';
    }

    navigate(newPath);
  };

  // Componente de botones de navegación reutilizable
  const NavigationButtons = ({ direction = 'row', onClose }: { direction?: 'row' | 'column', onClose?: () => void }) => (
    <Stack direction={direction} spacing={4} align={direction === 'column' ? 'stretch' : 'center'}>
      <Button
        as={RouterLink}
        to={linkRoutes.characterCollection}
        variant={isActive('/') || isActive('/mock') ? 'solid' : 'outline'}
        size="sm"
        onClick={onClose}
        className={
          isActive('/') || isActive('/mock')
            ? "bg-rick-purple text-rick-pink hover:bg-rick-lavender"
            : "border-rick-purple text-rick-white hover:bg-rick-purple"
        }
      >
        Characters
      </Button>
      <Button
        as={RouterLink}
        to={linkRoutes.locationCollection}
        variant={isActive('/locations') || isActive('/mock/locations') ? 'solid' : 'outline'}
        size="sm"
        isDisabled={isMockMode()}
        title={isMockMode() ? "Not available in mock mode" : ""}
        onClick={onClose}
        className={
          isActive('/locations') || isActive('/mock/locations')
            ? "bg-rick-purple text-rick-pink hover:bg-rick-lavender"
            : isMockMode()
            ? "border-rick-purple/30 text-rick-white/50 cursor-not-allowed"
            : "border-rick-purple text-rick-white hover:bg-rick-purple"
        }
      >
        Locations
      </Button>
      <Button
        as={RouterLink}
        to={linkRoutes.episodeCollection}
        variant={isActive('/episodes') || isActive('/mock/episodes') ? 'solid' : 'outline'}
        size="sm"
        isDisabled={isMockMode()}
        title={isMockMode() ? "Not available in mock mode" : ""}
        onClick={onClose}
        className={
          isActive('/episodes') || isActive('/mock/episodes')
            ? "bg-rick-purple text-rick-pink hover:bg-rick-lavender"
            : isMockMode()
            ? "border-rick-purple/30 text-rick-white/50 cursor-not-allowed"
            : "border-rick-purple text-rick-white hover:bg-rick-purple"
        }
      >
        Episodes
      </Button>
    </Stack>
  );

  // Componente del selector de versión reutilizable
  const VersionSelector = ({ onClose }: { onClose?: () => void }) => (
    <Select
      value={getCurrentVersion()}
      onChange={(e) => {
        handleVersionChange(e.target.value);
        onClose?.();
      }}
      size="sm"
      isDisabled={!isVersionSelectorEnabled()}
      title={!isVersionSelectorEnabled() ? "Version switching only available for Characters" : ""}
      className={
        isVersionSelectorEnabled()
          ? "bg-rick-indigo border-rick-purple text-rick-cyan !rounded-md"
          : "bg-rick-indigo/50 border-rick-purple/30 text-rick-cyan cursor-not-allowed !rounded-md"
      }
      w={{ base: "140px", md: "160px" }}
    >
      <option value="graphql" className="bg-rick-indigo">
        Version GraphQL
      </option>
      <option value="mock" className="bg-rick-indigo">
        Version Mock API
      </option>
    </Select>
  );

  return (
    <Box
      as="header"
      className="bg-rick-purple/20 border-b border-rick-purple px-4 py-3"
    >
      <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
        {/* Logo */}
        <Box
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => window.location.href = linkRoutes.characterCollection}
        >
          <Image
            src={rickMortyLogo}
            alt="Rick and Morty Logo"
            h={{ base: "40px", md: "50px" }}
            w="auto"
          />
        </Box>

        {/* Desktop Navigation */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <NavigationButtons />
          <VersionSelector />
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          display={{ base: 'flex', md: 'none' }}
          className="bg-rick-purple text-rick-pink hover:bg-rick-lavender"
          size="sm"
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent className="bg-rick-black border-l border-rick-purple">
          <DrawerCloseButton className="text-rick-pink hover:text-rick-lavender" />
          <DrawerHeader className="border-b border-rick-purple">
            <Text className="text-rick-pink font-bold">Navigation</Text>
          </DrawerHeader>
          <DrawerBody pt={6}>
            <VStack spacing={6} align="stretch">
              <NavigationButtons direction="column" onClose={onClose} />
              <Box>
                <Text className="text-rick-lavender text-sm mb-2">Version:</Text>
                <VersionSelector onClose={onClose} />
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
