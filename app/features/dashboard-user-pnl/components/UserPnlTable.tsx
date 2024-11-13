import { Fragment, useRef, useState } from 'react';

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
import numeral from 'numeral';
import { useForm, Controller } from 'react-hook-form';

import { Pagination } from '~/common/libs';
import {
  USER_PNL_SORT_COLUMN_RE,
  USER_PNL_SORT_COLUMN_SUM,
  USER_PNL_SORT_COLUMN_UN,
  USER_PNL_USERTYPE_ALL,
  USER_PNL_USERTYPE_MM,
  USER_PNL_USERTYPE_USER,
} from '~/features/dashboard-user-pnl';
import { ParseCatalog } from '~/features/models/common.model';
import { getComparator, Order } from '~/utils/ordering';

import {
  UserPnl,
  UserPnlCombineProps,
  UserPnlSearchValues,
} from '../models/user-pnl.model';

export function UserPnlTable({
  responseProps,
  queriesProps,
}: UserPnlCombineProps) {
  const {
    data: {
      list,
      catalog,
      pagination: { total, page_no, page_size },
    },
  } = responseProps;

  const listFmt = ParseCatalog(catalog, list);
  const { code, msg, data } = responseProps;
  const { ticker, page, limit } = queriesProps;

  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof UserPnl>('sum');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = useState<number>();

  const { control, handleSubmit, watch, setValue } =
    useForm<UserPnlSearchValues>({});

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
  } = Pagination<UserPnl>({
    $current_page: Number(page),
    $num_records: Number(total),
    $record_data: listFmt,
    $num_records_per_page: Number(limit),
  });

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
                <FormLabel>ticker</FormLabel>
                <Controller
                  name="ticker"
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

            <Stack direction="row" alignItems="flex-end" spacing={1}>
              <FormControl size="sm" sx={{ flex: 1 }}>
                <FormLabel>user_id</FormLabel>
                <Controller
                  name="worker_id"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="worker_id"
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
                <FormLabel>user_type</FormLabel>
                <Controller
                  name="worker_type"
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <Select
                      name={name}
                      placeholder={USER_PNL_USERTYPE_ALL}
                      onChange={(event, newValue) => onChange(newValue)}
                      onBlur={onBlur}
                      size="sm"
                      slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    >
                      <Option value="all">{USER_PNL_USERTYPE_ALL}</Option>
                      <Option value="lvu">{USER_PNL_USERTYPE_USER}</Option>
                      <Option value="lvm">{USER_PNL_USERTYPE_MM}</Option>
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
                <FormLabel>sort_by (descending)</FormLabel>
                <Controller
                  name="sort_by"
                  control={control}
                  render={({ field: { name, value, onChange, onBlur } }) => (
                    <Select
                      name={name}
                      placeholder={USER_PNL_SORT_COLUMN_SUM}
                      onChange={(event, newValue) => onChange(newValue)}
                      onBlur={onBlur}
                      size="sm"
                      slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    >
                      <Option value={USER_PNL_SORT_COLUMN_SUM}>
                        {USER_PNL_SORT_COLUMN_SUM}
                      </Option>
                      <Option value={USER_PNL_SORT_COLUMN_RE}>
                        {USER_PNL_SORT_COLUMN_RE}
                      </Option>
                      <Option value={USER_PNL_SORT_COLUMN_UN}>
                        {USER_PNL_SORT_COLUMN_UN}
                      </Option>
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl size="sm">
                <FormLabel>limit</FormLabel>
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
            width: '100%',
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
              <th
                style={{
                  textAlign: 'center',
                }}
              ></th>
              <th>No.</th>
              <th>ticker</th>
              <th>user_id</th>
              <th>user_type</th>
              <th>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    setOrderBy('re');
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
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
                  realized_pnl
                </Link>
              </th>
              <th>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    setOrderBy('un');
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
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
                  unrealized_pnl
                </Link>
              </th>
              <th>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    setOrderBy('sum');
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
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
                  pnl_sum
                </Link>
              </th>
            </tr>
          </thead>

          {/* nodata */}
          {!listFmt.length && (
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
          {!!listFmt.length && (
            <>
              <tbody>
                {[...listFmt]
                  .map((row) => {
                    const sum = Number(row.sum.replace(/,/g, ''));
                    const un = Number(row.un.replace(/,/g, ''));
                    const re = Number(row.re.replace(/,/g, ''));
                    return { ...row, sum, un, re };
                  })
                  .sort(getComparator(order, orderBy))
                  .map((row, i) => (
                    <tr key={row.worker_id}>
                      <td></td>
                      <td>
                        <Typography level="body-xs">{no + i}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.ticker}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.worker_id}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.worker_type}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.re}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.un}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {numeral(row.sum).format('0,0.00')}
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
          {previous_page ? (
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
          ) : null}

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

          {next_page ? (
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
          ) : null}
        </Box>
      </Form>
    </Fragment>
  );
}
