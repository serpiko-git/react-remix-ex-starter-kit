import React from 'react';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';

import ClientStyleContext from './common/ClientStyleContext';
import createEmotionCache from './common/createEmotionCache';
import theme from './theme';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

export function MuiProvider({ children }: { children: React.ReactNode }) {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}

export function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache());

  const clientStyleContextValue = React.useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    [],
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </ClientStyleContext.Provider>
  );
}
