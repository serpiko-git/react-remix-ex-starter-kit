import * as React from 'react';

import type { MetaFunction } from '@remix-run/node';

import { ResponsiveModal } from '~/features/modal';

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
      <ResponsiveModal />
    </React.Fragment>
  );
}
