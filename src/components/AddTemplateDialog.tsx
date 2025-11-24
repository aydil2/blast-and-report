import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { toast } from "sonner";

const templateSchema = z.object({
  name: z.string().trim().min(1, { message: "Nama template tidak boleh kosong" }).max(100, { message: "Nama template maksimal 100 karakter" }),
  message: z.string().trim().min(1, { message: "Pesan template tidak boleh kosong" }).max(1000, { message: "Pesan template maksimal 1000 karakter" })
});

interface AddTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTemplate: (template: { name: string; message: string }) => void;
}

export const AddTemplateDialog = ({ open, onOpenChange, onAddTemplate }: AddTemplateDialogProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

  const handleSave = () => {
    try {
      const validated = templateSchema.parse({ name, message });
      onAddTemplate({ name: validated.name, message: validated.message });
      setName("");
      setMessage("");
      setErrors({});
      onOpenChange(false);
      toast.success("Template berhasil ditambahkan!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { name?: string; message?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === "name") fieldErrors.name = err.message;
          if (err.path[0] === "message") fieldErrors.message = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleCancel = () => {
    setName("");
    setMessage("");
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-64px)] max-w-[329px] p-0 gap-0 rounded-[10px] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#45E3FF] to-[#147FEB] px-5 py-4">
          <h2 className="text-white text-xl font-medium">Tambah Template</h2>
        </div>

        {/* Form Content */}
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name" className="text-foreground text-sm font-medium">
              Nama Template
            </Label>
            <Input
              id="template-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Template 2"
              className="border-border/30 focus-visible:ring-primary"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-message" className="text-foreground text-sm font-medium">
              Pesan Template
            </Label>
            <Textarea
              id="template-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hai kak nama saya --- saya adalah..."
              className="border-border/30 min-h-[80px] resize-none focus-visible:ring-primary"
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-8 font-medium"
            >
              Batal
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#45E3FF] to-[#147FEB] hover:opacity-90 text-white px-6 font-medium"
            >
              Simpan Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
