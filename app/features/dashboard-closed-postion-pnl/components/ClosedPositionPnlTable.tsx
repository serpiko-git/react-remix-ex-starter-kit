import { Fragment, useEffect, useRef, useState } from 'react';

import {
  ArrowDropDown as ArrowDropDownIcon,
  FilterAlt as FilterAltIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormLabel,
  IconButton,
  Input,
  Link,
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
  FormControl,
} from '@mui/joy';
import {
  Form,
  useFetcher,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import { Controller, useForm } from 'react-hook-form';

import { Pagination } from '~/common/libs';
import { ClosedOrderPnlSearchValues } from '~/features/dashboard-closed-order-pnl';

import {
  ClosedPositionPnl,
  ClosedPositionPnlCombineProps,
} from '../models/closed-position-pnl.model';

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

export function ClosedPositionPnlTable({
  responseProps,
  queriesProps,
}: ClosedPositionPnlCombineProps) {
  const {
    data: {
      pagination: { total, page_no, page_size },
      list,
    },
  } = responseProps;

  const { account_id, page, limit } = queriesProps;

  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = useState<number>();

  const { control, handleSubmit, watch } = useForm<ClosedOrderPnlSearchValues>({
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
    <Fragment>
      <FormControl size="sm">
        <FormLabel>category</FormLabel>
        <Controller
          name="symbol"
          control={control}
          render={({ field }) => (
            <Select
              // {...field}
              name="category_key"
              size="sm"
              placeholder="Select by category"
              slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
            >
              <Option value="closed_pnl_position_id">
                closed_pnl_position_id
              </Option>
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
    </Fragment>
  );

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
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Form method="get" action="./">
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
                name="account_id"
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
              <FormLabel>limit</FormLabel>

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
            width: 'auto',
            tableLayout: 'auto',
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
              <th></th>
              <th>No.</th>
              <th>
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
              <th>account_id</th>
              <th>symbol</th>
              <th>category</th>
              <th>base_asset</th>
              <th>quote_asset</th>
              <th>position_idx</th>
              <th>side</th>
              <th>leverage</th>
              <th>quantity</th>
              <th>position_qty</th>
              <th>entry_amount</th>
              <th>exit_amount</th>
              <th>avg_entry_price</th>
              <th>avg_exit_price</th>
              <th>closed_pnl</th>
              <th>opening_fee</th>
              <th>closing_fee</th>
              <th>funding_fee</th>
              <th>open_ts</th>
              <th>open_time</th>
              <th>close_time</th>
              <th>open_duration</th>
              <th>balance</th>
              <th>is_close</th>
              <th>ts_id</th>
              <th>trade_ts</th>
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
                      <td style={{ textAlign: 'center', width: 120 }}></td>
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
                        <Typography level="body-xs">{row.symbol}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.category}</Typography>
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
                        <Typography level="body-xs">{row.side}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.leverage}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.quantity}</Typography>
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
                        <Typography level="body-xs">{row.open_ts}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.open_time}</Typography>
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
                        <Typography level="body-xs">{row.balance}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.is_close}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.ts_id}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.trade_ts}</Typography>
                      </td>
                      <td></td>
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
              variant={Number(page) ? 'outlined' : 'plain'}
              color="neutral"
              sx={(theme) => ({
                color: currentPage === pageNumber ? 'white' : 'inherit',
                backgroundColor:
                  currentPage === pageNumber
                    ? theme.palette.primary.solidBg
                    : 'transparent',
              })}
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
