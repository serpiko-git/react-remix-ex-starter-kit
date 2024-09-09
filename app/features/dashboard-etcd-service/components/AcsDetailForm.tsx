import { useEffect, useState } from 'react';
import * as React from 'react';

import { Box, Modal, Typography, Textarea, IconButton } from '@mui/joy';

import { apiHost_v1, apiGateway_v1 } from '~/consts';

import {
  EtcdServiceAcsResponse,
  EtcdServiceAcsPayload,
} from '../models/etcd-service.model';

export interface AcsDetailFormArg {
  serviceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AcsDetailForm({
  serviceId,
  isOpen,
  onClose,
}: AcsDetailFormArg) {
  const searchParams = new URLSearchParams();
  searchParams.set('serviceId', serviceId);
  searchParams.set('shardNo', '0');

  // get resposne
  const fetchUrl = `${apiGateway_v1}/debug/worker/metrics?${searchParams.toString()}`;
  const [response, setResponse] = useState<EtcdServiceAcsResponse | null>(null);
  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data: EtcdServiceAcsResponse) => {
        setResponse(data);
      });
  }, [fetchUrl]);

  console.log('fetchUrl: ', fetchUrl);
  console.log(JSON.stringify(response));
  // parse response
  if (response === null) {
    return (
      <tbody>
        <tr>
          <td colSpan={10}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ padding: 2 }} // 패딩 추가
            >
              <IconButton
                variant="plain"
                color="danger"
                sx={{ mr: 1 }}
              ></IconButton>
              <Typography color="danger" fontWeight="md">
                No Data.
              </Typography>
            </Box>
          </td>
        </tr>
      </tbody>
    );
  }
  const { code, msg, data } = response;

  return (
    <React.Fragment>
      <Modal open={isOpen} onClose={onClose}>
        <Textarea
          placeholder={JSON.stringify(response.data, null, '\t')}
          minRows={2}
          sx={{
            // add scrollbar
            // add border
            alignContent: 'center',
            overflow: 'auto',
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': { display: 'show' },
            '--Textarea-focusedInset': 'var(--any, )',
            '--Textarea-focusedThickness': '0.25rem',
            '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
            '&::before': {
              transition: 'box-shadow .15s ease-in-out',
            },
            '&:focus-within': {
              borderColor: '#86b7fe',
            },
          }}
        ></Textarea>
      </Modal>
    </React.Fragment>
  );
}
