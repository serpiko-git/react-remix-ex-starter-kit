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

import { Pagination } from '~/common/libs/pagination';
import {
  ClosedPositionPnl,
  ClosedPositionPnlCombineProps,
} from '..';
import { ClosedOrderPnlSearchValues } from '~/features/dashboard-closed-order-pnl';
import { Controller, Form, useForm } from 'react-hook-form';
import { FetcherWithComponents, useFetcher, useNavigate, useSearchParams } from '@remix-run/react';

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
  page: number;
  limit: number;
}) {
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleDeleteClick = () => {
    setOpenConfirm(true); // 모달을 열기 위해 상태를 true로 설정
  };

  const handleConfirm = () => {
    // 모달의 OK 버튼을 클릭하면 fetcher.submit 호출
    fetcher.submit(
      {
        action: 'delete',
        symbol,
        order_id,
        account_id,
        page,
        limit,
      },
      { method: 'post', action: './' },
    );
    setOpenConfirm(false); // 모달 닫기
  };

  const handleCancel = () => {
    setOpenConfirm(false); // 모달을 취소하면 닫기
  };

  return (
    <React.Fragment>
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
          <MenuItem color="primary">Detail</MenuItem>
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
    </React.Fragment>
  );
}
export function ClosedPositionPnlTable({
  responseProps,
  queriesProps,
}: ClosedPositionPnlCombineProps) {
  const {
    data: {
      pagination: {
        total,
        page_no,
        page_size
      },
      list
    }
  } = responseProps;

  const { account_id, page, limit } = queriesProps;

  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = React.useState<number>();

  const { control, handleSubmit, watch } = useForm<ClosedOrderPnlSearchValues>({
    defaultValues: { account_id,  symbol:"", order_id:"", client_order_id:"",limit},
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
  } = Pagination<ClosedPositionPnl>({
    $current_page: page,
    $num_records: Number(total),
    $record_data: list,
    $num_records_per_page: limit,
  });

  useEffect(() => {
    if (!list.length && theadRef.current) {
      // theadRef.current.querySelectorAll('th')를 사용
      const thElements = theadRef.current.querySelectorAll('th');
      setThCount(thElements.length);
    }
  }, [list]);

  // 페이지네이션 버튼 클릭 핸들러
  const handlePagination = ($page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String($page));
    navigate(`./?${params.toString()}`);
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Controller
          name='symbol'
          control={control}
          render={({ field }) => (
            <Select
              // {...field}
              name="category_key"
              size="sm"
              placeholder="Select by category"
              slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
            >
              <Option value="closed_pnl_position_id">closed_pnl_position_id</Option>
              <Option value="account_id">account_id</Option>
              <Option value="symbol">symbol</Option>
              <Option value="category">category</Option>
              <Option value="base_asset">base_asset</Option>
              <Option value="quote_asset">quote_asset</Option>
              <Option value="position_idx">position_idx</Option>
              <Option value="side">side</Option>
              <Option value="leverage">leverage</Option>
              <Option value="quantity">quantity</Option>
              <Option value="position_qty">position_qty</Option>
              <Option value="entry_amount">entry_amount</Option>
              <Option value="exit_amount">exit_amount</Option>
              <Option value="avg_entry_price">avg_entry_price</Option>
              <Option value="avg_exit_price">avg_exit_price</Option>
              <Option value="closed_pnl">closed_pnl</Option>
              <Option value="opening_fee">opening_fee</Option>
              <Option value="closing_fee">closing_fee</Option>
              <Option value="funding_fee">funding_fee</Option>
              <Option value="open_ts">open_ts</Option>
              <Option value="open_time">open_time</Option>
              <Option value="close_time">close_time</Option>
              <Option value="open_duration">open_duration</Option>
              <Option value="balance">balance</Option>
              <Option value="is_close">is_close</Option>
              <Option value="ts_id">ts_id</Option>
              <Option value="trade_ts">trade_ts</Option>
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
      <Form method="post" action="./">
        {/* search desktop */}
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
          }}>

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
                name='account_id'
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
            <FormControl size="sm">
              <FormLabel>Category</FormLabel>

              <Controller
                name="limit"
                control={control}
                render={({ field }) => (
                  <Select
                    // {...field}
                    size="sm"
                    name="limit"
                    placeholder="Limit"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    // onChange={field.onChange}
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
                      event.target.checked ? list.map((row) => row.closed_pnl_position_id) : [],
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
                  closed_pnl_position_id
                </Link>                
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>account_id</th>
              <th style={{ width: 140, padding: '12px 6px' }}>symbol</th>
              <th style={{ width: 140, padding: '12px 6px' }}>category</th>
              <th style={{ width: 140, padding: '12px 6px' }}>base_asset</th>
              <th style={{ width: 140, padding: '12px 6px' }}>quote_asset</th>
              <th style={{ width: 140, padding: '12px 6px' }}>position_idx</th>
              <th style={{ width: 140, padding: '12px 6px' }}>side</th>
              <th style={{ width: 140, padding: '12px 6px' }}>leverage</th>
              <th style={{ width: 140, padding: '12px 6px' }}>quantity</th>
              <th style={{ width: 140, padding: '12px 6px' }}>position_qty</th>
              <th style={{ width: 140, padding: '12px 6px' }}>entry_amount</th>
              <th style={{ width: 140, padding: '12px 6px' }}>exit_amount</th>
              <th style={{ width: 140, padding: '12px 6px' }}>avg_entry_price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>avg_exit_price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>closed_pnl</th>
              <th style={{ width: 140, padding: '12px 6px' }}>opening_fee</th>
              <th style={{ width: 140, padding: '12px 6px' }}>closing_fee</th>
              <th style={{ width: 140, padding: '12px 6px' }}>funding_fee</th>
              <th style={{ width: 140, padding: '12px 6px' }}>open_ts</th>
              <th style={{ width: 140, padding: '12px 6px' }}>open_time</th>
              <th style={{ width: 140, padding: '12px 6px' }}>close_time</th>
              <th style={{ width: 140, padding: '12px 6px' }}>open_duration</th>
              <th style={{ width: 140, padding: '12px 6px' }}>balance</th>
              <th style={{ width: 140, padding: '12px 6px' }}>is_close</th>
              <th style={{ width: 140, padding: '12px 6px' }}>ts_id</th>
              <th style={{ width: 140, padding: '12px 6px' }}>trade_ts</th>
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
                  .sort(getComparator(order, 'closed_pnl_position_id'))
                  .map((row, i) => (
                    <tr key={row.closed_pnl_position_id}>
                      <td style={{ textAlign: 'center', width: 120 }}>
                        <Checkbox
                          size="sm"
                          checked={selected.includes(row.closed_pnl_position_id)}
                          color={
                            selected.includes(row.closed_pnl_position_id)
                              ? 'primary'
                              : undefined
                          }
                          onChange={(event) => {
                            // eslint-disable-next-line no-confusing-arrow
                            setSelected((ids) =>
                              event.target.checked
                                ? ids.concat(row.closed_pnl_position_id)
                                : ids.filter(
                                  (itemId) => itemId !== row.closed_pnl_position_id,
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
                        <Typography level="body-xs">
                          {row.closed_pnl_position_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.account_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.symbol}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.category}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.base_asset}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.quote_asset}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.position_idx}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.side}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.leverage}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.quantity}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.position_qty}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.entry_amount}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.exit_amount}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.avg_entry_price}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.avg_exit_price}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.closed_pnl}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.opening_fee}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.closing_fee}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.funding_fee}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.open_ts}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.open_time}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.close_time}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.open_duration}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.balance}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.is_close}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.ts_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.trade_ts}
                        </Typography>
                      </td>
                      <td>
                        <Box sx={{
                          display: 'flex',
                          gap: 2,
                          alignItems: 'center',
                        }}
                        >
                          {/* <Link level="body-xs" component="button">
                          Download
                          </Link> */}
                          <RowMenu
                            fetcher={fetcher}
                            order_id={row.closed_pnl_position_id}
                            account_id={row.account_id}
                            symbol={row.symbol}
                            page={page}
                            limit={limit}
                          />
                        </Box>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </Table>
      </Sheet>
      <Form method="post" action="./">
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
              // variant={pageNumber === currentPage ? 'outlined' : 'plain'}
              color="neutral"
              sx={{
                backgroundColor:
                  pageNumber === currentPage
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
                color:
                  pageNumber === currentPage
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.7)',
                borderColor:
                  pageNumber === currentPage
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(255, 255, 255, 0.2)',
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
    </React.Fragment>
  );
}
