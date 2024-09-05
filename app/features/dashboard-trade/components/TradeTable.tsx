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
import { useForm, Controller } from 'react-hook-form';

import { Pagination } from '~/common/libs';
import { DEFAULT_SYMBOL_LIST } from '~/consts';

import {
  Trade,
  TradeCombineProps,
  TradeSearchValues,
} from '../models/trade.model';

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

export function TradeTable({ responseProps, queriesProps }: TradeCombineProps) {
  const {
    data: {
      list,
      pagination: { total, page_no, page_size },
    },
  } = responseProps;

  const { account_id, order_id } = queriesProps;

  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = useState<number>();

  const { control, handleSubmit, watch, setValue } = useForm<TradeSearchValues>(
    {
      defaultValues: {
        account_id,
        order_id,
        trade_id: 0,
        page_size,
        client_order_id: 0,
      },
    },
  );

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
  } = Pagination({
    $current_page: Number(queriesProps.page_no),
    $num_records: Number(total),
    $record_data: list,
    $num_records_per_page: Number(queriesProps.page_size),
  });

  useEffect(() => {
    if (!list.length && theadRef.current) {
      // theadRef.current.querySelectorAll('th')를 사용
      const thElements = theadRef.current.querySelectorAll('th');
      setThCount(thElements.length);
    }
  }, [list]);

  useEffect(() => {
    if (page_size) {
      setValue('page_size', page_size);
    }
  }, [page_size]);

  // 페이지네이션 버튼 클릭 핸들러
  const handlePagination = ($page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page_no', String($page));
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
        sx={{
          display: { xs: 'none', sm: 'block' },
          backgroundColor: 'transparent',
        }}
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
            <Stack
              direction="row"
              alignItems="flex-end"
              spacing={1}
              sx={{ flex: 1 }}
            >
              <FormControl sx={{ flex: 1 }} size="sm">
                <FormLabel>trade_id</FormLabel>
                <Controller
                  name="trade_id"
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

              <FormControl size="sm">
                <FormLabel>Category</FormLabel>
                <Controller
                  name="page_size"
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <Select
                      name={name}
                      placeholder={name}
                      value={value ?? page_size}
                      onChange={(event, newValue) => onChange(newValue)} // 선택된 옵션의 값을 반영
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
                        ? list.map((row) => row.order_id.toString())
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
              <th style={{ width: 50, padding: '12px 6px' }}>No.</th>
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
                  trade_id
                </Link>
              </th>
              <th style={{ width: 190, padding: '12px 6px' }}> order_id </th>
              <th style={{ width: 190, padding: '12px 6px' }}>
                {' '}
                client_order_id{' '}
              </th>
              <th style={{ width: 190, padding: '12px 6px' }}> account_id </th>
              <th style={{ width: 190, padding: '12px 6px' }}> category </th>
              <th style={{ width: 190, padding: '12px 6px' }}> base_asset </th>
              <th style={{ width: 190, padding: '12px 6px' }}> quote_asset </th>
              <th style={{ width: 190, padding: '12px 6px' }}> symbol </th>
              <th style={{ width: 190, padding: '12px 6px' }}> side </th>
              <th style={{ width: 190, padding: '12px 6px' }}> order_type </th>
              <th style={{ width: 190, padding: '12px 6px' }}> exec_type </th>
              <th style={{ width: 190, padding: '12px 6px' }}> leverage </th>
              <th style={{ width: 190, padding: '12px 6px' }}> quantity </th>
              <th style={{ width: 190, padding: '12px 6px' }}>
                {' '}
                org_quantity{' '}
              </th>
              <th style={{ width: 190, padding: '12px 6px' }}> price </th>
              <th style={{ width: 190, padding: '12px 6px' }}> exec_price </th>
              <th style={{ width: 190, padding: '12px 6px' }}> fee_rate </th>
              <th style={{ width: 190, padding: '12px 6px' }}> opening_fee </th>
              <th style={{ width: 190, padding: '12px 6px' }}> closing_fee </th>
              <th style={{ width: 190, padding: '12px 6px' }}> funding_fee </th>
              <th style={{ width: 190, padding: '12px 6px' }}> is_isolated </th>
              <th style={{ width: 190, padding: '12px 6px' }}> is_maker </th>
              <th style={{ width: 190, padding: '12px 6px' }}>
                transaction_id
              </th>
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
            <tbody>
              {[...list]
                .sort(getComparator(order, 'trade_id'))
                .map((row, i) => (
                  <tr key={row.trade_id}>
                    <td style={{ textAlign: 'center', width: 120 }}></td>
                    <td>
                      <Typography level="body-xs">{no + i}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.trade_id}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.order_id}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {row.client_order_id}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.account_id}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.category}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.base_asset}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.quote_asset}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.symbol}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.side}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.order_type}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.exec_type}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.leverage}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.quantity}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {row.org_quantity}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.price}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.exec_price}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.fee_rate}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.opening_fee}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.closing_fee}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.funding_fee}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.is_isolated}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.is_maker}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {row.transaction_id}
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
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
              variant={Number(page_no) ? 'outlined' : 'plain'}
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