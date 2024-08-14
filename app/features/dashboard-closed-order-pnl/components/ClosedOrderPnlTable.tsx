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
  ClosedOrderPnl,
  ClosedOrderPnlCombinProps,
  ClosedOrderPnlResponse,
  ClosedOrderPnlSearchValues
} from '..'

import {
  getComparator,
  Order,
} from '~/utils/ordering'

export function ClosedOrderPnlTable({
  responseProps,
  queriesProps,
}: ClosedOrderPnlCombinProps) {
  const {
    data: {
      pagination: {
        total,
        page_no,
        page_size,
      },
      list,
    }
  } = responseProps;

  const {
    account_id,
    page,
    limit,
    category_key,
    category_value
  } = queriesProps;
  
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const theadRef = useRef<HTMLTableSectionElement | null>(null);
  const [thCount, setThCount] = React.useState<number>();

  const { control, handleSubmit, watch } = useForm<ClosedOrderPnlSearchValues>({
    defaultValues: { account_id, category_key: '', category_value: ''},
  });

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [numberOfPosts, setNumberOfPosts] = useState<number>(Number(total)); // 전체 포스트 개수
  const [numberOfPages, setNumberOfPages] = useState<number>(0); // 화면에 보일 전체 페이지 수

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / page_size));
  }, [numberOfPosts]);

  useEffect(() => {
    if (!list.length && theadRef.current) {
      // theadRef.current.querySelectorAll('th')를 사용
      const thElements = theadRef.current.querySelectorAll('th');
      setThCount(thElements.length);
    }
  }, [list]);

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
              slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}>

              <Option value="closed_pnl_order_id">closed_pnl_order_id </Option>
              <Option value="order_id">order_id </Option>
              <Option value="client_order_id">client_order_id </Option>
              <Option value="account_id">account_id </Option>
              <Option value="category">category </Option>
              <Option value="base_asset">base_asset </Option>
              <Option value="quote_asset">quote_asset </Option>
              <Option value="symbol">symbol </Option>
              <Option value="side">side </Option>
              <Option value="leverage">leverage </Option>
              <Option value="quantity">quantity </Option>
              <Option value="position_qty">position_qty </Option>
              <Option value="exit_amount">exit_amount </Option>
              <Option value="entry_amount">entry_amount </Option>
              <Option value="avg_entry_price">avg_entry_price </Option>
              <Option value="avg_exit_price">avg_exit_price </Option>
              <Option value="closed_pnl">closed_pnl </Option>
              <Option value="opening_fee">opening_fee </Option>
              <Option value="closing_fee">closing_fee </Option>
              <Option value="funding_fee">funding_fee </Option>
              <Option value="exec_type">exec_type </Option>
              <Option value="is_close">is_close </Option>
              <Option value="ts_id">ts_id </Option>
              <Option value="trade_ts">trade_ts </Option>
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
                {
                  // <Checkbox
                  //   size="sm"
                  //   indeterminate={
                  //     selected.length > 0 && selected.length !== rows.length
                  //   }
                  //   checked={selected.length === rows.length}
                  //   onChange={(event) => {
                  //     setSelected(
                  //       event.target.checked ? rows.map((row) => row.id) : [],
                  //     );
                  //   }}
                  //   color={
                  //     selected.length > 0 || selected.length === rows.length
                  //       ? 'primary'
                  //       : undefined
                  //   }
                  //   sx={{ verticalAlign: 'text-bottom' }}
                  //
                  // />
                }
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
                  ]}> closed_pnl_order_id </Link>
              </th>
              <th style={{ width: 190, padding: '12px 6px' }}>order_id </th>
              <th style={{ width: 190, padding: '12px 6px' }}>client_order_id</th>
              <th style={{ width: 140, padding: '12px 6px' }}>account_id</th>
              <th style={{ width: 140, padding: '12px 6px' }}>category</th>
              <th style={{ width: 140, padding: '12px 6px' }}>base_asset</th>
              <th style={{ width: 140, padding: '12px 6px' }}>quote_asset</th>
              <th style={{ width: 140, padding: '12px 6px' }}>symbol</th>
              <th style={{ width: 140, padding: '12px 6px' }}>side</th>
              <th style={{ width: 140, padding: '12px 6px' }}>leverage</th>
              <th style={{ width: 140, padding: '12px 6px' }}>quantity</th>
              <th style={{ width: 140, padding: '12px 6px' }}>position_qty</th>
              <th style={{ width: 140, padding: '12px 6px' }}>exit_amount</th>
              <th style={{ width: 140, padding: '12px 6px' }}>entry_amount</th>
              <th style={{ width: 140, padding: '12px 6px' }}>avg_entry_price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>avg_exit_price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>closed_pnl</th>
              <th style={{ width: 140, padding: '12px 6px' }}>opening_fee</th>
              <th style={{ width: 140, padding: '12px 6px' }}>closing_fee</th>
              <th style={{ width: 140, padding: '12px 6px' }}>funding_fee</th>
              <th style={{ width: 140, padding: '12px 6px' }}>exec_type</th>
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
                  .sort(getComparator(order, 'closed_pnl_order_id'))
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
                        <Typography level="body-xs">
                          {row.closed_pnl_order_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.order_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.client_order_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.account_id}
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
                          {row.symbol}
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
                          {row.exit_amount}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.entry_amount}
                        </Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">
                          {row.avg_exit_price}
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
                          {row.exec_type}
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
                        <Box
                          sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          {/* <Link level="body-xs" component="button">
                          Download
                          </Link> */}
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









