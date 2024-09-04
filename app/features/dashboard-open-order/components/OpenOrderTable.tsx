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

import { Pagination } from '~/common/libs';
import { DEFAULT_SYMBOL_LIST } from '~/consts/consts';
import { getComparator, Order } from '~/utils/ordering';

import {
  OpenOrder,
  OpenOrderCombineProps,
  OpenOrderSearchValues,
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
} from '../models/open-order.model';

function RowMenu({
  fetcher,
  order_id,
  account_id,
  symbol,
  page,
  limit,
}: {
  fetcher: FetcherWithComponents<unknown>;
  symbol: string;
  order_id: string;
  account_id: string;
  page: string;
  limit: string;
}) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDeleteClick = () => {
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    fetcher.submit(
      {
        action: 'delete',
        symbol,
        order_id,
        account_id,
        page,
        limit,
      },
      { method: 'POST', action: './' },
    );
    setOpenConfirm(false);
  };

  const handleCancel = () => {
    setOpenConfirm(false);
  };

  return (
    <Fragment>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: 'plain', color: 'neutral', size: 'sm' },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem color="primary">Create</MenuItem>
          <Divider />
          <MenuItem color="warning">Edit</MenuItem>
          <Divider />
          {/* Delete */}
          <MenuItem color="danger" onClick={handleDeleteClick}>
            Order Cancel
          </MenuItem>
        </Menu>
      </Dropdown>
      {/* 모달 구현 */}
      <Modal open={openConfirm} onClose={handleCancel}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirm Cancellation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to cancel this order?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleConfirm}>
              OK
            </Button>
            <Button variant="plain" color="neutral" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Fragment>
  );
}

