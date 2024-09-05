import { useEffect, useState } from 'react';

import {
  DashboardRounded as DashboardRoundedIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  FormatListBulleted as ListIcon,
} from '@mui/icons-material';
import {
  Box,
  GlobalStyles,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemContent,
  Sheet,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { useLocation, useNavigate } from '@remix-run/react';

import logo from '~/assets/logo.svg';
import { DEFAULT_PATH_NAVIGATE } from '~/consts/navigate';

import { closeSidebar } from '../libs/utils';
import { DashboardPathNavigateTypes } from '../models/sidebar.model';

import { Toggler } from './Toggler';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { mode, setMode } = useColorScheme();
  const [currentDashboardMenu, setCurrentDashboardMenu] =
    useState<DashboardPathNavigateTypes>(currentPath);

  const handleSideClick = (path: DashboardPathNavigateTypes) => {
    navigate(path);
    setCurrentDashboardMenu(path);
  };

  useEffect(() => {
    if (mode !== 'light') {
      setMode('light');
    }
  }, []);

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 999,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 999,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box
        sx={{
          width: 97,
          height: 21,
          margin: '14px 0 6px',
          backgroundImage: `url(${logo})`,
        }}
      />

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem nested>
            <Toggler
              defaultExpanded={Object.values(
                DEFAULT_PATH_NAVIGATE.dashboard,
              ).includes(currentDashboardMenu)}
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <DashboardRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Dashboard</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open
                        ? {
                            transform: 'rotate(180deg)',
                          }
                        : {
                            transform: 'none',
                          },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem>
                  <ListItemButton
                    selected={currentPath.startsWith(
                      DEFAULT_PATH_NAVIGATE.dashboard.openOrder,
                    )}
                    onClick={() =>
                      handleSideClick(DEFAULT_PATH_NAVIGATE.dashboard.openOrder)
                    }
                  >
                    <ListIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Open Order</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    selected={currentPath.startsWith(
                      DEFAULT_PATH_NAVIGATE.dashboard.closedOrderPnl,
                    )}
                    onClick={() =>
                      handleSideClick(
                        DEFAULT_PATH_NAVIGATE.dashboard.closedOrderPnl,
                      )
                    }
                  >
                    <ListIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Closed Order P&L</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    selected={currentPath.startsWith(
                      DEFAULT_PATH_NAVIGATE.dashboard.closedPositionPnl,
                    )}
                    onClick={() =>
                      handleSideClick(
                        DEFAULT_PATH_NAVIGATE.dashboard.closedPositionPnl,
                      )
                    }
                  >
                    <ListIcon />
                    <ListItemContent>
                      <Typography level="title-sm">
                        Closed Position P&L
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    selected={currentPath.startsWith(
                      DEFAULT_PATH_NAVIGATE.dashboard.transaction,
                    )}
                    onClick={() =>
                      handleSideClick(
                        DEFAULT_PATH_NAVIGATE.dashboard.transaction,
                      )
                    }
                  >
                    <ListIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Transaction</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    selected={currentPath.startsWith(
                      DEFAULT_PATH_NAVIGATE.dashboard.snapshotPosition,
                    )}
                    onClick={() =>
                      handleSideClick(
                        DEFAULT_PATH_NAVIGATE.dashboard.snapshotPosition,
                      )
                    }
                  >
                    <ListIcon />
                    <ListItemContent>
                      <Typography level="title-sm">
                        Snapshot Position
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    selected={currentPath.startsWith(
                      DEFAULT_PATH_NAVIGATE.dashboard.symbols,
                    )}
                    onClick={() =>
                      handleSideClick(DEFAULT_PATH_NAVIGATE.dashboard.symbols)
                    }
                  >
                    <ListIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Symbols</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
