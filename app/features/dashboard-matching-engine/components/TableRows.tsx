import React, { useEffect, useState } from 'react';

import { Button, Input } from '@mui/joy';

import { TraceFunction } from '../models/matching-engine.model';

interface TableRowsProps {
  TraceFunctions: TraceFunction[];
  setTraceUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function TableRows(props: TableRowsProps) {
  const { TraceFunctions, setTraceUrl: onTraceUrl } = props;
  console.log(TraceFunctions);
  const [urlValues, setUrlValues] = useState<TraceFunction['url'][]>(
    TraceFunctions.map((trace) => trace.url),
  );

  const handleUrlChange = (index: number, updateUrl: string) => {
    setUrlValues((prevUrls) =>
      prevUrls.map((url: string, i: number) => (i === index ? updateUrl : url)),
    );
  };

  const handleTraceClick = (index: number) => {
    const updatedUrl = urlValues[index];
    onTraceUrl(updatedUrl);
  };

  useEffect(() => {
    const traceUrl = TraceFunctions.map((trace) => trace.url);
    setUrlValues(traceUrl);
  }, [TraceFunctions]);

  return (
    <>
      {TraceFunctions.map((traceRow, index) => (
        <tr key={traceRow.trace_name}>
          <td style={{ padding: '12px 6px' }}>{traceRow.trace_name}</td>
          <td style={{ padding: '12px 6px' }}>{traceRow.trace_group}</td>
          <td style={{ padding: '12px 6px' }}>
            <Input
              size="sm"
              type="text"
              sx={{ flexGrow: 1 }}
              value={
                traceRow.params.size > 0
                  ? `${urlValues[index]}?${traceRow.params}`
                  : urlValues[index]
              }
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
