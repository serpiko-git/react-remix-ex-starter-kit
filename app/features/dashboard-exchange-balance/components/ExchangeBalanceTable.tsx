import React, { ChangeEvent, useEffect, useState } from 'react';

import { hexToRgb } from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  EditNote as EditIcon,
  CheckCircle as CheckIcon,
  Monitor as MonitorIcon,
  FormatListNumberedRtlSharp,
} from '@mui/icons-material';
import {
  Button,
  ModalDialog,
  Sheet,
  Table,
  Textarea,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Option,
  Box,
  IconButton,
  Typography,
  Link,
} from '@mui/joy';
import { DialogTitle, Modal } from '@mui/material';
import { Form, useFetcher } from '@remix-run/react';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { Controller, set, useForm } from 'react-hook-form';

import { BaseError } from '~/common/apis/apis.model';
import { Abs } from '~/common/libs/number';
import { Pagination } from '~/common/libs/pagination';
import {
  apiHost_v1,
  apiGateway_v1,
  accountHost,
  apiAccount_id,
  apiMatchingEngine_v1,
  apiMatchingRecon_v1,
  apiProxy_v1,
} from '~/consts';
import { ResponsiveModal } from '~/features/modal';
import { ParseCalaog } from '~/features/models/common.model';
import { getComparator, Order } from '~/utils/ordering';

import {
  ExchangeBalance,
  ExchangeBalanceCombineProps,
} from '../models/exchange-balance.model';

export function ExchangeBalanceTable({
  responseProps,
  queriesProps,
}: ExchangeBalanceCombineProps) {
  const [,] = useState('');
  const [order, setOrder] = useState<Order>('desc');
  const [thCount, setThCount] = useState<number>();
  const { catalog, data } = responseProps.data;

  // map data to list (with symbol <= key)
  const list = Object.entries(responseProps.data.data).map(
    ([symbol, item]) => ({
      symbol,
      ...item,
    }),
  );
  const listFmt = ParseCalaog(catalog, list);

  return (
    <>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'flex-start',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      ></Box>

      <Sheet
        className="MatchingEngineTableContainer"
        variant="outlined"
        sx={{
          display: { sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            backgroundColor: 'transparent',
            '--TableCell-headBackground':
              'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground':
              'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th
                data-comment="empty-gap"
                style={{ width: 20, padding: '12px 6px' }}
              ></th>
              <th style={{ width: 50, padding: '12px 6px' }}>No.</th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: 'lg',
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    },
                    order === 'desc'
                      ? { '& svg': { transform: 'rotate(0deg)' } }
                      : { '& svg': { transform: 'rotate(180deg)' } },
                  ]}
                >
                  Symbol
                </Link>
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>
                {/* pnl_fee_total:lvu */}
                P&L Fee (user)
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>
                {/* pnl_fee_total:lvm */}
                P&L Fee (mm)
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>
                {/* pnl_funding_fee_total:lvu */}
                Funding Fee (user)
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>
                {/* pnl_funding_fee_total:lvm */}
                Funding Fee (mm)
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>
                {/* pnl_re_total:lvu */}
                Realized P&L (user)
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>
                {/* pnl_un_total:lvu */}
                Unrealized P&L (user)
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>
                {/* pnl_re_total:lvm */}
                Realized P&L (mm)
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>
                {/* pnl_un_total:lvm */}
                Unrealized P&L (mm)
              </th>
              <th style={{ width: 180, padding: '12px 6px' }}>Time At</th>
            </tr>
          </thead>

          {/* nodata */}
          {!listFmt.length && (
            <tbody>
              <tr>
                <td colSpan={thCount}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ padding: 2 }} // 패딩 추가
                  >
                    <IconButton variant="plain" color="danger" sx={{ mr: 1 }}>
                      <WarningIcon />
                    </IconButton>
                    <Typography color="danger" fontWeight="md">
                      No Data.
                    </Typography>
                  </Box>
                </td>
              </tr>
            </tbody>
          )}

          {/* data render */}
          {!!listFmt.length && (
            <>
              <tbody>
                {[...listFmt]
                  .sort(getComparator(order, 'symbol'))
                  .map((row, i) => (
                    <tr key={row.symbol}>
                      <td>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                          }}
                        ></Box>
                      </td>
                      <td>
                        <Typography level="body-xs">{i}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.symbol}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row['pnl_fee_total:lvu'].toString().replace('-', '')}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row['pnl_fee_total:lvm']}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row['pnl_funding_fee_total:lvu']}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row['pnl_funding_fee_total:lvm']}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row['pnl_re_total:lvu']}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row['pnl_un_total:lvu']}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row['pnl_re_total:lvm']}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row['pnl_un_total:lvm']}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {`[TODO - me] ${Date.now()}`}
                        </Typography>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </Table>
      </Sheet>
    </>
  );
}
