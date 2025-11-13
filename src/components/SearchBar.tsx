import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = "Cari nama atau nomor..." }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-[319px] mx-auto">
      <div className="h-[47px] rounded-[5px] bg-search-bg/40 flex items-center px-4 gap-3">
        <Search className="w-8 h-8 text-foreground/50 flex-shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-base font-medium text-foreground placeholder:text-foreground/50"
        />
      </div>
    </div>
  );
};
