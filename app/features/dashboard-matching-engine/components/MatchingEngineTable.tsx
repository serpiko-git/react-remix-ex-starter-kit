import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Search as SearchIcon,
  Warning as WarningIcon,
  EditNote as EditIcon,
  CheckCircle as CheckIcon,
  Monitor as MonitorIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Sheet,
  Snackbar,
  Table,
  Typography,
} from '@mui/joy';
import { StepIcon, SvgIcon } from '@mui/material';
import { Form, useFetcher } from '@remix-run/react';
import dayjs from 'dayjs';
import { Controller, set, useForm } from 'react-hook-form';

import { BaseError } from '~/common/apis/apis.model';
import {
  apiMatchingEngine_v1,
  apiMatchingRecon_v1,
  apiAccount_id,
} from '~/consts';
import { ResponsiveModal } from '~/features/modal';

import {
  TraceMMserverResponse,
  TraceMeCoreResponse,
  TraceMeOrderbookBResponse,
  TraceMeResetResponse,
  TraceMeSnapshotResponse,
  TraceReconResetResponse,
  TraceFunction,
} from '../models/matching-engine.model';

export const TraceFunctionList: TraceFunction[] = [
  {
    trace_name: 'trace_me_core',
    trace_group: 'trace_me',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/me/core`,
    params: new URLSearchParams(),
  },
  {
    trace_name: 'trace_me_snapshot',
    trace_group: 'trace_me',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/me/snapshot`,
    params: new URLSearchParams(),
  },
  {
    trace_name: 'trace_me_orderbook_b',
    trace_group: 'trace_me',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/me/orderbook_b`,
    params: new URLSearchParams(),
  },
  {
    trace_name: 'trace_me_reset',
    trace_group: 'trace_me',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/me/reset_me`,
    params: new URLSearchParams(),
  },
  {
    trace_name: 'trace_recon_reset',
    trace_group: 'trace_recon',
    url: `${apiMatchingRecon_v1}/futures/api/v1/debug/trace/recon/reset_recon`,
    params: new URLSearchParams(),
  },
  {
    trace_name: 'trace_mmserver',
    trace_group: 'trace_mmserver',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/mm`,
    params: new URLSearchParams(),
  },
];

export function MatchingEngineTable() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
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
              <th style={{ width: 140, padding: '12px 6px' }}>trace_name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>trace_group</th>
              <th style={{ width: 140, padding: '12px 6px' }}>trace_url</th>
              <th style={{ width: 140, padding: '12px 6px' }}>trace_params</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', width: 120 }}></td>
              <td>
                <Typography level="body-xs">{}</Typography>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', width: 120 }}></td>
              <td>
                <Typography level="body-xs">{}</Typography>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', width: 120 }}></td>
              <td>
                <Typography level="body-xs">{}</Typography>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', width: 120 }}></td>
              <td>
                <Typography level="body-xs">{}</Typography>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', width: 120 }}></td>
              <td>
                <Typography level="body-xs">{}</Typography>
              </td>
            </tr>
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
