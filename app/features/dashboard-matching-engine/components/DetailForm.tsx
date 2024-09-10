import { useEffect, useState } from 'react';
import * as React from 'react';

import { Box, Modal, Typography, Textarea, IconButton } from '@mui/joy';

import { apiHost_v1, apiGateway_v1 } from '~/consts';

import {
  TraceMMserverResponse,
  TraceMeCoreResponse,
  TraceMeOrderbookBResponse,
  TraceMeResetResponse,
  TraceMeSnapshotResponse,
  TraceReconResetResponse,
} from '../models/matching-engine.model';

export function TraceMMserverDetailForm() {}
export function TraceMeCoreDetailFrom() {}
export function TraceMeOrderbookBDetailForm() {}
export function TraceMeResetDetailForm() {}
export function TraceMeSnapshotDetailForm() {}
export function TraceReconResetDetailForm() {}
