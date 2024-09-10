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
  // const [response, setResponse] = useState<
  //   | TraceMMserverResponse
  //   | TraceMeCoreResponse
  //   | TraceMeOrderbookBResponse
  //   | TraceMeResetResponse
  //   | TraceMeSnapshotResponse
  //   | TraceReconResetResponse
  //   | null
  // >(null);

  console.log('traceFunction:', traceFunction);
  if (traceFunction === undefined || traceFunction === null) {
    return (
      <React.Fragment>
        <Sheet>
          <Textarea value="Unefined" />
        </Sheet>
      </React.Fragment>
    );
  }

  const requestUrl = `${traceFunction.url}?${traceFunction.params.toString()}`;
  console.log('reuqestUrl:', requestUrl);
  const responseData = fetch(requestUrl, { mode: 'no-cors' })
    .then((resp) => resp.text())
    .then((data) => {
      console.log('data:', data);
      return data;
    });

  console.log('responseData:', responseData);

  return (
    <React.Fragment>
      <Sheet>
        <Textarea value={String(responseData)} />
      </Sheet>
    </React.Fragment>
  );
}
