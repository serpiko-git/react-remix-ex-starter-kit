import { Fragment, useState } from 'react';

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
} from '@mui/joy';
import { ColorPaletteProp } from '@mui/joy/styles';
import { useFetcher } from '@remix-run/react';
import dayjs from 'dayjs';

import { ResponsiveModal } from '~/features/modal';

import { SymbolResponse } from '../models/symbol.model';

import { DetailForm } from './DetailForm';

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
export function SymbolTable(props: SymbolResponse) {
  const fetcher = useFetcher();
  const {
    data: { list },
  } = props;

  const [order, setOrder] = useState<Order>('desc');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);
  const [symbolId, setSymbolId] = useState<string>('');
  const [symbolName, setSymbolName] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);

  const renderFilters = () => (
    <Fragment>
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
    </Fragment>
  );

  const handleTrClick = ($symbolId: string, $symbolName: string) => {
    setSymbolId($symbolId);
    setSymbolName($symbolName);
    setModalOpen(true);
  };

  const handleNextPage = () => {
    const a = fetcher.load('/');
    console.log(a);
  };

  return (
    <Fragment>
      {Boolean(symbolId && modalOpen) && (
        <>
          <ResponsiveModal
            title={symbolName}
            header={''}
            onOpen={modalOpen}
            onSetOpen={setModalOpen}
          >
            <DetailForm symbolId={symbolId} width={1200} />
          </ResponsiveModal>
        </>
      )}
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

        {/* mobile */}
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
              ></th>
              <th style={{ width: 120, padding: '12px 6px' }}>
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
                  symbol_id
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>symbol_alias</th>
              <th style={{ width: 140, padding: '12px 6px' }}>symbol_name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>status</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                asset (base, quote)
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>contract_type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>updated_at</th>
              <th style={{ width: 140, padding: '12px 6px' }}>created_at</th>
              <th style={{ width: 60, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {[...list].sort(getComparator(order, 'SymbolId')).map((symbol) => (
              <tr
                key={symbol.SymbolId}
                onClick={() =>
                  handleTrClick(symbol.SymbolId, symbol.SymbolName)
                }
              >
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(symbol.SymbolId)}
                    color={
                      selected.includes(symbol.SymbolId) ? 'primary' : undefined
                    }
                    onChange={(event) => {
                      // eslint-disable-next-line no-confusing-arrow
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(symbol.SymbolId)
                          : ids.filter((itemId) => itemId !== symbol.SymbolId),
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{symbol.SymbolId}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{symbol.SymbolAlias}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{symbol.SymbolName}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        1: <CheckRoundedIcon />,
                        2: <AutorenewRoundedIcon />,
                        3: <BlockIcon />,
                      }[symbol.Status]
                    }
                    color={
                      {
                        1: 'success',
                        2: 'neutral',
                        3: 'danger',
                      }[symbol.Status] as ColorPaletteProp
                    }
                  >
                    {symbol.Status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{symbol.BaseAsset}</Avatar>
                    <div>
                      <Typography level="body-xs">
                        {symbol.BaseAsset}
                      </Typography>
                      <Typography level="body-xs">
                        {symbol.QuoteAsset}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Typography level="body-xs">{symbol.ContractType}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {dayjs(symbol.UpdatedAt).format('YYYY-MM-DD HH:mm:ss')}
                  </Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {dayjs(symbol.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}
                  </Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
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
          onClick={handleNextPage}
        >
          Next
        </Button>
      </Box>
    </Fragment>
  );
}
