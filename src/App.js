import React from 'react';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import theme from './theme.js';

import Pokedex from './Pokedex.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        
        <header>
        <h1>Pokedex</h1>
        </header>
        
        <Pokedex />
        
      </Box>
    </ChakraProvider>
  );
}

export default App;
