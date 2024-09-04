import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';

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
  Checkbox,
  Divider,
  FormControl,
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
} from '@mui/joy';
import {
  Form,
  useFetcher,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import { useForm, Controller } from 'react-hook-form';

import { Pagination } from '~/common/libs';
import {
  DEFAULT_END_TIME,
  DEFAULT_OPEN_ORDER_PAGE,
  DEFAULT_START_TIME,
} from '~/consts';
import { getComparator, Order } from '~/utils/ordering';

import {
  SnapshotPosition,
  SnapshotPositionCombineProps,
  SnaphotPositionSearchValues,
} from '../models/snapshot-position.model';

export function SnapshotPositionTable({
  responseProps,
}: SnapshotPositionCombineProps) {
  const {
    data: {
      list,
      pagination: { total, page_no, page_size },
    },
  } = responseProps;
  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [open, setOpen] = useState(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = useState<number>();

  const { control, handleSubmit, watch, setValue } =
    useForm<SnaphotPositionSearchValues>({
      defaultValues: {
        account_id: '',
        transaction_id: '',
        start_time: DEFAULT_START_TIME,
        end_time: DEFAULT_END_TIME,
        page_no: 1,
        page_size: DEFAULT_OPEN_ORDER_PAGE,
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
  } = Pagination<SnapshotPosition>({
    $current_page: Number(page_no),
    $num_records: Number(total),
    $record_data: list,
    $num_records_per_page: Number(page_size),
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

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const { checked } = e.currentTarget;
    setSelected((ids) => {
      if (checked) {
        return ids.concat(id);
      }
      return ids.filter((itemId) => itemId !== id);
    });
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
                <FormLabel>account_id</FormLabel>
                <Controller
                  name="account_id"
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
            </Stack>

            <Stack
              direction="row"
              alignItems="flex-end"
              spacing={1}
              sx={{ flex: 1 }}
            >
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

              <FormControl sx={{ flex: 1 }} size="sm">
                <FormLabel>start_time</FormLabel>
                <Controller
                  name="start_time"
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
                <FormLabel>end_time</FormLabel>
                <Controller
                  name="end_time"
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
                <FormLabel>page_size</FormLabel>
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
        className="SnapshotPositionTableContainer"
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
                        ? list.map((row) => row.transaction_id)
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
                  transaction_id
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>account_id</th>
              <th style={{ width: 180, padding: '12px 6px' }}>category</th>
              <th style={{ width: 140, padding: '12px 6px' }}>symbol</th>
              <th style={{ width: 140, padding: '12px 6px' }}>prpl</th>
              <th style={{ width: 140, padding: '12px 6px' }}>qtypl</th>
              <th style={{ width: 140, padding: '12px 6px' }}>prps</th>
              <th style={{ width: 140, padding: '12px 6px' }}>qtyps</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                rate_funding_feel
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                rate_funding_fees
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>created_at</th>
              <th style={{ width: 140, padding: '12px 6px' }}>updated_at</th>
              <th style={{ width: 140, padding: '12px 6px' }}>ts_id</th>
              <th style={{ width: 140, padding: '12px 6px' }}>ts_ff</th>
              <th style={{ width: 140, padding: '12px 6px' }}>prpl0</th>
              <th style={{ width: 140, padding: '12px 6px' }}>qtypl0</th>
              <th style={{ width: 140, padding: '12px 6px' }}>prps0</th>
              <th style={{ width: 140, padding: '12px 6px' }}>qtyps0</th>
              <th style={{ width: 140, padding: '12px 6px' }}>created_ts</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                transaction_id0
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
            <>
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
                          onChange={(e) =>
                            handleCheckbox(e, row.transaction_id)
                          }
                          slotProps={{
                            checkbox: { sx: { textAlign: 'left' } },
                          }}
                          sx={{ verticalAlign: 'text-bottom' }}
                        />
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{no + i}</Typography>{' '}
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">
                          {row.transaction_id}
                        </Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">
                          {row.account_id}
                        </Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.category}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.symbol}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.prpl}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.qtypl}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.prps}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.qtyps}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">
                          {row.rate_funding_feel}
                        </Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">
                          {row.rate_funding_fees}
                        </Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">
                          {row.created_at}
                        </Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">
                          {row.updated_at}
                        </Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.ts_id}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.ts_ff}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.prpl0}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.qtypl0}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.prps0}</Typography>
                      </td>
                      <td>
                        {' '}
                        <Typography level="body-xs">{row.qtyps0}</Typography>
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
    </Fragment>
  );
}
