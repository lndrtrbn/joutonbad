import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../Button/Button";
import usePagination from "../../hooks/usePagination";
import { useState } from "react";

type PaginationProps = ReturnType<typeof usePagination>[1];

export default function Pagination({
  page,
  total,
  nbPages,
  pageStart,
  pageEnd,
  pageSize,
  setPage,
  setPageSize,
}: PaginationProps) {
  const [open, setOpen] = useState(false);

  function setSize(size: number) {
    setPageSize(size);
    setPage(0);
    setOpen(false);
  }

  return (
    <div className="relative">
      <div className="flex gap-2 w-full justify-center select-none">
        <Button
          variant="icon"
          disabled={page === 0}
          onClick={() => setPage(0)}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
        <Button
          variant="icon"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
        <Button variant="light" onClick={() => setOpen((o) => !o)}>
          {pageStart}-{pageEnd} / {total}
        </Button>
        {open && (
          <div className="absolute top-[40px] z-10 bg-white border border-black/20 rounded-xl p-4">
            <p className="text-center">Taille des pages</p>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => setSize(10)}
                active={pageSize === 10}
              >
                10
              </Button>
              <Button
                onClick={() => setSize(25)}
                active={pageSize === 25}
              >
                25
              </Button>
              <Button
                onClick={() => setSize(50)}
                active={pageSize === 50}
              >
                50
              </Button>
            </div>
          </div>
        )}
        <Button
          variant="icon"
          disabled={page === nbPages}
          onClick={() => setPage((p) => p + 1)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
        <Button
          variant="icon"
          disabled={page === nbPages}
          onClick={() => setPage(nbPages)}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      </div>
    </div>
  );
}
