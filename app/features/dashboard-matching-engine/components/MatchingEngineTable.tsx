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
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Snackbar,
  Stack,
  Table,
  Textarea,
  Typography,
} from '@mui/joy';
import {
  DialogContent,
  DialogTitle,
  Modal,
  Paper,
  StepIcon,
  SvgIcon,
} from '@mui/material';
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

import { TraceFunctionDetailForm } from './DetailForm';

const TraceFunctions: TraceFunction[] = [
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
  const nodeRef = React.useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [traceFunctions, setTraceFunctions] =
    useState<TraceFunction[]>(TraceFunctions);
  const [traceFunction, setTraceFunction] = useState<TraceFunction>();
  const [queryParams, setQueryParams] = useState<string>('');
  const [paramsIndex, setParamsIndex] = useState<number>();
  const [traceData, setTraceData] = useState<TraceFunction>();
  const handleRefreshDetailForm = ($index: number) => {
    setTraceFunction(traceFunctions[$index]);
    console.log('traceFunction:', traceFunction);
  };

  const handleOnChangeParams = ($index: number, $params: string) => {
    const url = `${TraceFunctions[$index].url}?${$params}`;
    setTraceFunctions((prev) => {
      const result = prev.map((trace, index) => {
        if (index === $index) {
          return {
            ...trace,
            params: new URLSearchParams($params),
          };
        }
        return trace;
      });
      return result;
    });
    setQueryParams('');
    setModalOpen(false);

    console.log('url: ', url);
  };

  const traceRows = traceFunctions.map((traceRow, index) => (
    <tr key={traceRow.trace_name}>
      <td style={{ padding: '12px 6px' }}>{traceRow.trace_name}</td>
      <td style={{ padding: '12px 6px' }}>{traceRow.trace_group}</td>
      <td style={{ padding: '12px 6px' }}>
        {`${traceRow.url}?${traceRow.params.toString()}`}
      </td>

      <td style={{ padding: '12px 6px' }}>
        <Button
          variant="outlined"
          onClick={(e) => {
            setModalOpen(true);
            console.log(traceRow.trace_name);
            setParamsIndex(index);
            const found = traceFunctions[index];
            setQueryParams(found.params.toString());
            console.log('traceData:', JSON.stringify(queryParams));
          }}
        >
          Params
        </Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalDialog
            sx={{
              width: '80%',
              height: '40%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DialogTitle>Params</DialogTitle>
            <form
              onSubmit={(e) => {
                console.log('submit');
                e.preventDefault();
                handleOnChangeParams(paramsIndex, queryParams);
              }}
            >
              <Textarea
                style={{ width: '100%', height: '100%', minHeight: '200px' }}
                onChange={(e) => setQueryParams(e.target.value)}
                defaultValue={queryParams}
              ></Textarea>
              <Button
                style={{ margin: '10px 0', marginRight: '10px' }}
                type="submit"
                variant="solid"
              >
                Save
              </Button>
              <Button
                style={{ margin: '10px 0', marginRight: '10px' }}
                variant="solid"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>
            </form>
          </ModalDialog>
        </Modal>
      </td>
      <td style={{ padding: '12px 6px' }}>
        <Button
          variant="outlined"
          onClick={(e) => {
            setParamsIndex(index);
            handleRefreshDetailForm(index);
            console.log('traceData:', JSON.stringify(queryParams));
          }}
        >
          Trace
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
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
              <th style={{ width: 600, padding: '12px 6px' }}>trace_url</th>
              <th style={{ width: 300, padding: '12px 6px' }}>trace_params</th>
              <th style={{ width: 300, padding: '12px 6px' }}>trace</th>
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor: 'transparent',
            }}
          >
            {traceRows}
          </tbody>
        </Table>
      </Sheet>
      <TraceFunctionDetailForm
        traceFunction={traceFunction}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </>
  );
}
