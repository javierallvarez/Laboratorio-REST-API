import React from 'react';
import { Box } from '@chakra-ui/react';
import { HeaderComponent } from '#common/components';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = (props) => {
  const { children } = props;

  // Layout de la aplicación, se compone del header y contenido de la página
  return (
    <Box minH="100vh" className="bg-gradient-to-br from-rick-black via-rick-indigo/80 to-rick-black">
      <HeaderComponent />
      <Box as="main" minH="calc(100vh - 80px)">
        {children}
      </Box>
    </Box>
  );
};
