import { ImageNotSupportedOutlined } from '@mui/icons-material';
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { apiAdminHost_v1, apiAccount_id } from '~/consts';
import {
  DEFAULT_EMPTY,
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_SYMBOL_LIST,
} from '~/consts/consts';



