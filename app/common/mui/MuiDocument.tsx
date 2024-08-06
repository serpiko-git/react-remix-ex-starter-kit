import React from 'react';

import { CssBaseline } from '@mui/material';

export function MuiDocument({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </>
  );
}
