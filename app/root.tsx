import * as React from 'react';

import { withEmotionCache } from '@emotion/react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';

// import Layout from './layout/mui/Layout';
import ClientStyleContext from './common/mui/common/ClientStyleContext';
import { getMuiLinks } from './common/mui/getMuiLinks';
import { MuiDocument } from './common/mui/MuiDocument';
import { MuiMeta } from './common/mui/MuiMeta';

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * @see {@link https://remix.run/docs/en/main/route/links#links} - 사용자가 경로를 방문할 때 페이지에 어떤 <link> 요소를 추가할지 정의함
 */
export const links: LinksFunction = () => [...getMuiLinks()];

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);

    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      // eslint-disable-next-line no-param-reassign
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const { tags } = emotionCache.sheet;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {title && <title>{title}</title>}
          <Meta />
          <MuiMeta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  },
);

// https://remix.run/docs/en/main/route/component
// https://remix.run/docs/en/main/file-conventions/routes
export default function App() {
  return (
    <>
      <MuiDocument>
        <Outlet />
      </MuiDocument>
    </>
  );
}

/**
 * @see {@link https://remix.run/docs/en/main/route/links#links} - 공통 레이아웃을 라우트 컴포넌트에 래핑
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return <Document>{children}</Document>;
}

// https://remix.run/docs/en/main/route/error-boundary
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    let message;
    switch (error.status) {
      case 401:
        message = (
          <p>
            Oops! Looks like you tried to visit a page that you do not have
            access to.
          </p>
        );
        break;
      case 404:
        message = (
          <p>Oops! Looks like you tried to visit a page that does not exist.</p>
        );
        break;

      default:
        throw new Error(error.data || error.statusText);
    }

    return (
      <Document title={`${error.status} ${error.statusText}`}>
        {/* <Layout> */}
        <h1>
          {error.status}: {error.statusText}
        </h1>
        {message}
        {/* </Layout> */}
      </Document>
    );
  }

  if (error instanceof Error) {
    console.error(error);
    return (
      <Document title="Error!">
        {/* <Layout> */}
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
        {/* </Layout> */}
      </Document>
    );
  }

  return <h1>Unknown Error</h1>;
}
