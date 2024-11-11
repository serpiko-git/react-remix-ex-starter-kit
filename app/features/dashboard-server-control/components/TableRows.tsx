import { Fragment, useEffect, useRef, useState } from 'react';

import {
  ArrowDropDown as ArrowDropDownIcon,
  FilterAlt as FilterAltIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  AccountCircle as AccountCircleIcon,
  WarningRounded as WarningRoundedIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  FormLabel,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Table,
  Typography,
  iconButtonClasses,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  FormControl,
} from '@mui/joy';
import {
  FetcherWithComponents,
  Form,
  useFetcher,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import dayjs from 'dayjs';

import {
  EtcdServerListServiceStatusColorTypes,
  EtcdServiceList,
  ServiceContolParams,
  ServiceControlStopStatusTypes,
  etcdServerListServiceStatus,
  etcdServerListServiceStatusColor,
  serviceControlStopStatus,
} from '../models/server-control.model';

import ModalConfirm from './ModalConfirm';
export interface TableRowsProps {
  lists: EtcdServiceList[];
  handleConfirm: (params: {
    actionParam: ServiceControlStopStatusTypes;
    requestParam:
      | ServiceContolParams['service_stop_all']
      | ServiceContolParams['service_stop_each']
      | ServiceContolParams['server_stop_force'];
  }) => void;
}

export default function TableRows(props: TableRowsProps) {
  const { lists, handleConfirm } = props;

  return (
    <>
      {lists.map((list, index) => (
        <tr key={list.service_id}>
          <td></td>
          <td>
            <Typography level="body-xs">{index + 1}</Typography>
          </td>
          <td style={{ padding: '12px 6px' }}>{list.service_name}</td>
          <td style={{ padding: '12px 6px' }}>{list.service_id}</td>
          <td style={{ padding: '12px 6px' }}>
            {list.service_group ? list.service_group : 'no data'}
          </td>
          <td style={{ padding: '12px 6px' }}>
            <Typography
              fontWeight="bold"
              color={etcdServerListServiceStatusColor[list.service_status]}
              fontSize="md"
            >
              {etcdServerListServiceStatus[list.service_status]}
            </Typography>
          </td>
          <td style={{ padding: '12px 6px' }}>
            {dayjs(list.created_at).format('YYYY-MM-DD HH:mm:ss')}
          </td>
          <td style={{ padding: '12px 6px' }}>
            <Button
              type="button"
              variant="solid"
              color="primary"
              sx={{ height: '32px' }}
              onClick={() =>
                handleConfirm({
                  actionParam: serviceControlStopStatus.SERVER_STOP_FORCE,
                  requestParam: {
                    service_id: list.service_id,
                    service_status: 5,
                  },
                })
              }
            >
              서버 강제 중지
            </Button>
          </td>
          <td style={{ padding: '12px 6px' }}>
            <Button
              type="button"
              variant="solid"
              color="danger"
              sx={{ height: '32px' }}
              onClick={() =>
                handleConfirm({
                  actionParam: serviceControlStopStatus.SERVICE_STOP_EACH,
                  requestParam: {
                    service_name: list.service_name,
                    service_status: 3,
                  },
                })
              }
            >
              서비스 중지 요청
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
