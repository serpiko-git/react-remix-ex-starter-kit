import { useCallback, useEffect, useRef, useState } from 'react';

type UsePollingProps = () => void | Promise<void>;

export type SetInterval = ReturnType<typeof window.setInterval>;

export function usePolling(onPoll: UsePollingProps) {
  const isExecuting = useRef(false);
  const pollingInterval = useRef<SetInterval>();

  const stop = useCallback(() => {
    console.log('폴링 중지');
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = undefined;
    }
  }, []);

  const start = useCallback(
    ($seconds: number) => {
      console.log(`폴링 시작: ${$seconds}초`);
      if (pollingInterval.current) {
        stop(); // 기존 타이머가 있으면 중지하고
      }

      pollingInterval.current = setInterval(async () => {
        if (isExecuting.current) return;

        isExecuting.current = true;
        console.log('폴링 실행됨');
        await onPoll(); // 요청 실행
        isExecuting.current = false;
      }, $seconds * 1000);
    },
    [stop, onPoll],
  );

  // useEffect(() => {
  //   if (interval <= 0) return;

  //   pollingInterval.current = setInterval(async () => {
  //     if (isExecuting.current) return;

  //     isExecuting.current = true;
  //     console.log('폴링 실행됨');
  //     await onPoll(); // 요청 실행
  //     isExecuting.current = false;
  //   }, interval * 1000); // ms로 변환

  //   // eslint-disable-next-line consistent-return
  //   return () => {
  //     console.log('여기가 실행');
  //     stop();
  //   };
  // }, [interval]);

  return { stop, start };
}
