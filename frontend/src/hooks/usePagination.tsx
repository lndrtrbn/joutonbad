import { useState } from "react";

export default function usePagination<T>(items: T[] | undefined) {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const total = (items ?? []).length;
  const nbPages = Math.floor((items ?? []).length / pageSize);
  const pageStart = page * pageSize + 1;
  const pageEnd =
    page * pageSize + pageSize > total
      ? total
      : page * pageSize + pageSize;

  return [
    (items ?? []).slice(pageSize * page, pageSize * page + pageSize),
    {
      page,
      setPage,
      pageSize,
      setPageSize,
      nbPages,
      pageStart,
      pageEnd,
      total,
    },
  ] as const;
}
