import { useEffect, useState } from 'react';
import * as React from 'react';

import {
  Box,
  Modal,
  Typography,
  Textarea,
  IconButton,
  Sheet,
  Table,
} from '@mui/joy';

import { apiHost_v1, apiGateway_v1 } from '~/consts';

import {
  EtcdServiceAcsResponse,
  EtcdServiceAcsPayload,
  EtcdTraceWorker,
} from '../models/etcd-service.model';

export interface AcsDetailFormArg {
  serviceId: string;
  width?: number;
}

export function AcsDetailForm(props: AcsDetailFormArg) {
  const { serviceId, width } = props;
  const searchParams = new URLSearchParams();
  searchParams.set('serviceId', serviceId);
  searchParams.set('shardNo', '0');

  // get resposne
  const fetchUrl = `${apiGateway_v1}/debug/worker/metrics?${searchParams.toString()}`;
  const [response, setResponse] = useState<EtcdServiceAcsResponse | null>(null);
  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data: EtcdServiceAcsResponse) => {
        setResponse(data);
      });
  }, [fetchUrl]);

  console.log('fetchUrl: ', fetchUrl);
  console.log(JSON.stringify(response));
  // parse response
  if (response === null) {
    return (
      <tbody>
        <tr>
          <td colSpan={10}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ padding: 2 }} // 패딩 추가
            >
              <IconButton
                variant="plain"
                color="danger"
                sx={{ mr: 1 }}
              ></IconButton>
              <Typography color="danger" fontWeight="md">
                No Data.
              </Typography>
            </Box>
          </td>
        </tr>
      </tbody>
    );
  }
  const { code, msg, data } = response;

  // loop data keys
  if (code !== 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={10}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ padding: 2 }} // 패딩 추가
            >
              <IconButton
                variant="plain"
                color="danger"
                sx={{ mr: 1 }}
              ></IconButton>
              <Typography color="danger" fontWeight="md">
                {msg}
              </Typography>
            </Box>
          </td>
        </tr>
      </tbody>
    );
  }

  const keys = Object.keys(data);
  const rows = keys.map((key, index) => {
    if (key !== 'worker_size') {
      const item = data[key] as EtcdTraceWorker;
      return (
        <tr key={key}>
          <td style={{ textAlign: 'center' }}>
            <IconButton variant="plain" color="primary"></IconButton>
          </td>
          <td>{index + 1}</td>
          <td>{key}</td>
          <td>{item.buffer}</td>
          <td>{item.count}</td>
          <td>{String(item.currCommand)}</td>
          <td>{item.currCommandName}</td>
          <td>{item.currJobDone}</td>
          <td>{item.currJobTotal}</td>
          <td>{item.elapsedMS}</td>
          <td>{item.latestDurationMS}</td>
          <td>{String(item.locked)}</td>
          <td>{item.priority_queue_size}</td>
          <td>{item.queue_size}</td>
        </tr>
      );
    }
    const item = data[key] as number;
    return (
      <tr key={key}>
        <td style={{ textAlign: 'center' }}>
          <IconButton variant="plain" color="primary"></IconButton>
        </td>
        <td>{index + 1}</td>
        <td>{key}</td>
        <td colSpan={11}>{item}</td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <Sheet
        className="AcsDetailFormContainer"
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
              <th
                style={{
                  width: 48,
                  textAlign: 'center',
                  padding: '12px 6px',
                }}
              ></th>
              <th style={{ width: 50, padding: '12px 6px' }}>No.</th>
              <th style={{ width: 140, padding: '12px 6px' }}>worker_name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>buffer</th>
              <th style={{ width: 140, padding: '12px 6px' }}>count</th>
              <th style={{ width: 140, padding: '12px 6px' }}>curr_command</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                curr_command_name
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>curr_job_done</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                curr_job_total
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>elapsed_ms</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                latest_duration_ms
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>locked</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                priority_queue_size
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>queue_size</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
