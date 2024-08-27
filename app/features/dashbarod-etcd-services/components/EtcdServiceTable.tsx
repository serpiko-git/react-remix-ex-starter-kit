
import * as React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  ArrowDropDown as ArrowDropDownIcon,
  AutorenewRounded as AutorenewRoundedIcon,
  Block as BlockIcon,
  CheckRounded as CheckRoundedIcon,
  FilterAlt as FilterAltIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  AccountCircle as AccountCircleIcon,
  WarningRounded as WarningRoundedIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Dropdown,
  FormControl,
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
  Alert,
  Stack,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/joy';
import {
  FetcherWithComponents,
  Form,
  useFetcher,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { Pagination } from '~/common/libs/pagination';
import { DEFAULT_SYMBOL_LIST } from '~/consts/consts';
import {
  EtcdService,
  cancelTypeText,
  contractTypeText,
  createTypeText,
  flagValueText,
  orderStatusText,
  orderTypeText,
  positionModeText,
  sideText,
  stopOrderTypeText,
  timeInForceText,
  tpslModeText,
  triggerByText,
} from '~/features/dashbarod-etcd-services';
