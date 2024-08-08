/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import * as React from 'react';

import { RemixBrowser } from '@remix-run/react';
import * as ReactDOM from 'react-dom/client';

import { ClientCacheProvider } from './common/mui/MuiProvider';

const hydrate = () => {
  React.startTransition(() => {
    ReactDOM.hydrateRoot(
      document,
      <React.StrictMode>
        <ClientCacheProvider>
          <RemixBrowser />
        </ClientCacheProvider>
      </React.StrictMode>,
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
