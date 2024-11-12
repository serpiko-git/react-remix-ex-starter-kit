import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

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
import { JSX } from 'react/jsx-runtime';

import {
  ServiceContolParams,
  ServiceControlStopStatusTypes,
  serviceControlStopStatus,
} from '../models/server-control.model';
interface ModalConfirmlProps {
  open: boolean;
  serviceFetchActionType: ServiceControlStopStatusTypes;
  requestParams:
    | ServiceContolParams['service_stop_all']
    | ServiceContolParams['service_stop_each']
    | ServiceContolParams['server_stop_force'];
  fetcher: FetcherWithComponents<unknown>;
  onCancel: () => void;
  onConfirm: () => void;
  pollingStart: ($seconds: number) => void;
  selectedSeconds: number;
  pollingStop: () => void;
}

export default function ModalConfirm(props: ModalConfirmlProps) {
  const {
    open,
    fetcher,
    serviceFetchActionType,
    requestParams,
    onCancel,
    onConfirm,
    pollingStart,
    selectedSeconds,
    pollingStop,
  } = props;

  const handleConfirm = () => {
    // 모달의 OK 버튼을 클릭하면 fetcher.submit 호출
    fetcher.submit(
      {
        serviceFetchActionType,
        ...requestParams,
      },
      { method: 'post', action: './' },
    );

    onConfirm(); // 모달 닫기
  };

  useEffect(() => {
    if (open) {
      pollingStop();
    } else {
      pollingStart(selectedSeconds);
    }
  }, [open]);

  let description: JSX.Element = null;

  /** 서비스 전체 중지 요청 */
  if (serviceFetchActionType === serviceControlStopStatus.SERVICE_STOP_ALL) {
    description = (
      <Stack direction="row" alignItems="center">
        <Typography fontWeight="bold" fontSize="lg" color="danger">
          서비스 전체 중지 요청
        </Typography>
        <Typography>을 실행 하시겠습니까?</Typography>
      </Stack>
    );
    /** 서비스 중지 요청 */
  } else if (
    serviceFetchActionType === serviceControlStopStatus.SERVICE_STOP_EACH
  ) {
    const { service_name } =
      requestParams as ServiceContolParams['service_stop_each'];
    description = (
      <Stack direction="row" alignItems="center">
        <Typography fontWeight="bold" fontSize="lg" color="danger">
          서비스 중지 요청({service_name})
        </Typography>
        <Typography>을 실행 하시겠습니까?</Typography>
      </Stack>
    );
    /** 서버 강제 중지 */
  } else if (
    serviceFetchActionType === serviceControlStopStatus.SERVER_STOP_FORCE
  ) {
    const { service_id } =
      requestParams as ServiceContolParams['server_stop_force'];
    description = (
      <Stack direction="row" alignItems="center">
        <Typography fontWeight="bold" fontSize="lg" color="primary">
          서버 강제 중지({service_id})
        </Typography>
        <Typography>를 실행 하시겠습니까?</Typography>
      </Stack>
    );
  }

  return (
    <Fragment>
      {/* 모달 구현 */}
      <Modal
        open={open}
        onClose={onCancel}
        sx={{
          '& > .MuiBackdrop-root': {
            backdropFilter: 'blur(2px)',
          },
        }}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirm
          </DialogTitle>
          <Divider />
          <DialogContent>{description}</DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleConfirm}>
              실행
            </Button>
            <Button variant="plain" color="neutral" onClick={onCancel}>
              취소
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Fragment>
  );
}
