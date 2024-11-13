import React from 'react';

import { CssVarsProvider } from '@mui/joy';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export function MuiDocument({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </QueryClientProvider>
  );
}

export function MuiCssVarsDocument({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CssVarsProvider disableTransitionOnChange>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
