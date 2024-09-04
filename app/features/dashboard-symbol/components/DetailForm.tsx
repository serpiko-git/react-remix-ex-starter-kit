import { useEffect, useState } from 'react';

import Box from '@mui/joy/Box';
import CardOverflow from '@mui/joy/CardOverflow';
import CircularProgress from '@mui/joy/CircularProgress';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Step from '@mui/joy/Step';
import Stepper from '@mui/joy/Stepper';
import Grid from '@mui/material/Grid';

import { useSymbol } from '../hooks/queries';
import { ISymbol } from '../models/symbol.model';

type DetailFormProps = {
  symbolId: string;
  width?: number;
};

export function DetailForm(props: DetailFormProps) {
  const { symbolId, width } = props;
  const { data } = useSymbol(symbolId);

  const [symbol, setSymbol] = useState<ISymbol>();

  useEffect(() => {
    if (data) {
      setSymbol(data.data as unknown as ISymbol);
    }
  }, [data]);

  return (
    <div>
      <Divider />
      <div>
        <Stack
          direction="row"
          sx={{
            display: { xs: 'none', md: 'flex' },
            my: 1,
            maxHeight: '70vh',
            overflowY: 'auto',
            pr: 2, // 오른쪽에 여백 추가
            maxWidth: '100%', // 최대 너비를 100%로 설정
            width: width ? `${width}px` : '100%',
            alignItems: 'center', // 수직 중앙 정렬
            justifyContent: 'center', // 가로 중앙 정렬
            '&::-webkit-scrollbar': {
              width: '8px', // 스크롤바 너비
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888', // 스크롤바 색상
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555', // 스크롤바 hover 시 색상
            },
          }}
        >
          {!symbol && (
            <Box sx={{ m: 5 }}>
              <CircularProgress variant="soft" />
            </Box>
          )}

          {symbol && (
            <>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                className="not-draggable"
              >
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      SymbolId:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="SymbolId"
                        value={symbol.SymbolId}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      SymbolAlias:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="SymbolAlias"
                        value={symbol.SymbolAlias}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      SymbolName:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="SymbolName"
                        value={symbol.SymbolName}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      Status:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="Status"
                        value={symbol.Status}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      BaseAsset:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="BaseAsset"
                        value={symbol.BaseAsset}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      QuoteAsset:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="QuoteAsset"
                        value={symbol.QuoteAsset}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      AllowTrade:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="AllowTrade"
                        value={symbol.AllowTrade}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      FundingInterval:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="FundingInterval"
                        value={symbol.FundingInterval}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      TimeInForce:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="TimeInForce"
                        value={symbol.TimeInForce.join(',')}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      OrderType:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="OrderType"
                        value={symbol.OrderType.join(',')}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      ContractType:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="ContractType"
                        value={symbol.ContractType}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      PricePrecision:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="PricePrecision"
                        value={symbol.PricePrecision}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      QuantityPrecision:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="QuantityPrecision"
                        value={symbol.QuantityPrecision}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      BaseAssetPrecision:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="BaseAssetPrecision"
                        value={symbol.BaseAssetPrecision}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      QuoteAssetPrecision:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="QuoteAssetPrecision"
                        value={symbol.QuoteAssetPrecision}
                      />
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1} sx={{ flexGrow: 1, mb: 1 }}>
                    <Stepper sx={{ width: '100%' }}>
                      <Step>Filters</Step>
                      <Step>Price</Step>
                    </Stepper>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      min_price:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="min_price"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.Price.min_price}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      max_price:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="max_price"
                        value={symbol.Filters.Price.max_price}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                        userSelect: 'text',
                      }}
                    >
                      tick_size:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="tick_size"
                        value={symbol.Filters.Price.tick_size}
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing={1} sx={{ flexGrow: 1, mb: 1 }}>
                    <Stepper sx={{ width: '100%' }}>
                      <Step>Filters</Step>
                      <Step>LotSize</Step>
                    </Stepper>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      min_qty:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="min_qty"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.LotSize.min_qty}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      max_qty:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="max_qty"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.LotSize.max_qty}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      step_size:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="step_size"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.LotSize.step_size}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      post_only_max_order_qty:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="post_only_max_order_qty"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.LotSize.post_only_max_order_qty}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack spacing={1} sx={{ flexGrow: 1, mb: 1 }}>
                    <Stepper sx={{ width: '100%' }}>
                      <Step>Filters</Step>
                      <Step>MaxNumOrders</Step>
                    </Stepper>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      max_num_orders:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="max_num_orders"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.MaxNumOrders.max_num_orders}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack spacing={1} sx={{ flexGrow: 1, mb: 1 }}>
                    <Stepper sx={{ width: '100%' }}>
                      <Step>Filters</Step>
                      <Step>PercentPriceBySide</Step>
                    </Stepper>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      bid_multiplier_up:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="bid_multiplier_up"
                        sx={{ height: '32px' }}
                        value={
                          symbol.Filters.PercentPriceBySide.bid_multiplier_up
                        }
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      bid_multiplier_down:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="bid_multiplier_down"
                        sx={{ height: '32px' }}
                        value={
                          symbol.Filters.PercentPriceBySide.bid_multiplier_down
                        }
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      ask_multiplier_up:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="ask_multiplier_up"
                        sx={{ height: '32px' }}
                        value={
                          symbol.Filters.PercentPriceBySide.ask_multiplier_up
                        }
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      ask_multiplier_down:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="ask_multiplier_down"
                        sx={{ height: '32px' }}
                        value={
                          symbol.Filters.PercentPriceBySide.ask_multiplier_down
                        }
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      avg_price_mins:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="avg_price_mins"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.PercentPriceBySide.avg_price_mins}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack spacing={1} sx={{ flexGrow: 1, mb: 1 }}>
                    <Stepper sx={{ width: '100%' }}>
                      <Step>Filters</Step>
                      <Step>Tick</Step>
                    </Stepper>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      standard_price:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="standard_price"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.Tick.standard_price}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      minimum_unit_tick:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="minimum_unit_tick"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.Tick.minimum_unit_tick}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      price_rounding_digit:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="price_rounding_digit"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.Tick.price_rounding_digit}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2, ml: 2 }}
                  >
                    <FormLabel
                      sx={{
                        minWidth: '100px',
                        marginRight: '8px',
                      }}
                    >
                      qty_rounding_digit:
                    </FormLabel>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Input
                        size="sm"
                        placeholder="qty_rounding_digit"
                        sx={{ height: '32px' }}
                        value={symbol.Filters.Tick.qty_rounding_digit}
                      />{' '}
                      {/* 높이를 명시적으로 지정 */}
                    </FormControl>
                  </Stack>
                  <Stack spacing={1} sx={{ flexGrow: 1, mb: 1 }}>
                    <Stepper sx={{ width: '100%' }}>
                      <Step>Filters</Step>
                      <Step>Tick</Step>
                      <Step>info</Step>
                    </Stepper>
                  </Stack>
                  {symbol.Filters.Tick.info.map((info) => (
                    <>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 2, ml: 2 }}
                      >
                        <FormLabel>tick:</FormLabel>
                        <FormControl sx={{ flexGrow: 1 }}>
                          <Input
                            size="sm"
                            placeholder="tick"
                            sx={{ height: '32px', width: '100px' }}
                            value={info.tick}
                          />{' '}
                          {/* 높이를 명시적으로 지정 */}
                        </FormControl>
                        <FormLabel>interval:</FormLabel>
                        <FormControl sx={{ flexGrow: 1 }}>
                          <Input
                            size="sm"
                            placeholder="interval"
                            sx={{ height: '32px', width: '100px' }}
                            value={info.interval}
                          />{' '}
                          {/* 높이를 명시적으로 지정 */}
                        </FormControl>
                        <FormLabel>depth:</FormLabel>
                        <FormControl sx={{ flexGrow: 1 }}>
                          <Input
                            size="sm"
                            placeholder="depth"
                            sx={{ height: '32px', width: '100px' }}
                            value={info.depth}
                          />{' '}
                          {/* 높이를 명시적으로 지정 */}
                        </FormControl>
                      </Stack>
                    </>
                  ))}
                </Grid>
                {/* Add more fields as needed */}
              </Grid>
            </>
          )}
        </Stack>
      </div>

      <CardOverflow
        sx={{ borderTop: '1px solid', borderColor: 'divider' }}
      ></CardOverflow>
    </div>
  );
}
