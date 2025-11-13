import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Nama template harus diisi"),
  message: z.string().min(1, "Pesan template harus diisi"),
});

interface EditTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditTemplate: (data: { name: string; message: string }) => void;
  initialData: { name: string; message: string };
}

export const EditTemplateDialog = ({
  open,
  onOpenChange,
  onEditTemplate,
  initialData,
}: EditTemplateDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      message: initialData.message,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onEditTemplate({ name: data.name, message: data.message });
    onOpenChange(false);
    toast({
      title: "Template berhasil diubah",
      description: "Template telah diperbarui",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-[340px] rounded-[10px] bg-background border-none p-0">
        <div className="bg-dialog-cyan h-[50px] rounded-t-[10px] flex items-center justify-center">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-medium">
              Edit Template
            </DialogTitle>
          </DialogHeader>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 pb-6 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Nama Template
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan nama template"
                      className="h-[47px] rounded-[5px] border-border/30 bg-search-bg/40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Pesan Template
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Masukkan pesan template"
                      className="min-h-[120px] rounded-[5px] border-border/30 bg-search-bg/40 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-[45px] rounded-[5px]"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 h-[45px] rounded-[5px] bg-dialog-cyan hover:bg-dialog-cyan/90"
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
