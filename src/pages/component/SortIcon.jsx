
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

export default function SortIcon({ direction }) {
  switch (direction) {
    case 'asc':
      return <ArrowUp  className="w-4 h-4 inline ml-1" />;
    case 'desc':
      return <ArrowDown className="w-4 h-4 inline ml-1" />;
    default:
      return <ArrowUpDown className="w-4 h-4 inline ml-1 text-gray-400" />;
  }
}