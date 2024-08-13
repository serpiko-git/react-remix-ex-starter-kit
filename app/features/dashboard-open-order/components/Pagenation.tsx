export const Pagination = ({
  $current_page,
  $num_records,
  $record,
  onClick,
}: any) => {
  const num_records_per_page = 10;

  // 전체 페이지 수
  const num_pages = Math.ceil($num_records / num_records_per_page);

  // 현재 페이지 첫번째 레코드
  const page = Math.min(Math.max(1, $current_page), num_pages);

  // 출력을 시작할 첫번째 레코드 위치
  const start = (page - 1) * num_records_per_page;

  // 현재 페이지의 레코드 읽기
  const result = $record.slice(start, page * num_records_per_page);

  const num_links_per_view = 5; // 한 화면에 표시될 페이지 번호의 수

  // 현재 화면에 표시할 링크 블럭 번호
  const block = Math.ceil(page / num_links_per_view);

  // 첫번째 링크 번호
  const first_link = (block - 1) * num_links_per_view + 1;

  // 마지막 링크 번호
  const last_link = Math.min(first_link + num_links_per_view - 1, num_pages);

  /**
   * @usage
   */
  let previous = null;
  if (first_link !== 1) {
    previous = (block - 1) * num_links_per_view;
  }

  const pages = [];
  for (let i = first_link; i <= last_link; i += 1) {
    if (page === i) {
      const active = true;
      const pageDisplay = i;
    } else {
      const active = false;
      const pageDisplay = i;
    }
  }

  let next = null;
  if (last_link !== num_pages) {
    next = block * num_links_per_view + 1;
  }

  return {
    page,
    start,
    result,
    block,
    first_link,
    last_link,
  };
};
