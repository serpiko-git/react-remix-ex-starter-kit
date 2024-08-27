import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';

import { apiHost_v1, apiAccount_id } from '~/consts';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from '~/consts/consts';
import {
  EtcdService,
  EtcdServiceListResponse,
 
} from '~/features/dashbarod-etcd-services';
import { Header } from '~/features/dashboard-common/components/Header';
import {
} from '~/features/dashbarod-etcd-services';


