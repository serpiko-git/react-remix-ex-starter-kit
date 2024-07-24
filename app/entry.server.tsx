import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createReadableStreamFromReadable } from '@remix-run/node';
import type { AppLoadContext, EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import * as ReactDOMServer from 'react-dom/server';
import { renderToPipeableStream } from 'react-dom/server';

import { PassThrough } from 'node:stream';

import createEmotionCache from './layout/mui/createEmotionCache';
import theme from './layout/mui/theme';

const ABORT_DELAY = 5_000;

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          // eslint-disable-next-line no-param-reassign
          responseStatusCode = 500;
          /**
           * 셸 내부에서 렌더링 오류를 스트리밍 로그
           * 초기 셸 렌더링 중에 발생한 오류는 handleDocumentRequest에서 거부되고 로그됨
           * 기록할 필요는 없음
           */
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const MuiRemixServerElement = (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RemixServer
            context={remixContext}
            url={request.url}
            abortDelay={ABORT_DELAY}
          />
        </ThemeProvider>
      </CacheProvider>
    );

    const { pipe, abort } = renderToPipeableStream(MuiRemixServerElement, {
      onShellReady() {
        shellRendered = true;
        const body = new PassThrough();
        const stream = createReadableStreamFromReadable(body);

        responseHeaders.set('Content-Type', 'text/html');

        // Render the component to a string.
        const html = ReactDOMServer.renderToString(MuiRemixServerElement);

        // Grab the CSS from emotion
        const { styles } = extractCriticalToChunks(html);

        let stylesHTML = '';

        styles.forEach(({ key, ids, css }) => {
          const emotionKey = `${key} ${ids.join(' ')}`;
          const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
          stylesHTML = `${stylesHTML}${newStyleTag}`;
        });

        let markup = '';

        const regex =
          // eslint-disable-next-line max-len
          /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/;

        const matches = html.match(regex);

        if (matches) {
          // Add the Emotion style tags after the insertion point meta tag
          markup = html.replace(
            regex,
            `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`,
          );
        }

        responseHeaders.set('Content-Type', 'text/html');

        resolve(
          new Response(`<!DOCTYPE html>${markup || stream}`, {
            headers: responseHeaders,
            status: responseStatusCode,
          }),
        );

        pipe(body);
      },
      onShellError(error: unknown) {
        reject(error);
      },
      onError(error: unknown) {
        // eslint-disable-next-line no-param-reassign
        responseStatusCode = 500;
        /**
         * 쉘 내부에서 발생하는 렌더링 오류를 로그 스트리밍 방식으로 기록
         * 초기 쉘 렌더링 도중 발생하는 오류는 handleDocumentRequest에서 처리되기 때문에 여기서 다루지는 않는다
         */
        if (shellRendered) {
          console.error(error);
        }
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  return isbot(request.headers.get('user-agent') || '')
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      );
}
