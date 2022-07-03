import { useMemo } from "react";
import Button from "../Button";

type PaginationProps = {
  page: number;
  totalCount: number; // total number of items
  currentCount: number; // number of items currently displayed on a page
  onButtonClick: (nextPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalCount,
  currentCount,
  onButtonClick,
}) => {
  const isFirstPage = useMemo(() => page === 1, [page]);
  const isLastPage = useMemo(() => totalCount / 20 <= page, [page, totalCount]);

  const from = useMemo(() => 20 * (page - 1) + 1, [page]);
  const to = useMemo(
    () => 20 * (page - 1) + currentCount,
    [page, currentCount]
  );

  return (
    <footer className="flex justify-between content-center border-t py-4">
      <p className="my-auto text-sm text-gray-600">
        <span>Showing</span>
        <span className="font-semibold px-1">{from}</span>
        <span>to</span>
        <span className="font-semibold px-1">{to}</span>
        <span>of</span>
        <span className="font-semibold px-1">{totalCount}</span>
        <span>results</span>
      </p>

      <div>
        <Button
          label="Previous"
          disabled={isFirstPage}
          onClick={() => onButtonClick(page - 1)}
          className="mr-2"
        />
        <Button
          label="Next"
          disabled={isLastPage}
          onClick={() => onButtonClick(page + 1)}
        />
      </div>
    </footer>
  );
};

export default Pagination;
