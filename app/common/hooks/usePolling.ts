import { useEffect, useRef } from 'react';

interface UsePollingProps {
  interval: number;
  onPoll: () => void;
}

export function usePolling({ interval, onPoll }: UsePollingProps) {
  const isExecuting = useRef(false);

  useEffect(() => {
    if (interval <= 0) return;
    const pollingInterval = setInterval(() => {
      if (isExecuting.current) return;

      isExecuting.current = true;
      onPoll(); // 요청 실행
      isExecuting.current = false;
    }, interval * 1000); // ms로 변환

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(pollingInterval);
    };
  }, [interval, onPoll]);
}
