import { Search as SearchIcon } from "lucide-react";

export default function Search({placeholder = "Search...", searchByKey, isBusy = false}) {
    return (
        <div className="relative flex items-center w-full max-w-xs">
            <SearchIcon className="absolute left-2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input 
                placeholder={placeholder}
                onChange={searchByKey}
                className={`w-full pl-8 border border-gray-300 focus:border-gray-500 focus:outline-none rounded p-1 text-sm ${isBusy ? "opacity-50 !cursor-not-allowed" : ""}`}
                disabled={isBusy}
            />
        </div>
    );
}