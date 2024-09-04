import {
  DEFAULT_OPEN_ORDER_LIMIT,
  DEFAULT_OPEN_ORDER_PAGINATION_LINK_PER_VIEW,
} from '~/consts';

interface PaginationType<T> {
  $current_page: number;
  $num_records: number;
  $num_records_per_page?: number;
  $record_data?: T[];
}

type PaginationReturnType<T> = {
  no: number;
  page: number;
  previous_page: null | number;
  pageNumbers: number[];
  next_page: null | number;
  result_data: T[];
};

export const Pagination = <T>({
  $current_page,
  $num_records,
  $record_data,
  $num_records_per_page,
}: PaginationType<T>): PaginationReturnType<T> => {
  // 한 페이지 표시될 레코드 수
  const num_records_per_page =
    $num_records_per_page || DEFAULT_OPEN_ORDER_LIMIT;

  // 전체 페이지 수
  const num_pages = Math.ceil($num_records / num_records_per_page);

  // 현재 페이지 첫번째 레코드
  const page = Math.min(Math.max(1, $current_page), num_pages);

  // 출력을 시작할 첫번째 레코드 위치
  const start = (page - 1) * num_records_per_page;

  // 현재 페이지의 레코드 읽기
  let result_data: T[] = [];
  if ($record_data) {
    result_data = $record_data.slice(start, page * num_records_per_page);
  }

  // 한 화면에 표시될 페이지네이션 링크 번호의 수
  const num_links_per_view = DEFAULT_OPEN_ORDER_PAGINATION_LINK_PER_VIEW;

  // 현재 화면에 표시할 링크 블럭 번호
  const block = Math.ceil(page / num_links_per_view);

  // 첫번째 링크 번호
  const first_link = (block - 1) * num_links_per_view + 1;

  // 마지막 링크 번호
  const last_link = Math.min(first_link + num_links_per_view - 1, num_pages);

  // 이전 페이지
  let previous_page = null;
  if (first_link !== 1) {
    previous_page = (block - 1) * num_links_per_view;
    if (previous_page < 1) {
      previous_page = null;
    }
  }

  // 다음 페이지
  let next_page = null;
  if (last_link !== num_pages) {
    next_page = block * num_links_per_view + 1;
  }

  // 데이터 반복문 index에 + 해서 사용할 넘버링 (1,2,3,4....98,99,100)
  const no = (page - 1) * num_records_per_page + 1;

  // 페이지 넘버링 생성
  let pageNumbers: number[] = [];
  if (first_link > 0 && last_link > 0) {
    pageNumbers = Array.from(
      { length: last_link - first_link + 1 },
      (_, i) => first_link + i,
    );
  }

  return {
    no,
    page,
    previous_page,
    pageNumbers,
    next_page,
    result_data,
  };
};
