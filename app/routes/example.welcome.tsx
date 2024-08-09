import * as React from 'react';

import { Typography, Link } from '@mui/material';
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink } from '@remix-run/react';

import { DEFAULT_PATH_NAVIGATE } from '~/consts/navigate';
import { Welcome } from '~/features/welcome';

/**
 * @see {@link https://remix.run/docs/en/main/route/meta} - 라우트에 필요한 HTML 메타 태그 관리
 */
export const meta: MetaFunction = () => [
  { title: 'React Remix express Starter-Kit' },
  { name: 'description', content: 'Welcome to remix!' },
];

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  return (
    <React.Fragment>
      <Welcome>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          React Remix Express in TypeScript. Mui Remix Server.
        </Typography>
        <Link
          to={DEFAULT_PATH_NAVIGATE.symbols}
          color="primary"
          component={RemixLink}
        >
          Go to the order-dashboard
        </Link>
      </Welcome>
    </React.Fragment>
  );
}