export function OpenOrderTable({
  responseProps,
  queriesProps,
}: OpenOrderCombineProps) {
  const {
    data: {
      list,
      pagination: { total, page_no, page_size },
    },
  } = responseProps;
  const { account_id, page, limit } = queriesProps;

  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = useState<number>();

  const { control, handleSubmit, watch, setValue } =
    useForm<OpenOrderSearchValues>({
      defaultValues: {
        account_id,
        symbol: '',
        order_id: '',
        client_order_id: '',
        limit,
      },
    });

  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    no,
    page: currentPage,
    previous_page,
    pageNumbers,
    next_page,
    result_data,
  } = Pagination<OpenOrder>({
    $current_page: Number(page),
    $num_records: Number(total),
    $record_data: list,
    $num_records_per_page: Number(limit),
  });

  useEffect(() => {
    if (!list.length && theadRef.current) {
      const thElements = theadRef.current.querySelectorAll('th');
      setThCount(thElements.length);
    }
  }, [list]);

  useEffect(() => {
    if (limit) {
      setValue('limit', limit);
    }
  }, [limit]);

  const handlePagination = ($page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String($page));
    navigate(`./?${params.toString()}`);
  };

  return (
    <Fragment>
      {/* search mobile */}
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl size="sm">
                <FormLabel>Category</FormLabel>
              </FormControl>
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      {/* search desktop */}
      <Sheet
        className="SearchAndFilters-tabletUp"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        <Form method="get" action="./">
          <Box
            className="SearchAndFilters-tabletUp"
            sx={{
              borderRadius: 'sm',
              pt: 2,
              pb: 1,
              display: { xs: 'none', sm: 'flex' },
              flexWrap: 'wrap',
              gap: 1.5,
              '& > *': {
                minWidth: { xs: '120px', md: '160px' },
              },
            }}
          >
            <Stack direction="row" alignItems="flex-end" spacing={1}>
              <FormControl size="sm" sx={{ flex: 1 }}>
                <FormLabel>account_id</FormLabel>
                <Controller
                  name="account_id"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="account_id"
                      size="sm"
                      placeholder="Search"
                      startDecorator={<AccountCircleIcon />}
                    />
                  )}
                />
              </FormControl>
            </Stack>

            <Stack direction="row" alignItems="flex-end" spacing={1}>
              <FormControl size="sm" sx={{ flex: 1 }}>
                <FormLabel>symbol</FormLabel>
                <Controller
                  name="symbol"
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <Select
                      name={name}
                      placeholder={name}
                      value={value}
                      onChange={(event, newValue) => onChange(newValue)}
                      onBlur={onBlur}
                      size="sm"
                      slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    >
                      {(
                        Object.keys(DEFAULT_SYMBOL_LIST) as Array<
                          keyof typeof DEFAULT_SYMBOL_LIST
                        >
                      ).map((key) => (
                        <>
                          <Option value={DEFAULT_SYMBOL_LIST[key]}>
                            {DEFAULT_SYMBOL_LIST[key]}
                          </Option>
                        </>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>

            <Stack
              direction="row"
              alignItems="flex-end"
              spacing={1}
              sx={{ flex: 1 }}
            >
              <FormControl sx={{ flex: 1 }} size="sm">
                <FormLabel>order_id</FormLabel>
                <Controller
                  name="order_id"
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <Input
                      name={name}
                      placeholder={name}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      size="sm"
                      startDecorator={<SearchIcon />}
                    />
                  )}
                />
              </FormControl>

              <FormControl sx={{ flex: 1 }} size="sm">
                <FormLabel>client_order_id</FormLabel>
                <Controller
                  name="client_order_id"
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <Input
                      name={name}
                      placeholder={name}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      size="sm"
                      startDecorator={<SearchIcon />}
                    />
                  )}
                />
              </FormControl>

              <FormControl sx={{ flex: 1 }} size="sm">
                <FormLabel>transaction_id</FormLabel>
                <Controller
                  name="transaction_id"
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <Input
                      name={name}
                      placeholder={name}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      size="sm"
                      startDecorator={<SearchIcon />}
                    />
                  )}
                />
              </FormControl>

              <FormControl size="sm">
                <FormLabel>Category</FormLabel>
                <Controller
                  name="limit"
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <Select
                      name={name}
                      placeholder={name}
                      value={value ?? limit}
                      onChange={(event, newValue) => onChange(newValue)}
                      onBlur={onBlur}
                      size="sm"
                      slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    >
                      <Option value="10">10</Option>
                      <Option value="20">20</Option>
                      <Option value="30">30</Option>
                      <Option value="40">40</Option>
                      <Option value="50">50</Option>
                      <Option value="70">70</Option>
                      <Option value="100">100</Option>
                    </Select>
                  )}
                />
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                color="primary"
                sx={{ height: '32px' }}
              >
                Search
              </Button>
            </Stack>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography level="body-sm">Total data count {total}</Typography>
          </Box>
        </Form>
      </Sheet>

      <Sheet
        className="OrderTableContainer"
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
          <thead ref={theadRef}>
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
                        ? list.map((row) => row.order_id)
                        : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === list.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 50, padding: '12px 6px' }}>no.</th>
              <th style={{ width: 100, padding: '12px 6px' }}>
                추가/수정/취소
              </th>
              <th style={{ width: 190, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: 'lg',
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    },
                    order === 'desc'
                      ? { '& svg': { transform: 'rotate(0deg)' } }
                      : { '& svg': { transform: 'rotate(180deg)' } },
                  ]}
                >
                  order_id
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                parent_order_id
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>account_id</th>

              <th style={{ width: 180, padding: '12px 6px' }}>
                client_order_id
              </th>

              <th style={{ width: 140, padding: '12px 6px' }}>symbol</th>
              <th style={{ width: 140, padding: '12px 6px' }}>side</th>
              <th style={{ width: 140, padding: '12px 6px' }}>order_type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>create_type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>cancel_type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                stop_order_type
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>contract_type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                is_cancel_amend
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>order_status</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                cxl_rej_reason_cd
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>time_in_force</th>
              <th style={{ width: 140, padding: '12px 6px' }}>position_mode</th>
              <th style={{ width: 140, padding: '12px 6px' }}>reduce_only</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                close_on_trigger
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>quantity</th>
              <th style={{ width: 140, padding: '12px 6px' }}>org_quantity</th>
              <th style={{ width: 140, padding: '12px 6px' }}>price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>amount</th>
              <th style={{ width: 140, padding: '12px 6px' }}>trigger_price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>trail_value</th>
              <th style={{ width: 140, padding: '12px 6px' }}>active_price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>trigger_by</th>
              <th style={{ width: 140, padding: '12px 6px' }}>take_profit</th>
              <th style={{ width: 140, padding: '12px 6px' }}>stop_loss</th>
              <th style={{ width: 140, padding: '12px 6px' }}>tpsl_mode</th>
              <th style={{ width: 140, padding: '12px 6px' }}>tp_order_type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>sl_order_type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>tp_limit</th>
              <th style={{ width: 140, padding: '12px 6px' }}>sl_limit</th>
              <th style={{ width: 140, padding: '12px 6px' }}>tp_trigger_by</th>
              <th style={{ width: 140, padding: '12px 6px' }}>sl_trigger_by</th>
              <th style={{ width: 170, padding: '12px 6px' }}>
                last_exec_price
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>cum_exec_qty</th>
              <th style={{ width: 170, padding: '12px 6px' }}>
                cum_exec_open_qty
              </th>
              <th style={{ width: 170, padding: '12px 6px' }}>
                cum_exec_close_qty
              </th>
              <th style={{ width: 170, padding: '12px 6px' }}>
                cum_exec_amount
              </th>
              <th style={{ width: 170, padding: '12px 6px' }}>
                cum_exec_open_amount
              </th>
              <th style={{ width: 170, padding: '12px 6px' }}>
                cum_exec_close_amount
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>cum_exec_fee</th>
              <th style={{ width: 170, padding: '12px 6px' }}>
                cum_close_pos_open_fee
              </th>
              <th style={{ width: 170, padding: '12px 6px' }}>
                cum_close_pos_close_fee
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>cum_open_pnl</th>
              <th style={{ width: 140, padding: '12px 6px' }}>cum_close_pnl</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                cum_entry_amount
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>i_margin</th>
              <th style={{ width: 140, padding: '12px 6px' }}>margin</th>
              <th style={{ width: 140, padding: '12px 6px' }}>bkrc_price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>liq_price</th>
              <th style={{ width: 180, padding: '12px 6px' }}>updated_at</th>
              <th style={{ width: 180, padding: '12px 6px' }}>created_at</th>
              <th style={{ width: 140, padding: '12px 6px' }}>asset</th>
              <th style={{ width: 140, padding: '12px 6px' }}>ts_id</th>
              <th style={{ width: 140, padding: '12px 6px' }}>created_ts</th>
            </tr>
          </thead>

          {/* nodata */}
          {!list.length && (
            <tbody>
              <tr>
                <td colSpan={thCount}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ padding: 2 }} // 패딩 추가
                  >
                    <IconButton variant="plain" color="danger" sx={{ mr: 1 }}>
                      <WarningIcon />
                    </IconButton>
                    <Typography color="danger" fontWeight="md">
                      No Data.
                    </Typography>
                  </Box>
                </td>
              </tr>
            </tbody>
          )}

          {/* data render */}
          {!!list.length && (
            <>
              <tbody>
                {[...list]
                  .sort(getComparator(order, 'order_id'))
                  .map((row, i) => (
                    <tr key={row.order_id}>
                      <td style={{ textAlign: 'center', width: 120 }}>
                        <Checkbox
                          size="sm"
                          checked={selected.includes(row.order_id)}
                          color={
                            selected.includes(row.order_id)
                              ? 'primary'
                              : undefined
                          }
                          onChange={(event) => {
                            // eslint-disable-next-line no-confusing-arrow
                            setSelected((ids) =>
                              event.target.checked
                                ? ids.concat(row.order_id)
                                : ids.filter(
                                    (itemId) => itemId !== row.order_id,
                                  ),
                            );
                          }}
                          slotProps={{
                            checkbox: { sx: { textAlign: 'left' } },
                          }}
                          sx={{ verticalAlign: 'text-bottom' }}
                        />
                      </td>
                      <td>
                        <Typography level="body-xs">{no + i}</Typography>
                      </td>
                      <td>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                          }}
                        >
                          <RowMenu
                            fetcher={fetcher}
                            order_id={row.order_id}
                            account_id={row.account_id}
                            symbol={row.symbol}
                            page={page}
                            limit={limit}
                          />
                        </Box>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.order_id}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.parent_order_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.account_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.client_order_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.symbol}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {sideText[row.side]}[{row.side}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {orderTypeText[row.order_type]}[{row.order_type}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {createTypeText[row.create_type]}[{row.create_type}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {cancelTypeText[row.cancel_type]}[{row.cancel_type}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {stopOrderTypeText[row.stop_order_type]}[
                          {row.stop_order_type}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {contractTypeText[row.contract_type]}[
                          {row.contract_type}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {flagValueText[row.is_cancel_amend]}[
                          {row.is_cancel_amend}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {orderStatusText[row.order_status]}[{row.order_status}
                          ]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {flagValueText[row.cxl_rej_reason_cd]}[
                          {row.cxl_rej_reason_cd}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {timeInForceText[row.time_in_force]}[
                          {row.time_in_force}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {positionModeText[row.position_mode]}[
                          {row.position_mode}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {flagValueText[row.reduce_only]}[{row.reduce_only}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {flagValueText[row.close_on_trigger]}[
                          {row.close_on_trigger}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.quantity).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.org_quantity).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.price).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.amount).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.trigger_price).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.trail_value).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.active_price).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {triggerByText[row.trigger_by]}[{row.trigger_by}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.take_profit).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.stop_loss).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {tpslModeText[row.tpsl_mode]}[{row.tpsl_mode}]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {orderTypeText[row.tp_order_type]}[{row.tp_order_type}
                          ]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {orderTypeText[row.sl_order_type]}[{row.sl_order_type}
                          ]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.tp_limit).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.sl_limit).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {triggerByText[row.tp_trigger_by]}[{row.tp_trigger_by}
                          ]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {triggerByText[row.sl_trigger_by]}[{row.sl_trigger_by}
                          ]
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.last_exec_price).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_exec_qty).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_exec_open_qty).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_exec_close_qty).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_exec_amount).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_exec_open_amount).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_exec_close_amount).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_exec_fee).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_close_pos_open_fee).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_close_pos_close_fee).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_open_pnl).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_close_pnl).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.cum_entry_amount).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.i_margin).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.margin).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.bkrc_price).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.liq_price).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {dayjs(row.updated_at).format('YYYY-MM-DD HH:mm:ss')}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss')}
                        </Typography>
                      </td>

                      <td>
                        <Typography level="body-xs">
                          {Number(row.asset).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.ts_id).toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {Number(row.created_ts).toLocaleString()}
                        </Typography>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </Table>
      </Sheet>
      <Form method="get" action="./">
        <Box
          className="Pagination-laptopUp"
          sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          {previous_page && (
            <>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                startDecorator={<KeyboardArrowLeftIcon />}
                onClick={() => handlePagination(previous_page)}
              >
                Previous
              </Button>
            </>
          )}

          <Box sx={{ flex: 1 }} />
          {pageNumbers.map((pageNumber) => (
            <IconButton
              key={`pageNumber${pageNumber}`}
              size="sm"
              variant={Number(page) ? 'outlined' : 'plain'}
              color="neutral"
              sx={{
                backgroundColor:
                  currentPage === pageNumber ? '#D5DCDE' : 'transparent',
              }}
              onClick={() => handlePagination(pageNumber)}
            >
              {pageNumber}
            </IconButton>
          ))}
          <Box sx={{ flex: 1 }} />

          {next_page && (
            <>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={<KeyboardArrowRightIcon />}
                onClick={() => handlePagination(next_page)}
              >
                Next
              </Button>
            </>
          )}
        </Box>
      </Form>
    </Fragment>
  );
}
