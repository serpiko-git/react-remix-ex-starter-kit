import React from 'react';

import { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

// import '~/styles/tailwind.css';

import appStylesHref from '~/styles/app.css?url';

import SideBar from './layout/SideBar';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];

export const meta: MetaFunction = () => [
  { title: 'Derivatives Admin Debug' },
  { name: 'description', content: 'Welcome to Remix!' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SideBar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
