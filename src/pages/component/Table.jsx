export default function Table({ headings, children }) {
    return (
        <table className="table-auto border border-gray-300 w-full text-sm text-left">
            <thead className="bg-gray-100">
                <tr>
                    {
                        headings.map((heading, index) => (
                            <th key={ index } className="border border-gray-300 px-4 py-2">{ heading }</th>
                        ))
                    }
                </tr>
            </thead>
            { children }    
        </table>
    )
}