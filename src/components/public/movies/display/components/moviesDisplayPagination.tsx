import React from 'react';

interface MoviesDisplayPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MoviesDisplayPagination = ({ currentPage, totalPages, onPageChange }: MoviesDisplayPaginationProps) => {
  const maxPages = 10;
  let startPage = Math.max(currentPage - 4, 1);
  let endPage = Math.min(startPage + maxPages - 1, totalPages);

  if (endPage - startPage < maxPages - 1) {
    startPage = Math.max(endPage - maxPages + 1, 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex flex-wrap justify-center mt-10 gap-2 md:gap-4 items-center">
      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-2 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-colors ease-in-out duration-300 bg-transparent text-zinc-100 hover:bg-amber-500/20 hover:text-amber-500"
        >
          1
        </button>
      )}

      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-2 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-colors ease-in-out duration-300 bg-transparent text-zinc-100 hover:bg-amber-500/20 hover:text-amber-500"
        >
          {'<<<'}
        </button>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-colors ease-in-out duration-300 ${
            currentPage === page ? 'bg-amber-500/10 text-amber-500' : 'bg-transparent text-zinc-100'
          } hover:bg-amber-500/20 hover:text-amber-500`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-colors ease-in-out duration-300 bg-transparent text-zinc-100 hover:bg-amber-500/20 hover:text-amber-500"
        >
          {'>>>'}
        </button>
      )}

      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 md:px-4 md:py-2 rounded font-bold text-xs md:text-sm transition-colors ease-in-out duration-300 bg-transparent text-zinc-100 hover:bg-amber-500/20 hover:text-amber-500"
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default MoviesDisplayPagination;