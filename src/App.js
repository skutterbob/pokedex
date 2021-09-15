import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
//import { ColorModeSwitcher } from './ColorModeSwitcher';
//import { Logo } from './Logo';
import Pokedex from './Pokedex.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {/*<Grid minH="100vh" p={3}>
          
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>*/}
        <header>
        <h1>Pokedex</h1>
        </header>
        {/*<ColorModeSwitcher justifySelf="flex-end" />*/}
        <Pokedex />
      </Box>
    </ChakraProvider>
  );
}

export default App;
