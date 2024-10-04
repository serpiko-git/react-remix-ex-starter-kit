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
  Transaction,
  TransactionCombineProps,
  TransactionSearchValues,
} from '../models/transaction.model';

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
  page_no,
  page_size,
}: {
  fetcher: FetcherWithComponents<unknown>;
  symbol: string;
  order_id: string;
  account_id: string;
  page_no: string;
  page_size: string;
}) {
  const [openConfirm, setOpenConfirm] = useState(false);

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
        page_no,
        page_size,
      },
      { method: 'post', action: './' },
    );
    setOpenConfirm(false); // 모달 닫기
  };

  const handleCancel = () => {
    setOpenConfirm(false); // 모달을 취소하면 닫기
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

export function TransactionTable({
  responseProps,
  queriesProps,
}: TransactionCombineProps) {
  const {
    data: {
      list,
      pagination: { total, page_no, page_size },
    },
  } = responseProps;

  const { account_id } = queriesProps;

  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = useState<number>();

  const { control, handleSubmit, watch, setValue } =
    useForm<TransactionSearchValues>({
      defaultValues: {
        account_id: '',
        transaction_id: '',
        symbol: '',
        order_id: '',
        page_no: 1,
        page_size: 30,
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
  } = Pagination<Transaction>({
    $current_page: Number(page_no),
    $num_records: Number(total),
    $record_data: list,
    $num_records_per_page: Number(page_size),
  });

  useEffect(() => {
    if (!list.length && theadRef.current) {
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
    params.set('page_size', String(page_size));
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
                      onChange={(event, newValue) => onChange(newValue)} // 선택된 옵션의 값을 반영
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
              <th>
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
              <th>No.</th>
              <th>Action</th>
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
                  transaction_id
                </Link>
              </th>
              <th> account_id </th>
              <th> symbol </th>
              <th> BaseAsset </th>
              <th> QuoteAsset </th>
              <th> transaction_type </th>
              <th> direction </th>
              <th> qty </th>
              <th> position_size </th>
              <th> funding </th>
              <th> fee </th>
              <th> cash_flow </th>
              <th> change </th>
              <th> balance </th>
              <th> exec_price </th>
              <th> fee_rate </th>
              <th> order_id </th>
              <th> from_transfer_account_id </th>
              <th> to_transfer_account_id </th>
              <th> ts_id </th>
              <th> created_ts </th>
              <th> transaction_time </th>
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
                .sort(getComparator(order, 'transaction_id'))
                .map((row, i) => (
                  <tr key={row.transaction_id}>
                    <td style={{ textAlign: 'center', width: 120 }}>
                      <Checkbox
                        size="sm"
                        checked={selected.includes(row.transaction_id)}
                        color={
                          selected.includes(row.transaction_id)
                            ? 'primary'
                            : undefined
                        }
                        onChange={(event) => {
                          // eslint-disable-next-line no-confusing-arrow
                          setSelected((ids) =>
                            event.target.checked
                              ? ids.concat(row.transaction_id)
                              : ids.filter(
                                  (itemId) => itemId !== row.transaction_id,
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
                        {/* <Link level="body-xs" component="button">
                          Download
                          </Link> */}
                        <RowMenu
                          fetcher={fetcher}
                          order_id={row.transaction_id}
                          account_id={row.account_id}
                          symbol={row.symbol}
                          page_no={String(page_no)}
                          page_size={String(page_size)}
                        />
                      </Box>
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.transaction_id}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.account_id}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">{row.symbol}</Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.BaseAsset}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.QuoteAsset}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.transaction_type}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.direction}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">{row.qty}</Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.position_size}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.funding}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">{row.fee}</Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.cash_flow}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">{row.change}</Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.balance}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.exec_price}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.fee_rate}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.order_id}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.from_transfer_account_id}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.to_transfer_account_id}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">{row.ts_id}</Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.created_ts}
                      </Typography>{' '}
                    </td>
                    <td>
                      {' '}
                      <Typography level="body-xs">
                        {row.transaction_time}
                      </Typography>{' '}
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
              variant={page_no ? 'outlined' : 'plain'}
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
