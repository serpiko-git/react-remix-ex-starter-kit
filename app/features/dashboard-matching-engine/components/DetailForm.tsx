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
  traceUrl: TraceFunction['url'];
}

export function TraceFunctionDetailForm(props: TraceFunctionDetailFormProps) {
  const { traceUrl } = props;

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
    if (traceUrl.length > 0) {
      const requestUrl = traceUrl;
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
  }, [traceUrl]);

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
