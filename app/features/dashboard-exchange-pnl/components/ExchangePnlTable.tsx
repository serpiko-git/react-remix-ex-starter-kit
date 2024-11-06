import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Search as SearchIcon,
  Warning as WarningIcon,
  EditNote as EditIcon,
  CheckCircle as CheckIcon,
  Monitor as MonitorIcon,
  HomeRounded,
  ChevronRightRounded,
  DownloadRounded,
} from '@mui/icons-material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  Box,
  Button,
  Breadcrumbs,
  Checkbox,
  CssVarsProvider,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Snackbar,
  Table,
  Typography,
  Link,
  Stack,
} from '@mui/joy';
import { StepIcon, SvgIcon } from '@mui/material';
import { Form, useFetcher } from '@remix-run/react';
import dayjs from 'dayjs';
import { Controller, set, useForm } from 'react-hook-form';

import { BaseError } from '~/common/apis/apis.model';
import { Header } from '~/features/dashboard-common';
import { ResponsiveModal } from '~/features/modal';
import { Sidebar } from '~/features/side-bar';

import { TraceFunctionDetailForm } from './Det';
import { ExchangeBalanceTable } from './ExchangeBalanceTable';

export function ExchangePnlTable() {
  const exchangePnl = useSelector((state: RootState) => state.exchangePnl);
  const { exchangePnlData } = exchangePnl;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchangePnl());
  }, [dispatch]);

  return (
    <div>
      <h1>Exchange PnL</h1>
      <Table
        dataSource={exchangePnlData}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}
