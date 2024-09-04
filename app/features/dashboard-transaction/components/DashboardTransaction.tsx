import { useState } from 'react';

import {
  ChevronRightRounded,
  HomeRounded,
  DownloadRounded,
} from '@mui/icons-material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/joy';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { CssVarsProvider } from '@mui/joy/styles';

import { Header } from '~/features/dashboard-common';
import { Sidebar } from '~/features/side-bar';

import { TransactionCombineProps } from '../models/transaction.model';

import { TransactionTable } from './TransactionTable';

export function DashboardTransaction({
  responseProps,
  queriesProps,
}: TransactionCombineProps) {
  const { code, msg, time_now, data } = responseProps;

  const [open, setOpen] = useState<boolean>(true);

  return (
    <CssVarsProvider disableTransitionOnChange>
      {code !== 0 && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
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
                Open-Order
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
              Open-Order
            </Typography>
            <Button
              color="primary"
              startDecorator={<DownloadRounded />}
              size="sm"
            >
              Download PDF
            </Button>
          </Box>

          <TransactionTable
            responseProps={responseProps}
            queriesProps={queriesProps}
          />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
