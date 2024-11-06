import React, { ChangeEvent, useEffect, useState } from 'react';

import { hexToRgb } from '@material-ui/core';
import {
  Search as SearchIcon,
  Warning as WarningIcon,
  EditNote as EditIcon,
  CheckCircle as CheckIcon,
  Monitor as MonitorIcon,
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
} from '@mui/joy';
import { DialogTitle, Modal } from '@mui/material';
import { Form, useFetcher } from '@remix-run/react';
import dayjs from 'dayjs';
import { Controller, set, useForm } from 'react-hook-form';

import { BaseError } from '~/common/apis/apis.model';
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

import {
  TraceMMserverResponse,
  TraceMeCoreResponse,
  TraceMeOrderbookBResponse,
  TraceMeResetResponse,
  TraceMeSnapshotResponse,
  TraceReconResetResponse,
  TraceFunction,
} from '../models/matching-engine.model';

import { TraceFunctionDetailForm } from './DetailForm';
import TableRows from './TableRows';

// console.log({
//   apiHost_v1,
//   apiGateway_v1,
//   accountHost,
//   apiAccount_id,
//   apiMatchingEngine_v1,
//   apiMatchingRecon_v1,
//   apiProxy_v1,
// });

const _sequenceOptions = [
  'none',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];

const _traceFunctions: TraceFunction[] = [
  {
    trace_name: 'trace_me_core',
    trace_group: 'trace_me',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/me/core`,
    params: new URLSearchParams(''),
  },
  {
    trace_name: 'trace_me_snapshot',
    trace_group: 'trace_me',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/me/snapshot`,
    params: new URLSearchParams('ticker=BTCUSDT'),
  },
  {
    trace_name: 'trace_me_orderbook_b',
    trace_group: 'trace_me',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/me/orderbook_b`,
    params: new URLSearchParams('ticker=BTCUSDT'),
  },
  {
    trace_name: 'trace_me_reset',
    trace_group: 'trace_me',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/me/reset_me`,
    params: new URLSearchParams('ticker=BTCUSDT'),
  },
  {
    trace_name: 'trace_recon_reset',
    trace_group: 'trace_recon',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/recon/reset_recon`,
    params: new URLSearchParams('ticker=BTCUSDT'),
  },
  {
    trace_name: 'trace_mmserver',
    trace_group: 'trace_mmserver',
    url: `${apiMatchingEngine_v1}/futures/api/v1/debug/trace/mm`,
    params: new URLSearchParams('op=stat'),
  },
];

export function MatchingEngineTable() {
  const [TraceFunctions, setTraceFunctions] = useState(_traceFunctions);
  const [traceUrl, setTraceUrl] = useState('');
  const [selectedSequnce, setSelectedSequnce] = useState(_sequenceOptions[0]);

  const handleSelectChange = (
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
    value: string,
  ) => {
    setSelectedSequnce(value);
  };

  useEffect(() => {
    if (selectedSequnce !== _sequenceOptions[0]) {
      setTraceFunctions((trace) => {
        const updateUrl = trace.map((data) => ({
          ...data,
          url: data.url.replace(/^(.*?)me\d*/, `$1me${selectedSequnce}`),
        }));
        return updateUrl;
      });
    } else {
      setTraceFunctions(_traceFunctions);
    }
  }, [selectedSequnce, setTraceFunctions]);

  return (
    <>
      <Stack
        width="100%"
        direction="row"
        alignItems="flex-start"
        justifyItems="center"
        spacing={1}
      >
        <FormControl
          size="sm"
          sx={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <FormLabel>API Sequence</FormLabel>
          <Select
            size="sm"
            placeholder="API Sequence"
            defaultValue={_sequenceOptions[0]}
            onChange={handleSelectChange}
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            {_sequenceOptions.map((value) => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Sheet
        className="MatchingEngineTableContainer"
        variant="outlined"
        sx={{}}
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
              <th style={{ width: 180, padding: '12px 6px' }}>trace_name</th>
              <th style={{ width: 180, padding: '12px 6px' }}>trace_group</th>
              <th style={{ width: 'auto', padding: '12px 6px' }}>trace_url</th>
              {/* <th style={{ width: 300, padding: '12px 6px' }}>trace_params</th> */}
              <th style={{ width: 300, padding: '12px 6px' }}>trace</th>
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <TableRows
              TraceFunctions={TraceFunctions}
              setTraceUrl={setTraceUrl}
            />
          </tbody>
        </Table>
      </Sheet>
      <TraceFunctionDetailForm traceUrl={traceUrl} />
    </>
  );
}
