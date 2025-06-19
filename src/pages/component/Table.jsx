import SortIcon from "./SortIcon";

export default function Table({ headings = [], children, onSortClick, sortableColumns = [], sorts }) {
    return (
        <table className="table-auto border border-gray-300 w-full text-sm text-left">
            <thead className="bg-gray-100">
                <tr>
                    {headings.map((heading, index) => {
                        const sortableField = sortableColumns[index];
                        const sortDirection = sortableField ? sorts[sortableField] : null;
                        return (
                            <th
                                key={index}
                                onClick={() => sortableField && onSortClick(sortableField)}
                                className={`border border-gray-300 px-4 py-2 ${sortableField ? 'cursor-pointer select-none' : ''}`}
                            >
                                {heading}
                                    { sortableField && <SortIcon direction={sortDirection} /> }
                            </th>
                        );
                    })}
                </tr>
            </thead>
            { children }    
        </table>
    )
}