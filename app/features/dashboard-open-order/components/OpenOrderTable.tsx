import * as React from 'react';

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
} from '@mui/joy';
import { ColorPaletteProp } from '@mui/joy/styles';
import dayjs from 'dayjs';

import {
  OpenOrder,
  OpenOrderResponse,
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
export function OpenOrderTable(props: OpenOrderResponse['data']) {
  const { open_orders } = props;

  console.log(open_orders);
  console.log(open_orders.length);
  console.log(open_orders[0]);

  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
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
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
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
          <thead>
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

          {!open_orders.length && (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <Box
                    display="flex"
                    justifyContent="center"
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

          {open_orders.length && (
            <>
              <tbody>
                {[...open_orders]
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
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
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
