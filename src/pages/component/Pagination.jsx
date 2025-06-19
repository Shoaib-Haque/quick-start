export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, onOptionChange, isBusy = false }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const itemPerPage = [10, 20, 50];
  
    // Calculate page numbers to show according to your rules
    function getPageNumbers() {
      const pages = [];
      if (totalPages <= 7) {
        // Show all if total is small
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
      }
  
      if (currentPage <= 4) {
        // First 5 pages + last page
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // First page + last 5 pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        // First page + prev,current,next + last page
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
  
      return pages;
    }
  
    const pages = getPageNumbers();
  
    return (
      <div className="mb-4 flex flex-wrap min-[525px]:flex-nowrap min-[525px]:items-center justify-between gap-2">
        {/* Items Per Page */}
        <div className="flex-shrink-1">
            <select
                value={itemsPerPage}
                onChange={onOptionChange}
                className={`border border-gray-300 rounded w-fit px-2 py-1 ${isBusy ? 'opacity-50 !cursor-not-allowed' : ''}`}
            >
                {itemPerPage.map((num) => (
                <option key={num} value={num}>
                    {num}
                </option>
                ))}
            </select>
        </div>
        {/* Pagination Summary */}
        <div className="w-full min-[525px]:w-auto min-[525px]:flex-1 flex min-[525px]:justify-center min-[525px]:order-none order-first justify-end text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems.toLocaleString()}
          </div>
        {/* Page Links */}
        <div className="flex-shrink-1">
          <div className="pagination flex gap-2 items-center">
            {pages.map((page, idx) =>
              page === "..." ? (
                <span key={"ellipsis-" + idx} className="px-2 select-none">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  disabled={page === currentPage}
                  className={`px-3 py-1 rounded ${isBusy ? 'opacity-50 !cursor-not-allowed' : ''} ${
                    page === currentPage
                      ? "bg-gray-600 text-white cursor-default"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
  