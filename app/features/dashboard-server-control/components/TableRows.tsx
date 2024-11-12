import { Button, Typography } from '@mui/joy';
import dayjs from 'dayjs';

import {
  EtcdServiceList,
  ServiceContolParams,
  ServiceControlStopStatusTypes,
  etcdServerListServiceStatus,
  etcdServerListServiceStatusColor,
  serviceControlStopStatus,
} from '../models/server-control.model';

export interface TableRowsProps {
  lists: EtcdServiceList[];
  handleConfirm: (params: {
    actionParam: ServiceControlStopStatusTypes;
    requestParam:
      | ServiceContolParams['service_stop_all']
      | ServiceContolParams['service_stop_each']
      | ServiceContolParams['server_stop_force'];
  }) => void;
}

export default function TableRows(props: TableRowsProps) {
  const { lists, handleConfirm } = props;

  const acsServices: EtcdServiceList[] = [];
  const otherServices: EtcdServiceList[] = [];

  lists.forEach((data) => {
    if (data.service_name === 'acs') {
      acsServices.push(data);
    } else {
      otherServices.push(data);
    }
  });

  return (
    <>
      {acsServices.map((list, index) => {
        const rowSpan = acsServices.length;

        return (
          <tr key={list.service_id}>
            {index === 0 ? (
              <>
                <td rowSpan={rowSpan}></td>
                <td rowSpan={rowSpan}>
                  <Typography level="body-xs">1</Typography>
                </td>
                <td rowSpan={rowSpan} style={{ padding: '12px 6px' }}>
                  {list.service_name}
                </td>
              </>
            ) : null}

            <td style={{ padding: '12px 6px' }}>{list.service_id}</td>
            <td style={{ padding: '12px 6px' }}>
              {list.service_group ? list.service_group : 'no data'}
            </td>
            <td style={{ padding: '12px 6px' }}>
              <Typography
                fontWeight="bold"
                color={etcdServerListServiceStatusColor[list.service_status]}
                fontSize="md"
              >
                {etcdServerListServiceStatus[list.service_status]}
              </Typography>
            </td>
            <td style={{ padding: '12px 6px' }}>
              {dayjs(list.created_at).format('YYYY-MM-DD HH:mm:ss')}
            </td>
            <td style={{ padding: '12px 6px' }}>
              <Button
                type="button"
                variant="solid"
                color="primary"
                sx={{ height: '32px' }}
                onClick={() =>
                  handleConfirm({
                    actionParam: serviceControlStopStatus.SERVER_STOP_FORCE,
                    requestParam: {
                      service_id: list.service_id,
                      service_status: 5,
                    },
                  })
                }
              >
                서버 강제 중지
              </Button>
            </td>
            {index === 0 ? (
              <>
                <td rowSpan={rowSpan} style={{ padding: '12px 6px' }}>
                  <Button
                    type="button"
                    variant="solid"
                    color="danger"
                    sx={{ height: '32px' }}
                    onClick={() =>
                      handleConfirm({
                        actionParam: serviceControlStopStatus.SERVICE_STOP_EACH,
                        requestParam: {
                          service_name: list.service_name,
                          service_status: 3,
                        },
                      })
                    }
                  >
                    서비스 중지 요청
                  </Button>
                </td>
              </>
            ) : null}
          </tr>
        );
      })}

      {otherServices.map((list, index) => (
        <tr key={list.service_id}>
          <td></td>
          <td>
            <Typography level="body-xs">{index + 2}</Typography>
          </td>
          <td style={{ padding: '12px 6px' }}>{list.service_name}</td>
          <td style={{ padding: '12px 6px' }}>{list.service_id}</td>
          <td style={{ padding: '12px 6px' }}>
            {list.service_group ? list.service_group : 'no data'}
          </td>
          <td style={{ padding: '12px 6px' }}>
            <Typography
              fontWeight="bold"
              color={etcdServerListServiceStatusColor[list.service_status]}
              fontSize="md"
            >
              {etcdServerListServiceStatus[list.service_status]}
            </Typography>
          </td>
          <td style={{ padding: '12px 6px' }}>
            {dayjs(list.created_at).format('YYYY-MM-DD HH:mm:ss')}
          </td>
          <td style={{ padding: '12px 6px' }}>
            <Button
              type="button"
              variant="solid"
              color="primary"
              sx={{ height: '32px' }}
              onClick={() =>
                handleConfirm({
                  actionParam: serviceControlStopStatus.SERVER_STOP_FORCE,
                  requestParam: {
                    service_id: list.service_id,
                    service_status: 5,
                  },
                })
              }
            >
              서버 강제 중지
            </Button>
          </td>
          <td style={{ padding: '12px 6px' }}>
            <Button
              type="button"
              variant="solid"
              color="danger"
              sx={{ height: '32px' }}
              onClick={() =>
                handleConfirm({
                  actionParam: serviceControlStopStatus.SERVICE_STOP_EACH,
                  requestParam: {
                    service_name: list.service_name,
                    service_status: 3,
                  },
                })
              }
            >
              서비스 중지 요청
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
