import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RouterComponent } from '#core/router';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#f6b3e5',
      100: '#c876ff',
      200: '#7232f2',
      300: '#20115b',
      400: '#010108',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'rick-black',
        color: 'rick-pink',
      },
    },
  },
});

const App: React.FunctionComponent = () => {
  return <RouterComponent />;
};

const AppProviders: React.FunctionComponent = () => {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
};

export default AppProviders;
