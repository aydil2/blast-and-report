import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const filterOptions = [
  { id: "VIP", label: "VIP" },
  { id: "New", label: "New" },
  { id: "Important", label: "Important" },
];

export const FilterContactDialog = ({ 
  open, 
  onOpenChange, 
  selectedFilters,
  onFiltersChange 
}: FilterContactDialogProps) => {
  const handleToggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFiltersChange(selectedFilters.filter(id => id !== filterId));
    } else {
      onFiltersChange([...selectedFilters, filterId]);
    }
  };

  const handleClearAll = () => {
    onFiltersChange([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Contacts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {filterOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-3">
              <Checkbox
                id={option.id}
                checked={selectedFilters.includes(option.id)}
                onCheckedChange={() => handleToggleFilter(option.id)}
              />
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={handleClearAll} className="w-full sm:w-auto">
            Clear All
          </Button>
          <Button type="button" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
