import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
interface ContactCardProps {
  name: string;
  phone: string;
  label?: {
    text: string;
    color: "red" | "yellow" | "green";
  };
  onLongPress?: () => void;
}
export const ContactCard = ({
  name,
  phone,
  label,
  onLongPress
}: ContactCardProps) => {
  const initial = name.charAt(0).toUpperCase();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const labels = [
    { id: "vip", name: "VIP", color: "bg-green-500" },
    { id: "new", name: "New", color: "bg-yellow-500" },
    { id: "important", name: "Important", color: "bg-red-500" },
  ];

  const labelColors = {
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700"
  };
  const handleTouchStart = () => {
    if (onLongPress !== undefined) return;
    const timer = setTimeout(() => {
      setShowDialog(true);
    }, 500);
    setPressTimer(timer);
  };
  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };
  const handleMouseDown = () => {
    if (onLongPress !== undefined) return;
    const timer = setTimeout(() => {
      setShowDialog(true);
    }, 500);
    setPressTimer(timer);
  };
  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };
  const handleCancel = () => {
    setShowDialog(false);
    setSelectedLabels([]);
  };
  const handleToggleLabel = (labelId: string) => {
    setSelectedLabels(prev => prev.includes(labelId) ? prev.filter(id => id !== labelId) : [...prev, labelId]);
  };
  const handleRemoveLabel = () => {
    console.log("Hapus label dari kontak:", name);
    setShowDialog(false);
    setSelectedLabels([]);
  };
  return <>
      <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:border-primary/50 cursor-pointer select-none" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary">
          <span className="text-primary-foreground font-semibold">{initial}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{name}</h3>
          <p className="text-sm text-muted-foreground truncate">{phone}</p>
        </div>

        {label && <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${labelColors[label.color]}`}>
            {label.text}
          </span>}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-card max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground">Pilih Label</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {labels.map(labelItem => <div key={labelItem.id} className="flex items-center space-x-3">
                <Checkbox id={labelItem.id} checked={selectedLabels.includes(labelItem.id)} onCheckedChange={() => handleToggleLabel(labelItem.id)} />
                <label htmlFor={labelItem.id} className="flex items-center gap-2 flex-1 cursor-pointer">
                  <div className={`w-4 h-4 rounded ${labelItem.color}`} />
                  <span className="text-foreground">{labelItem.name}</span>
                </label>
              </div>)}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Batal
            </Button>
            <Button variant="destructive" onClick={handleRemoveLabel} className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};