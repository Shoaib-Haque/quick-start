export default function DataTableRow({
  item,
  columns,
  handlers = {},
  isBusy,
}) {
  const { onSelect, onEdit, onRemove } = handlers;

  return (
    <tr
      key={item.id}
      className={`
        border-b border-gray-300
        hover:shadow-lg hover:-translate-y-1
        transition-transform transition-shadow transition-colors duration-300 ease-in-out
        ${item.selected ? "bg-blue-50" : ""}
        ${item.justAdded ? "bg-green-100 animate-pulse" : ""}
        ${item.justEdited ? "bg-yellow-100 animate-pulse" : ""}
        ${item.removing ? "bg-red-200 animate-pulse" : ""}
      `}
    >
      {columns.map(({ key, width, render, isCheckbox, isActions }) => {
        return (
          <td
            key={key}
            style={{ width: width || "auto" }}
            className={`px-4 py-2 whitespace-nowrap truncate overflow-hidden text-ellipsis ${
              isActions ? "text-center" : ""
            }`}
            title={item[key]}
          >
            {render ? (
              render(item, { onSelect, onEdit, onRemove, isBusy })
            ) : isCheckbox ? (
              <input
                type="checkbox"
                checked={item.selected}
                disabled={isBusy}
                onChange={() => onSelect(item.id)}
                aria-label={item.selected ? `Deselect ${item.name}` : `Select ${item.name}`}
                className={isBusy ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              />
            ) : (
              item[key]
            )}
          </td>
        );
      })}
    </tr>
  );
}
