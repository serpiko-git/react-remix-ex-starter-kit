import { HomeRounded, ChevronRightRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, CssVarsProvider, Typography, Link } from '@mui/joy';

import { Header } from '~/features/dashboard-common';
import { Sidebar } from '~/features/side-bar';

import { EtcdServiceListResponse } from '../models';

import { ServerControlTable } from './ServerControlTable';

interface DashboardServerControlProps {
  etcdServiceListResponse: EtcdServiceListResponse;
}

export function DashboardServerControl(props: DashboardServerControlProps) {
  const { etcdServiceListResponse } = props;
  // console.log(etcdServiceListResponse);

  const { code, data, msg } = etcdServiceListResponse;

  let lists = [];
  if (code === 0) {
    lists = data.list;
  }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <Box
        sx={{
          backgroundColor: 'transparent',
          display: 'flex',
          minHeight: '100dvh',
        }}
      >
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
                Server Control (Start, Shutdown, Restart)
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
              Server Control (Start, Shutdown, Restart)
            </Typography>
          </Box>
          <ServerControlTable lists={lists} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
