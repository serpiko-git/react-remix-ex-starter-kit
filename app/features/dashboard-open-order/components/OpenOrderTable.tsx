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
} from '@mui/joy';
import { ColorPaletteProp } from '@mui/joy/styles';
import { Form } from '@remix-run/react';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';

import {
  OpenOrder,
  OpenOrderCombineProps,
  OpenOrderResponse,
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
} from '..';

const rows = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
  },
  {
    id: 'INV-1233',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem color="primary">Detail</MenuItem>
        <Divider />
        <MenuItem color="warning">Edit</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}
export function OpenOrderTable({
  openOrderResponseProps,
  openOrderQueriesProps,
}: OpenOrderCombineProps) {
  const {
    data: { items, total },
  } = openOrderResponseProps;

  const { account_id, page, limit } = openOrderQueriesProps;

  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = React.useState<number>();

  const { control, handleSubmit, watch } = useForm<OpenOrderSearchValues>({
    defaultValues: { account_id, category_key: '', category_value: '' },
  });

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [numberOfPosts, setNumberOfPosts] = useState<number>(Number(total)); // 전체 포스트 개수
  const [numberOfPages, setNumberOfPages] = useState<number>(0); // 화면에 보일 전체 페이지 수

  // 포스트 리스트 데이터를 가져오면, 전체 페이지 개수를 갱신한다
  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts]);

  useEffect(() => {
    if (!items.length && theadRef.current) {
      // theadRef.current.querySelectorAll('th')를 사용
      const thElements = theadRef.current.querySelectorAll('th');
      setThCount(thElements.length);
    }
  }, [items]);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>

        <Controller
          name="category_key"
          control={control}
          render={({ field }) => (
            <Select
              size="sm"
              placeholder="Select by category"
              slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
            >
              <Option value="order_id">order_id</Option>
              <Option value="parent_order_id">parent_order_id</Option>
              <Option value="account_id">account_id</Option>
              <Option value="symbol">symbol</Option>
              <Option value="side">side</Option>
              <Option value="order_type">order_type</Option>
              <Option value="create_type">create_type</Option>
              <Option value="cancel_type">cancel_type</Option>
              <Option value="stop_order_type">stop_order_type</Option>
              <Option value="contract_type">contract_type</Option>
              <Option value="is_cancel_amend">is_cancel_amend</Option>
              <Option value="order_status">order_status</Option>
              <Option value="cxl_rej_reason_cd">cxl_rej_reason_cd</Option>
              <Option value="time_in_force">time_in_force</Option>
              <Option value="position_mode">position_mode</Option>
              <Option value="reduce_only">reduce_only</Option>
              <Option value="close_on_trigger">close_on_trigger</Option>
              <Option value="quantity">quantity</Option>
              <Option value="org_quantity">org_quantity</Option>
              <Option value="price">price</Option>
              <Option value="amount">amount</Option>
              <Option value="trigger_price">trigger_price</Option>
              <Option value="trail_value">trail_value</Option>
              <Option value="active_price">active_price</Option>
              <Option value="trigger_by">trigger_by</Option>
              <Option value="take_profit">take_profit</Option>
              <Option value="stop_loss">stop_loss</Option>
              <Option value="tpsl_mode">tpsl_mode</Option>
              <Option value="tp_order_type">tp_order_type</Option>
              <Option value="sl_order_type">sl_order_type</Option>
              <Option value="tp_limit">tp_limit</Option>
              <Option value="sl_limit">sl_limit</Option>
              <Option value="tp_trigger_by">tp_trigger_by</Option>
              <Option value="sl_trigger_by">sl_trigger_by</Option>
              <Option value="last_exec_price">last_exec_price</Option>
              <Option value="cum_exec_qty">cum_exec_qty</Option>
              <Option value="cum_exec_open_qty">cum_exec_open_qty</Option>
              <Option value="cum_exec_close_qty">cum_exec_close_qty</Option>
              <Option value="cum_exec_amount">cum_exec_amount</Option>
              <Option value="cum_exec_open_amount">cum_exec_open_amount</Option>
              <Option value="cum_exec_close_amount">
                cum_exec_close_amount
              </Option>
              <Option value="cum_exec_fee">cum_exec_fee</Option>
              <Option value="cum_close_pos_open_fee">
                cum_close_pos_open_fee
              </Option>
              <Option value="cum_close_pos_close_fee">
                cum_close_pos_close_fee
              </Option>
              <Option value="cum_open_pnl">cum_open_pnl</Option>
              <Option value="cum_close_pnl">cum_close_pnl</Option>
              <Option value="cum_entry_amount">cum_entry_amount</Option>
              <Option value="i_margin">i_margin</Option>
              <Option value="margin">margin</Option>
              <Option value="bkrc_price">bkrc_price</Option>
              <Option value="liq_price">liq_price</Option>
              <Option value="updated_at">updated_at</Option>
              <Option value="created_at">created_at</Option>
              <Option value="asset">asset</Option>
              <Option value="ts_id">ts_id</Option>
              <Option value="created_ts">created_ts</Option>
            </Select>
          )}
        />
      </FormControl>
    </React.Fragment>
  );

  return (
    <React.Fragment>
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
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      {/* search desktop */}
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

          {renderFilters()}
          <Stack
            direction="row"
            alignItems="flex-end"
            spacing={1}
            sx={{ flex: 1 }}
          >
            <FormControl sx={{ flex: 1 }} size="sm">
              <FormLabel>Input for category</FormLabel>
              <Controller
                name="category_value"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="category_value"
                    size="sm"
                    placeholder="category_value"
                    startDecorator={<SearchIcon />}
                  />
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
                style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
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
              <th style={{ width: 140, padding: '12px 6px' }}> </th>
            </tr>
          </thead>

          {/* nodata */}
          {!items.length && (
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
          {!!items.length && (
            <>
              <tbody>
                {[...items]
                  .sort(getComparator(order, 'order_id'))
                  .map((row) => (
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
                        <Typography level="body-xs">{row.symbol}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {sideText[row.side]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {orderTypeText[row.order_type]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {createTypeText[row.create_type]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {cancelTypeText[row.cancel_type]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {stopOrderTypeText[row.stop_order_type]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {contractTypeText[row.contract_type]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {flagValueText[row.is_cancel_amend]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {orderStatusText[row.order_status]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {flagValueText[row.cxl_rej_reason_cd]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {timeInForceText[row.time_in_force]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {positionModeText[row.position_mode]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {flagValueText[row.reduce_only]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {flagValueText[row.close_on_trigger]}
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
                          {triggerByText[row.trigger_by]}
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
                          {tpslModeText[row.tpsl_mode]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {orderTypeText[row.tp_order_type]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {orderTypeText[row.sl_order_type]}
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
                          {triggerByText[row.tp_trigger_by]}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {triggerByText[row.sl_trigger_by]}
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
                      <td>
                        <Box
                          sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                        >
                          {/* <Link level="body-xs" component="button">
                            Download
                          </Link> */}
                          <RowMenu />
                        </Box>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </Table>
      </Sheet>
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
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map(($page) => (
          <IconButton
            key={$page}
            size="sm"
            variant={Number($page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {$page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
          onClick={(e) => console.log(e)}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
