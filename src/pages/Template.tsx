import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { TemplateCard } from "@/components/TemplateCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { AddTemplateDialog } from "@/components/AddTemplateDialog";
import { EditTemplateDialog } from "@/components/EditTemplateDialog";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Template {
  id: number;
  title: string;
  description: string;
}

const Template = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      title: "Template 1",
      description: "Hai kak nama saya --- saya adalah..."
    },
    {
      id: 2,
      title: "Template 2",
      description: "Hai kak nama saya --- saya adalah..."
    },
    {
      id: 3,
      title: "Template 3",
      description: "Hai kak nama saya --- saya adalah..."
    },
    {
      id: 4,
      title: "Template 4",
      description: "Hai kak nama saya --- saya adalah..."
    }
  ]);

  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTemplate = (newTemplate: { name: string; message: string }) => {
    const template: Template = {
      id: templates.length + 1,
      title: newTemplate.name,
      description: newTemplate.message
    };
    setTemplates([...templates, template]);
  };

  const handleEditClick = (template: Template) => {
    setSelectedTemplate(template);
    setEditDialogOpen(true);
  };

  const handleEditTemplate = (data: { name: string; message: string }) => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id 
          ? { ...t, title: data.name, description: data.message }
          : t
      ));
    }
  };

  const handleDeleteClick = (template: Template) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTemplate) {
      setTemplates(templates.filter(t => t.id !== selectedTemplate.id));
      toast({
        title: "Template berhasil dihapus",
        description: "Template telah dihapus dari daftar",
      });
    }
    setDeleteDialogOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[393px] h-[852px] relative">
        {/* Header */}
        <div className="pt-[46px] px-7">
          <h1 className="text-[30px] font-bold text-foreground">
            List Template
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mt-12 px-[37px]">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Content Container */}
        <div className="mt-6 mx-[18px] rounded-[10px] border border-card-border/30 bg-background p-[19px] min-h-[628px]">
          <div className="space-y-[10px]">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  title={template.title}
                  description={template.description}
                  onEdit={() => handleEditClick(template)}
                  onDelete={() => handleDeleteClick(template)}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Tidak ada template yang ditemukan
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton onClick={() => setDialogOpen(true)} />

        {/* Add Template Dialog */}
        <AddTemplateDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onAddTemplate={handleAddTemplate}
        />

        {/* Edit Template Dialog */}
        {selectedTemplate && (
          <EditTemplateDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onEditTemplate={handleEditTemplate}
            initialData={{
              name: selectedTemplate.title,
              message: selectedTemplate.description
            }}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="w-[90%] max-w-[340px] rounded-[10px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Template?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus template "{selectedTemplate?.title}"? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-destructive hover:bg-destructive/90"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Bottom Navigation */}
        <BottomNavigation currentPage="template" />
      </div>
    </div>
  );
};

export default Template;
