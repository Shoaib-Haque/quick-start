export default function ItemsPerPageSelect({itemsPerPage, onOptionChange, isBusy = false}) {
    const itemPerPage = [10, 20, 50];
    return (
        <select
            value={itemsPerPage}
            onChange={onOptionChange}
            className={`border rounded px-2 py-1 ${isBusy ? 'opacity-50 !cursor-not-allowed' : ''}`}
        >
            {itemPerPage.map((num) => (
            <option key={num} value={num}>
                {num}
            </option>
            ))}
        </select>
    );
}