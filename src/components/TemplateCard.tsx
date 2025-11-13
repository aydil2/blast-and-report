import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TemplateCardProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const TemplateCard = ({ title, description, onEdit, onDelete }: TemplateCardProps) => {
  return (
    <div className="w-full h-[83px] rounded-[5px] border border-card-border/30 bg-card p-4 flex flex-col justify-center relative">
      <h3 className="text-xl font-medium text-foreground mb-1">{title}</h3>
      <p className="text-[15px] font-medium text-muted-foreground/50">{description}</p>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute top-1/2 right-4 -translate-y-1/2 text-card-border/80 hover:text-card-border transition-colors">
            <MoreVertical className="w-[19px] h-[19px]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[120px] bg-background border border-border z-50">
          <DropdownMenuItem onClick={onEdit} className="cursor-pointer hover:bg-accent">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="cursor-pointer hover:bg-accent text-destructive">
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
