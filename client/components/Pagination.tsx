interface PaginationProps {
  currentPage: number
  pageCount: number
  handlePageChange: (newPage: number) => void
}

export function Pagination({
  currentPage,
  pageCount,
  handlePageChange,
}: PaginationProps) {
  return (
    <div>
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <ul className="flex items-center -space-x-px h-8 text-sm">
        {Array.from({ length: pageCount }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
            >
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {index + 1}
              </a>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
