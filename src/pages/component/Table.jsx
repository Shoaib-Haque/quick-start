import SortIcon from "./SortIcon";

export default function Table({
  headings = [],
  children,
  onSortClick,
  sortableColumns = [],
  sorts = {},
  data,
  renderRow,
}) {
  return (
    <div className="rounded border border-gray-300 overflow-x-auto w-full mb-2">
      <table className="table-fixed min-w-[700px] w-full text-sm text-left">
        <colgroup>
          {headings.map(({ width }, index) => (
            <col
              key={index}
              style={
                width && width.startsWith('w-')
                  ? { width: widthToCss(width) }
                  : width
                  ? { width }
                  : undefined
              }
            />
          ))}
        </colgroup>

        <thead className="bg-blue-100">
          <tr>
            {headings.map(({ label }, index) => {
              const sortableField = sortableColumns[index];
              const sortDirection = sortableField ? sorts[sortableField] : null;

              return (
                <th
                  key={index}
                  onClick={() => sortableField && onSortClick(sortableField)}
                  className={`px-4 py-2 ${sortableField ? "cursor-pointer select-none" : ""}`}
                >
                  <div className="flex items-center gap-1">
                    <span>{label}</span>
                    {sortableField && <SortIcon direction={sortDirection} />}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data && renderRow
            ? data.map((item) => renderRow(item))
            : children
          }
        </tbody>
      </table>
    </div>
  );
}

function widthToCss(twClass) {
  const match = twClass.match(/w-\[(.+)\]/);
  if (match) return match[1];
  return undefined;
}