import React from 'react';
import { Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import pokeball from './pokeball.svg';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Pokeball = props => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return <Image animation={animation} src={pokeball} {...props} />;
};
