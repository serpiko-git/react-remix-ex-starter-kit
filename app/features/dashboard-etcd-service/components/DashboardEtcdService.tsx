import { useState } from 'react';

import {
  ChevronRightRounded,
  DownloadRounded,
  HomeRounded,
  WarningRounded,
} from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  CssVarsProvider,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';

import { Header } from '~/features/dashboard-common';
import { Sidebar } from '~/features/side-bar';

import { EtcdServiceCombineProps } from '../models/etcd-service.model';

import { EtcdServiceTable } from './EtcdServiceTable';

export function DashboardEtcdService({
  responseProps,
  queriesProps,
}: EtcdServiceCombineProps) {
  const { code, msg } = responseProps;
  const [open, setOpen] = useState<boolean>(true);

  return (
    <CssVarsProvider disableTransitionOnChange>
      {code !== 0 && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRounded />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>{msg}</DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={() => setOpen(false)}
              >
                Discard notes
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      )}

      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRounded fontSize="small" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRounded />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                Dashboard
              </Link>
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                Etcd Service
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Etcd Service
            </Typography>
            <Button
              color="primary"
              startDecorator={<DownloadRounded />}
              size="sm"
            >
              Download PDF
            </Button>
          </Box>

          <EtcdServiceTable
            responseProps={responseProps}
            queriesProps={queriesProps}
          />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
