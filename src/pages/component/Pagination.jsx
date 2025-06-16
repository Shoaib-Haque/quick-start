export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, isBusy = false }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
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
    );
  }
  