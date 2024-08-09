import * as React from 'react';

import { Copyright } from '@mui/icons-material';
import { Container, Box } from '@mui/material';

import { ProTip } from './ProTip';

/**
 * import Container from '@mui/material/Container';
 * Unexpected Server Error
 * Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
 */

export function Welcome({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}></Box>
      {children}
      <ProTip />
      <Copyright />
    </Container>
  );
}
