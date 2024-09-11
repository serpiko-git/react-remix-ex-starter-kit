import { useEffect, useState } from 'react';
import * as React from 'react';

import { Box, Modal, Typography, Textarea, IconButton, Sheet } from '@mui/joy';
import { transformWithEsbuild } from 'vite';

import { apiHost_v1, apiGateway_v1, apiMatchingEngine_v1 } from '~/consts';

import {
  TraceFunction,
  TraceMMserverResponse,
  TraceMeCoreResponse,
  TraceMeOrderbookBResponse,
  TraceMeResetResponse,
  TraceMeSnapshotResponse,
  TraceReconResetResponse,
} from '../models/matching-engine.model';

export interface TraceFunctionDetailFormProps {
  traceFunction: TraceFunction;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TraceFunctionDetailForm({
  traceFunction,
  open,
  setOpen,
}: TraceFunctionDetailFormProps) {
  console.log('traceFunction:', traceFunction);

  const [response, setResponse] = useState<
    | TraceMMserverResponse
    | TraceMeCoreResponse
    | TraceMeOrderbookBResponse
    | TraceMeResetResponse
    | TraceMeSnapshotResponse
    | TraceReconResetResponse
    | string
  >('');

  useEffect(() => {
    // This effect runs only when `traceFunction` changes
    if (traceFunction) {
      const requestUrl = `${traceFunction.url}?${traceFunction.params.toString()}`;
      console.log('Request URL:', requestUrl);
      fetch(requestUrl)
        .then((resp) => resp.text()) // Assuming response is text
        .then((data) => {
          setResponse(data);
        }) // Set the fetched text in state
        .catch((error) => {
          console.error('Error fetching data:', error);
          setResponse('Failed to fetch data'); // Handle error case
        });
    }
  }, [traceFunction]);

  return (
    <React.Fragment>
      <Sheet
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Textarea
          sx={{ width: '100%', height: '100%' }}
          value={JSON.stringify(response.toString())}
        />
      </Sheet>
    </React.Fragment>
  );
}
