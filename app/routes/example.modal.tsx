import * as React from 'react';

import { Box, Button, Modal, ModalDialog, Typography } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import type { MetaFunction } from '@remix-run/node';

import { DetailForm } from '~/features/detail-form';
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
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setModalOpen(true)}
      >
        Open modal
      </Button>
      <ResponsiveModal onOpen={modalOpen} onSetOpen={setModalOpen}>
        <DetailForm />
      </ResponsiveModal>
    </CssVarsProvider>
  );
}
