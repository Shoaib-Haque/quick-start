import Swal from "sweetalert2";

export function sort(items, sorts, sortOrder) {
    const sorted = [...items];
    for (let field of [...sortOrder].reverse()) {
        const direction = sorts[field];
        if (!direction) continue;
        sorted.sort((a, b) => {
            const aVal = a[field]?.toLowerCase?.() || '';
            const bVal = b[field]?.toLowerCase?.() || '';
            return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });
    }
    return sorted;
}

export function deleteConfirmDialog({ title = "", text = "", confirmText = "" }) {
    return Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: confirmText,
        allowOutsideClick: false,      // fully disable
        allowEscapeKey: false,
        didOpen: () => {
            // Optionally disable cancel button initially
            const cancelButton = Swal.getCancelButton();
            if (cancelButton) {
                cancelButton.disabled = false;
            }
        },
        preConfirm: () => {
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


export function successDialog(title) {
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

export const toastWithUndo = async ({
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

export const exportToCSV = ({ data, filename = "data.csv", columns }) => {
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