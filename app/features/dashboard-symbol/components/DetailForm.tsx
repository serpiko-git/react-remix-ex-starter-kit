import * as React from 'react';
import { useEffect, useState } from 'react';

import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/material/Grid';

import { useSymbol, useTanstack } from '../hooks/queries';
import { ISymbol, SymbolResponse } from '../models/symbol.model';

type DetailFormProps = {
  symbolId: string;
};

export function DetailForm(props: DetailFormProps) {
  const { symbolId } = props;
  const { data } = useSymbol(symbolId);

  const [symbol, setSymbol] = useState<ISymbol>();

  useEffect(() => {
    if (data) {
      setSymbol(data.data as unknown as ISymbol);
    }
  }, [data]);

  return (
    <div>
      {/* <Box sx={{ mb: 1 }}>
        <Typography level="title-md">Personal info</Typography>
        <Typography level="body-sm">
          Customize how your profile information will appear to the networks.
        </Typography>
      </Box>
      */}
      <Divider />
      {symbol && (
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
              width: '100%', // 너비를 100%로 설정
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
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
                    Symbol:
                  </FormLabel>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <Input size="sm" placeholder="SymbolId" />
                  </FormControl>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <FormLabel sx={{ minWidth: '100px', marginRight: '8px' }}>
                    Symbol:
                  </FormLabel>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <Input size="sm" placeholder="SymbolId" />
                  </FormControl>
                </Stack>
              </Grid>
              {/* Add more fields as needed */}
            </Grid>
          </Stack>
        </div>
      )}

      <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
          <Button size="sm" variant="outlined" color="neutral">
            Cancel
          </Button>
          <Button size="sm" variant="solid">
            Save
          </Button>
        </CardActions>
      </CardOverflow>
    </div>
  );
}
