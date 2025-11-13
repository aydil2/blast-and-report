import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[120px] right-8 w-14 h-14 rounded-full bg-[#1FB5E8] hover:bg-[#1BA5D8] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40 max-w-[393px] mx-auto"
      aria-label="Tambah Template"
    >
      <Plus className="w-8 h-8" strokeWidth={2.5} />
    </button>
  );
};
