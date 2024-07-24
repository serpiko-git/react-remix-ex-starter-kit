import * as React from 'react';

import { Typography, Link } from '@mui/material';
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink } from '@remix-run/react';

import Main from '~/features/main/Main';

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: 'Remix Starter' },
  { name: 'description', content: 'Welcome to remix!' },
];

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  return (
    <React.Fragment>
      <Main>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          React Remix Express in TypeScript. Mui Remix Server.
        </Typography>
        <Link to="/dashboard" color="secondary" component={RemixLink}>
          Go to the order-dashboard
        </Link>
      </Main>
    </React.Fragment>
  );
}
