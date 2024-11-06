import React, { useEffect, useState } from 'react';

import { Button, Input, Typography } from '@mui/joy';

import { TraceFunction } from '../models/matching-engine.model';

interface TableRowsProps {
  TraceFunctions: TraceFunction[];
  setTraceUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function TableRows(props: TableRowsProps) {
  const { TraceFunctions, setTraceUrl: onTraceUrl } = props;
  const [urlValues, setUrlValues] = useState<string[]>();

  const handleUrlChange = (index: number, updateUrl: string) => {
    console.log(index, updateUrl);
    setUrlValues((prevUrls) =>
      prevUrls.map((url: string, i: number) => (i === index ? updateUrl : url)),
    );
  };

  const handleTraceClick = (index: number) => {
    console.log('clicked!', index);
    const updatedUrl = urlValues[index];
    onTraceUrl(updatedUrl);
  };

  useEffect(() => {
    const traceUrl = TraceFunctions.map(
      (trace) => `${trace.url}?${trace.params.toString()}`,
    );
    setUrlValues(traceUrl);
  }, [TraceFunctions]);

  return (
    <>
      {TraceFunctions.map((traceRow, index) => (
        <tr key={traceRow.trace_name}>
          <td></td>
          <td>
            <Typography level="body-xs">{index + 1}</Typography>
          </td>
          <td style={{ padding: '12px 6px' }}>{traceRow.trace_name}</td>
          <td style={{ padding: '12px 6px' }}>{traceRow.trace_group}</td>
          <td style={{ padding: '12px 6px' }}>
            <Input
              size="sm"
              type="text"
              sx={{ flexGrow: 1 }}
              value={urlValues?.length > 0 ? urlValues[index] : ''}
              onChange={(e) => handleUrlChange(index, e.target.value)}
            />
          </td>
          <td style={{ padding: '12px 6px' }}>
            <Button variant="outlined" onClick={() => handleTraceClick(index)}>
              Trace
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
