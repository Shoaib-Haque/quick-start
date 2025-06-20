import Swal from "sweetalert2";

export const helperGetSearchWords = ({searchTerm}) => {
    return searchTerm?.trim().toLowerCase().split(/\s+/).filter(Boolean);
};

export const helperFilterItems = ({items, searchWords, fieldsToSearch = []}) => {
    if (!Array.isArray(items)) return [];
    if (!searchWords.length) return items;

    return items.filter(item => {
        const combined = fieldsToSearch.map(field => item[field] ?? "").join(' ').toLowerCase();
        return searchWords.some(word => combined.includes(word));
    });
};

export const helperSort = ({items, sorts, sortOrder}) => {
    if (!Array.isArray(items)) return [];

    const sorted = [...items];
    for (let field of [...sortOrder].reverse()) {
        const direction = sorts?.[field];
        if (!direction) continue;

        sorted.sort((a, b) => {
        const aVal = a[field]?.toString?.().toLowerCase?.() ?? '';
        const bVal = b[field]?.toString?.().toLowerCase?.() ?? '';
        return direction === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        });
    }
    return sorted;
}

export const helperPaginateItems = ({items, currentPage, itemsPerPage}) => {
    if (!Array.isArray(items)) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
};

// filters + sorts + returns sorted array
export const helperFilterAndSort = ({
    items, 
    searchWords, 
    fieldsToSearch, 
    sorts, 
    sortOrder}) => {
    const filtered = helperFilterItems({ items, searchWords, fieldsToSearch });
    return helperSort({ items: filtered, sorts, sortOrder });
};
  
// calculates what page a given index belongs to
export const helperGetPageForIndex = ({ index, itemsPerPage }) => {
    return Math.floor(index / itemsPerPage) + 1;
};

// add selection flag state for list
export const helperAddSelectionFlag = ({items}) => {
    return items.map(item => ({ ...item, selected: false }));
};
  
// handles justAdded/justEdited removal
export const helperRemoveTemporaryFlag = ({ setItems, id, flag }) => {
    setTimeout(() => {
      setItems(prev =>
        prev.map(item => (item.id === id ? { ...item, [flag]: false } : item))
      );
    }, 1000); // match your animation duration
};


export const helperSaveAndReposition = ({
    items,
    newItem,
    editId,
    searchWords,
    sorts,
    itemsPerPage,
    setItems,
    setCurrentPage,
    fieldsToSearch = [],
    sortOrder = [],
  }) => {
    const updated = editId
      ? items.map(i => i.id === editId ? { ...i, ...newItem } : i)
      : [...items, newItem];
  
    setItems(updated);
  
    const filtered = helperFilterItems({ items: updated, searchWords, fieldsToSearch });
    const sorted = helperSort({ items: filtered, sorts, sortOrder });
  
    const targetId = editId || newItem.id;
    const newIndex = sorted.findIndex(i => i.id === targetId);
  
    if (newIndex !== -1) {
      const newPage = Math.floor(newIndex / itemsPerPage) + 1;
      setCurrentPage(newPage);
    }
  
    return updated; // So you can use it again if needed
}

export const helperExportToCSV = ({ data, filename = "data.csv", columns }) => {
    if (!Array.isArray(data) || data.length === 0 || !Array.isArray(columns)) return;

    const header = columns.map(col => col.label);
    const rows = data.map(item => columns.map(col => item[col.key] ?? ""));

    const csvContent = [header, ...rows]
        .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

let isDeleteConfirming = false;
export const helperDeleteConfirmDialog = ({ title = "", text = "", confirmText = "" }) => {
    isDeleteConfirming = false;
    return Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: confirmText,
        allowOutsideClick: () => !isDeleteConfirming,
        allowEscapeKey: false,
        didOpen: () => {
            // Optionally disable cancel button initially
            const cancelButton = Swal.getCancelButton();
            if (cancelButton) {
                cancelButton.disabled = false;
            }
        },
        preConfirm: () => {
            isDeleteConfirming = true;
            const confirmButton = Swal.getConfirmButton();
            const cancelButton = Swal.getCancelButton();

            // Apply your custom .loading class
            confirmButton.classList.add('loading');

            // Disable cancel button
            if (cancelButton) {
                cancelButton.disabled = true;
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(); // Close the modal after 700ms
                }, 700);
            });
        }
    });
}

export const helperSuccessDialog = ({title}) => {
    Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'info',
        title,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 2000,
        timerProgressBar: true
    });      
}

export const helperToastWithUndo = async ({
        message,
        timer = 5000,
        onUndo = () => {},
        onFinalize = () => {},
        icon = 'info'
    }) => {
    const result = await Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon,
      title: message,
      showConfirmButton: true,
      confirmButtonText: 'Undo',
      cancelButtonText: 'Dismiss',
      showCancelButton: true,
      timer,
      timerProgressBar: true,
    });
  
    if (result.isConfirmed) {
      onUndo();
    } else {
      onFinalize();
    }
};