import React, { ChangeEvent, useEffect, useState } from 'react';

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
  Warning as WarningIcon,
  EditNote as EditIcon,
  CheckCircle as CheckIcon,
  Monitor as MonitorIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  ColorPaletteProp,
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
import { ResponsiveModal } from '~/features/modal';

import {
  EtcdService,
  etcdServiceActive,
  EtcdServiceCombineProps,
  etcdServiceName,
  EtcdServiceSearchValues,
  etcdServiceStatus,
  EtcdServiceStatusTypes,
} from '../models/etcd-service.model';

import { AcsDetailForm } from './AcsDetailForm';

export function EtcdServiceTable({
  responseProps,
  queriesProps,
}: EtcdServiceCombineProps) {
  const {
    data: { list },
  } = responseProps;
  const fetcher = useFetcher();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<EtcdService | null>(
    null,
  );
  const [isEditServiceStatus, setIsEditServiceStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState<BaseError | null>(null);
  const [isOpenFailAlert, setIsOpenFailAlert] = useState(false);
  const [isOpenSuccessAlert, setIsOpenSuccessAlert] = useState(false);
  const [serviceId, setServiceId] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');
  const [serviceHost, setServiceHost] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);

  const { control } = useForm<EtcdServiceSearchValues>({});

  const handleChangeCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const { checked } = e.currentTarget;
    if (checked) {
      setSelected((ids) => ids.concat(id));
    } else {
      setSelected((ids) => ids.filter((itemId) => itemId !== id));
    }
  };

  const handleMonitorService = (item: EtcdService) => {
    setServiceId(item.service_id);
    setServiceName(item.service_name);
    setServiceHost(item.service_host);
    setModalOpen(true);
  };

  const handleClickEditButton = (item: EtcdService) => {
    setSelectedListItem(item);
    setIsEditServiceStatus(true);
  };

  const handleModifyServiceStatus = (
    e: React.MouseEvent<HTMLButtonElement>,
    newValue: EtcdServiceStatusTypes,
  ) => {
    fetcher.submit(
      {
        action: 'update',
        service_id: selectedListItem.service_id,
        service_status: newValue,
      },
      { method: 'POST', action: './' },
    );
    setIsEditServiceStatus(false);
    setSelectedListItem(null);
  };

  const handleCloseAlert = () => {
    setIsOpenFailAlert(false);
    setErrorMsg(null);
  };

  useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data as BaseError;
      if (data.code !== 0) {
        setErrorMsg(fetcher.data as BaseError);
        setIsOpenFailAlert(true);
      } else {
        setIsOpenSuccessAlert(true);
      }
    }
  }, [fetcher]);

  const calculateTimeDifference = (rowCreatedAt: Date) => {
    const now = Date.now();
    const createdAtMillis = dayjs(rowCreatedAt).valueOf();
    const differenceInMillis = now - createdAtMillis;

    const hours = Math.floor(differenceInMillis / (1000 * 60 * 60));
    const minutes = Math.floor(
      (differenceInMillis % (1000 * 60 * 60)) / (1000 * 60),
    );

    return `${hours} hours, ${minutes} minutes`;
  };

  return (
    <>
      <Form method="get" action="./">
        <Box
          className="SearchAndFilters-tabletUp"
          sx={{
            borderRadius: 'sm',
            py: 2,
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            gap: 1.5,
            '& > *': {
              minWidth: { xs: '120px', md: '160px' },
            },
          }}
        >
          <FormControl size="sm" sx={{ flex: 1 }}>
            <FormLabel>service_id</FormLabel>
            <Controller
              name="service_id"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="service_id"
                  size="sm"
                  placeholder="service_id"
                  startDecorator={<SearchIcon />}
                />
              )}
            />
          </FormControl>

          <FormControl size="sm" sx={{ flex: 1 }}>
            <FormLabel>service_name</FormLabel>
            <Controller
              name="service_name"
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <Select
                  name={name}
                  placeholder={name}
                  value={value}
                  onChange={(event, newValue) => onChange(newValue)}
                  onBlur={onBlur}
                  slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                  <Option value="">
                    <em>service_name</em>
                  </Option>
                  {Object.values(etcdServiceName).map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl size="sm" sx={{ flex: 1 }}>
            <FormLabel>active</FormLabel>
            <Controller
              name="active"
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <Select
                  name={name}
                  placeholder={name}
                  value={value}
                  onChange={(event, newValue) => onChange(newValue)}
                  onBlur={onBlur}
                  slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                  <>
                    <Option value="">
                      <em>active</em>
                    </Option>
                    {Object.values(etcdServiceActive).map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </>
                </Select>
              )}
            />
          </FormControl>

          <Button type="submit" variant="solid" color="primary" size="sm">
            Search
          </Button>
        </Box>
      </Form>
      {Boolean(modalOpen) && (
        <>
          <ResponsiveModal
            title={serviceName}
            header={serviceHost}
            onOpen={modalOpen}
            onSetOpen={setModalOpen}
          >
            <AcsDetailForm serviceId={serviceId} />
          </ResponsiveModal>
        </>
      )}
      <Sheet
        className="EtcdServiceTableContainer"
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
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== list.length
                  }
                  checked={selected.length === list.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked
                        ? list.map((row) => row.service_id)
                        : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === list.length
                      ? 'primary'
                      : undefined
                  }
                />
              </th>
              <th style={{ width: 50, padding: '12px 6px' }}>No.</th>
              <th style={{ width: 140, padding: '12px 6px' }}>service_name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>service_desc</th>
              <th style={{ width: 140, padding: '12px 6px' }}>service_group</th>
              <th style={{ width: 140, padding: '12px 6px' }}>service_host</th>
              <th style={{ width: 140, padding: '12px 6px' }}>service_id</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                service_endpoints
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                service_status
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                service_version
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>uptime</th>
              <th style={{ width: 140, padding: '12px 6px' }}>created_at</th>
              <th style={{ width: 140, padding: '12px 6px' }}>updated_at</th>
            </tr>
          </thead>
          {!list.length && (
            <tbody>
              <tr>
                <td colSpan={14}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ padding: 2 }}
                  >
                    <IconButton variant="plain" color="danger" sx={{ mr: 1 }}>
                      <WarningIcon />
                    </IconButton>
                    <Typography color="danger" fontWeight="md">
                      No Data
                    </Typography>
                  </Box>
                </td>
              </tr>
            </tbody>
          )}
          {!!list.length && (
            <tbody>
              {[...list].map((row, i) => (
                <tr key={row.service_id}>
                  <td style={{ textAlign: 'center', width: 120 }}>
                    <Checkbox
                      size="sm"
                      checked={selected.includes(row.service_id)}
                      color={
                        selected.includes(row.service_id)
                          ? 'primary'
                          : undefined
                      }
                      onChange={(e) => handleChangeCheckbox(e, row.service_id)}
                    />
                  </td>
                  <td>
                    <Typography level="body-xs">{i + 1}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.service_name}</Typography>
                  </td>
                  <td>
                    {row.service_name === 'acs' ? (
                      <Chip
                        variant="soft"
                        startDecorator={
                          {
                            1: <MonitorIcon />,
                            2: <AutorenewRoundedIcon />,
                            3: <BlockIcon />,
                          }[1]
                        }
                        color={
                          {
                            1: 'success',
                            2: 'neutral',
                            3: 'danger',
                          }[1] as ColorPaletteProp
                        }
                        onClick={() => handleMonitorService(row)}
                      >
                        Show Details
                      </Chip>
                    ) : (
                      <Chip
                        variant="soft"
                        startDecorator={
                          {
                            1: <CheckRoundedIcon />,
                            2: <AutorenewRoundedIcon />,
                            3: <BlockIcon />,
                          }[3]
                        }
                        color={
                          {
                            1: 'success',
                            2: 'neutral',
                            3: 'danger',
                          }[3] as ColorPaletteProp
                        }
                      >
                        Not Supported
                      </Chip>
                    )}
                  </td>
                  <td>
                    <Typography level="body-xs">{row.service_group}</Typography>
                  </td>
                  <td style={{ wordBreak: 'break-word' }}>
                    <Typography level="body-xs">{row.service_host}</Typography>
                  </td>
                  <td style={{ wordBreak: 'break-word' }}>
                    <Typography level="body-xs">{row.service_id}</Typography>
                  </td>
                  <td style={{ wordBreak: 'break-word' }}>
                    <Typography level="body-xs">
                      {row.service_endpoints !== null &&
                      !!row.service_endpoints.length ? (
                        <ul style={{ margin: 0, padding: 0 }}>
                          <li>protocol: {row.service_endpoints[0].protocol}</li>
                          <li>host: {row.service_endpoints[0].host}</li>
                          <li>port: {row.service_endpoints[0].port}</li>
                        </ul>
                      ) : (
                        <>{JSON.stringify(row.service_endpoints)}</>
                      )}
                    </Typography>
                  </td>
                  <td>
                    {isEditServiceStatus &&
                    selectedListItem.service_id === row.service_id ? (
                      <fetcher.Form method="post">
                        <Select
                          size="sm"
                          placeholder="service_status"
                          defaultValue={row.service_status}
                          onChange={handleModifyServiceStatus}
                        >
                          {Object.keys(etcdServiceStatus).map((item) => (
                            <Option key={item} value={Number(item)}>
                              {etcdServiceStatus[item]}({item})
                            </Option>
                          ))}
                        </Select>
                      </fetcher.Form>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Typography level="body-xs">
                          {etcdServiceStatus[row.service_status]}(
                          {row.service_status})
                        </Typography>
                        <IconButton
                          sx={{ '--Icon-fontSize': '22px' }}
                          onClick={() => handleClickEditButton(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    )}
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {row.service_version}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {calculateTimeDifference(row.created_at)}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {dayjs(row.updated_at).format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </Sheet>

      {errorMsg && (
        <Snackbar
          open={isOpenFailAlert}
          size="sm"
          variant="solid"
          color="danger"
          startDecorator={<WarningIcon />}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleCloseAlert}
        >
          {errorMsg.msg}
        </Snackbar>
      )}
      <Snackbar
        open={isOpenSuccessAlert}
        size="sm"
        variant="solid"
        color="success"
        startDecorator={<CheckIcon />}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setIsOpenSuccessAlert(false)}
      >
        Success!
      </Snackbar>
    </>
  );
}
