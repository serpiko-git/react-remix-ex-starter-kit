import React from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/material';

export function MuiDocument({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider disableTransitionOnChange>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
