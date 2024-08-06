import * as React from 'react';

import { Container, Box } from '@mui/material';

/**
 * import Container from '@mui/material/Container';
 * Unexpected Server Error
 * Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
 */
import Copyright from './components/Copyright';
import ProTip from './components/ProTip';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}></Box>
      {children}
      <ProTip />
      <Copyright />
    </Container>
  );
}
