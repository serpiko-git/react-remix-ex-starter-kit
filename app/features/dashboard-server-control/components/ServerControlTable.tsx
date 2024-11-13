import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  RefreshRounded,
  WarningRounded,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
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
  Snackbar,
} from '@mui/joy';
import { useActionData, useFetcher } from '@remix-run/react';
import dayjs from 'dayjs';

import { usePolling } from '~/common/hooks/usePolling';

import {
  EtcdServiceList,
  SequenceOptions,
  etcdServerListServiceStatus,
  etcdServerListServiceStatusColor,
  ServiceControlStopStatusTypes,
  serviceControlStopStatus,
  ServiceContolParams,
  EtcdServiceListResponse,
} from '../models/server-control.model';

import ModalConfirm from './ModalConfirm';
import TableRows from './TableRows';

const _secondsOptions: SequenceOptions = [
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
  /** props */
  const { lists } = props;
  const fetcher = useFetcher();
  // const actionData = useActionData();
  const isExecution = useRef(false);

  /** state */
  const [showModal, setShowModal] = useState(false);
  const [selectedSeconds, setSelectedSeconds] = useState<number>(
    _secondsOptions[0].value,
  );
  const [serviceFetchActionType, setServiceFetchActionType] =
    useState<ServiceControlStopStatusTypes>();
  const [requestParams, setRequestParams] = useState<
    | ServiceContolParams['service_stop_all']
    | ServiceContolParams['service_stop_each']
    | ServiceContolParams['server_stop_force']
  >();
  const [updatedLists, setUpdatedLists] = useState<EtcdServiceList[]>(lists);
  const [lastUpdate, setLastUpdate] = useState<string>();

  const [isOpenSuccessAlert, setIsOpenSuccessAlert] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState('');

  const [isOpenFailAlert, setIsOpenFailAlert] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('');

  /** functions */
  const onCancel = () => setShowModal(false);

  const onConfirm = () => setShowModal(false);

  const handleSelectChange = (
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
    value: number,
  ) => {
    const selectedText = (event.target as HTMLElement).textContent;

    setIsOpenSuccessAlert(true);
    setSnackbarSuccessMessage(`폴링 주기가 ${value}초로 선택되었습니다`);

    setSelectedSeconds(value);
  };

  const handleConfirm = (params: {
    actionParam: ServiceControlStopStatusTypes;
    requestParam:
      | ServiceContolParams['service_stop_all']
      | ServiceContolParams['service_stop_each']
      | ServiceContolParams['server_stop_force'];
  }) => {
    // ModalConfirm에 전달하기 위한 값들
    const { actionParam, requestParam } = params;
    setServiceFetchActionType(actionParam);
    setRequestParams(requestParam);
    setShowModal(true);
  };

  const onPoll = useCallback(async () => {
    try {
      await fetcher.submit({}, { method: 'get', action: './' });
    } catch (error) {
      console.error('Polling error:', error);
    }
  }, []);

  const { start: pollingStart, stop: pollingStop } = usePolling(onPoll);

  const handleRefresh = () => {
    if (isExecution.current === true) {
      setIsOpenFailAlert(true);
      setSnackbarErrorMessage('기존 요청을 처리중입니다');
      return;
    }

    setIsOpenSuccessAlert(true);
    setSnackbarSuccessMessage('수동 폴링을 요청하였습니다');

    // pollingStop(); // 수동 리프레시 시 자동 갱신 중지

    fetcher.submit({}, { method: 'get', action: './' });

    isExecution.current = true;
  };

  // 타이머 주기에 따른 자동 갱신을 설정
  useEffect(() => {
    // if (isExecution.current) {
    //   console.log('요청 처리 중 폴링 중지');
    //   return;
    // }

    if (selectedSeconds > 0) {
      pollingStart(selectedSeconds); // 선택한 주기에 맞춰 밀리초로 변환하여 타이머 시작
    } else {
      pollingStop(); // 선택 주기가 0이면 타이머 중지
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (selectedSeconds > 0) {
        pollingStop();
      }
    };
  }, [selectedSeconds, pollingStart, pollingStop]);

  /**
   * fetcher idle 모드에는 옵션값이 없다
   * 현재 fetcher.submit 을 이용하여 GET, POST 를 모두 사용하고 있으므로
   * 서버사이드(loader)에서 method=GET 을 넣어 POST를 감지 하지 않도록 한다
   */
  useEffect(() => {
    // console.log('fetcher', fetcher);
    if (fetcher.state === 'idle') {
      let method;
      if ((fetcher.data as EtcdServiceListResponse)?.method) {
        method = (fetcher.data as EtcdServiceListResponse).method;
      }

      const data = fetcher.data as EtcdServiceListResponse;

      if (typeof data === 'object') {
        setLastUpdate(
          dayjs(new Date()).format('YYYY년 MM월 DD일 HH시 mm분 ss.SSS초'),
        );

        if (method === 'GET') {
          if (data?.data?.list) {
            setUpdatedLists(data.data.list);
          }
        }
      }

      isExecution.current = false;
    }
  }, [fetcher, fetcher.data]);

  // fetcher 가 아닌 loader 값을 감지하여 갱신하는 이펙트
  useEffect(() => {
    if (lists.length) {
      setIsOpenSuccessAlert(true);
      setSnackbarSuccessMessage('데이터가 갱신 되었습니다');

      setLastUpdate(
        dayjs(new Date()).format('YYYY년 MM월 DD일 HH시 mm분 ss.SSS초'),
      );

      setUpdatedLists(lists);
    }
  }, [lists]);

  return (
    <>
      <ModalConfirm
        open={showModal}
        serviceFetchActionType={serviceFetchActionType}
        requestParams={requestParams}
        fetcher={fetcher}
        onCancel={onCancel}
        onConfirm={onConfirm}
        pollingStart={pollingStart}
        selectedSeconds={selectedSeconds}
        pollingStop={pollingStop}
        setIsOpenSuccessAlert={setIsOpenSuccessAlert}
        setIsOpenFailAlert={setIsOpenFailAlert}
        setSnackbarMessage={setSnackbarSuccessMessage}
        setSnackbarErrorMessage={setSnackbarErrorMessage}
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
          <FormControl size="sm" sx={{ flex: 1, width: '350px' }}>
            <FormLabel>
              Last update:
              <Typography fontWeight="bold" fontSize="sm">
                {lastUpdate}
              </Typography>
            </FormLabel>
            <Select
              size="sm"
              placeholder="Server status update time (seconds)"
              defaultValue={selectedSeconds}
              onChange={handleSelectChange}
              sx={{ height: '36px' }}
            >
              {_secondsOptions.map((option) => (
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
            onClick={handleRefresh}
          >
            Refresh
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
            <TableRows lists={updatedLists} handleConfirm={handleConfirm} />
          </tbody>
        </Table>
      </Sheet>

      <Snackbar
        open={isOpenSuccessAlert}
        size="md"
        variant="solid"
        color="success"
        startDecorator={<CheckIcon />}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setIsOpenSuccessAlert(false)}
      >
        <Typography fontWeight="bold" fontSize="lg" sx={{ color: 'white' }}>
          {snackbarSuccessMessage}
        </Typography>
      </Snackbar>

      <Snackbar
        open={isOpenFailAlert}
        size="md"
        variant="solid"
        color="danger"
        startDecorator={<WarningIcon />}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setIsOpenFailAlert(false)}
      >
        <Typography fontWeight="bold" fontSize="lg" sx={{ color: 'white' }}>
          {snackbarErrorMessage}
        </Typography>
      </Snackbar>
    </>
  );
}
