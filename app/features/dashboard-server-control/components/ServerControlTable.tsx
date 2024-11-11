import React, { ChangeEvent, useEffect, useState } from 'react';

import { hexToRgb } from '@material-ui/core';
import { RefreshRounded, WarningRounded } from '@mui/icons-material';
import {
  Button,
  Sheet,
  Table,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Option,
  Box,
  Typography,
} from '@mui/joy';
import { useFetcher } from '@remix-run/react';

import {
  EtcdServiceList,
  SequenceOptions,
  EtcdServerListServiceStatusColorTypes,
  etcdServerListServiceStatus,
  etcdServerListServiceStatusColor,
  ServiceControlStopStatusTypes,
  serviceControlStopStatus,
  ServiceContolParams,
} from '../models/server-control.model';

import ModalConfirm from './ModalConfirm';
import TableRows from './TableRows';

const _sequenceOptions: SequenceOptions = [
  { key: 'none', value: 0 },
  { key: '3(s)', value: 3 },
  { key: '5(s)', value: 5 },
  { key: '10(s)', value: 10 },
  { key: '15(s)', value: 15 },
  { key: '20(s)', value: 20 },
  { key: '30(s)', value: 30 },
  { key: '60(s) - 1분', value: 60 },
  { key: '90(s) - 1분 30초', value: 90 },
  { key: '120(s) - 2분', value: 120 },
  { key: '180(s) - 3분', value: 180 },
  { key: '240(s) - 4분', value: 240 },
  { key: '300(s) - 5분', value: 300 },
  { key: '600(s) - 10분', value: 600 },
  { key: '1800(s) - 30분', value: 1800 },
  { key: '3600(s) - 1시간', value: 3600 },
];

export interface ServerControlTableProps {
  lists: EtcdServiceList[];
}

export function ServerControlTable(props: ServerControlTableProps) {
  const { lists } = props;
  const [selectedSequnce, setSelectedSequnce] = useState<number>(
    _sequenceOptions[0].value,
  );
  const fetcher = useFetcher();
  const [showModal, setShowModal] = useState(false);
  const onCancel = () => setShowModal(false);
  const onConfirm = () => setShowModal(false);

  const [action, setAction] = useState<ServiceControlStopStatusTypes>();
  const [request, setRequest] = useState<
    | ServiceContolParams['service_stop_all']
    | ServiceContolParams['service_stop_each']
    | ServiceContolParams['server_stop_force']
  >();

  const handleSelectChange = (
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
    value: number,
  ) => {
    setSelectedSequnce(value);
  };

  const handleConfirm = (params: {
    actionParam: ServiceControlStopStatusTypes;
    requestParam:
      | ServiceContolParams['service_stop_all']
      | ServiceContolParams['service_stop_each']
      | ServiceContolParams['server_stop_force'];
  }) => {
    const { actionParam, requestParam } = params;
    setAction(actionParam);
    setRequest(requestParam);
    setShowModal(true);
  };

  return (
    <>
      <ModalConfirm
        open={showModal}
        action={action}
        request={request}
        fetcher={fetcher}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          position: 'relative',
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'flex-start',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
          width: '100%',
        }}
      >
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <FormControl size="sm" sx={{ flex: 1 }}>
            <FormLabel>Server status update time (seconds)</FormLabel>
            <Select
              size="sm"
              placeholder="Server status update time (seconds)"
              defaultValue={selectedSequnce}
              onChange={handleSelectChange}
              slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
            >
              {_sequenceOptions.map((option) => (
                <Option key={option.key} value={option.value}>
                  {option.key}
                </Option>
              ))}
            </Select>
          </FormControl>
          <Button
            type="button"
            variant="solid"
            color="primary"
            startDecorator={<RefreshRounded />}
            sx={{ height: '32px' }}
          >
            Menual Refresh (수동 동기화)
          </Button>
          <div style={{ marginLeft: '20px' }}>
            <Box display="flex" gap={3} sx={{ flexWrap: 'wrap' }}>
              {Object.keys(etcdServerListServiceStatus).map((index) => (
                <Box display="flex" alignItems="center" key={index}>
                  <Typography
                    fontWeight="bold"
                    color={etcdServerListServiceStatusColor[index]}
                  >
                    ■ {etcdServerListServiceStatus[index]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </div>

          {/* 맨 우측에 위치시키기 위해 margin-left: auto 추가 */}
          <Button
            type="button"
            variant="solid"
            color="danger"
            startDecorator={<WarningRounded />}
            sx={{ height: '32px', position: 'absolute', right: 0 }}
            onClick={() =>
              handleConfirm({
                actionParam: serviceControlStopStatus.SERVICE_STOP_ALL,
                requestParam: {
                  service_name: 'all',
                  service_status: 3,
                },
              })
            }
          >
            서비스 전체 중지 요청
          </Button>
        </Stack>
      </Box>

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
              <th style={{ width: 'auto', padding: '12px 6px' }}>Service</th>
              <th style={{ width: 'auto', padding: '12px 6px' }}>Service ID</th>
              <th style={{ width: 'auto', padding: '12px 6px' }}>Group</th>
              <th style={{ width: 'auto', padding: '12px 6px' }}>Status</th>
              <th style={{ width: 'auto', padding: '12px 6px' }}>
                Startup Time
              </th>
              <th style={{ width: 'auto', padding: '12px 6px' }}>
                Server Action
              </th>
              <th style={{ width: 'auto', padding: '12px 6px' }}>
                Service Action
              </th>
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <TableRows lists={lists} handleConfirm={handleConfirm} />
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
