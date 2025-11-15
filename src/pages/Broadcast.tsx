import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Upload, ChevronDown, MoreVertical, X, Plus, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "sonner";

interface Contact {
  name: string;
  number: string;
}

const Broadcast = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<Contact[]>([]);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [manualContacts, setManualContacts] = useState<Contact[]>([{ name: "", number: "" }]);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [spinText, setSpinText] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const templates = [
    { id: "1", name: "Template Promo", content: "Halo {nama}, dapatkan promo spesial hari ini!" },
    { id: "2", name: "Template Reminder", content: "Hai {nama}, jangan lupa event besok ya!" },
    { id: "3", name: "Template Info", content: "Informasi untuk {nama}: Update terbaru sudah tersedia." },
  ];

  const handleImportManual = () => {
    setShowImportDialog(true);
  };

  const handleImportSS = () => {
    toast.info("Fitur Import Screenshot akan segera tersedia");
  };

  const handleImportCSV = () => {
    toast.info("Fitur Import CSV akan segera tersedia");
  };

  const handleImportFromContact = () => {
    toast.info("Fitur Import From Contact akan segera tersedia");
  };

  const addContactRow = () => {
    setManualContacts([...manualContacts, { name: "", number: "" }]);
  };

  const removeContactRow = (index: number) => {
    const newContacts = manualContacts.filter((_, i) => i !== index);
    setManualContacts(newContacts);
  };

  const updateContact = (index: number, field: keyof Contact, value: string) => {
    const newContacts = [...manualContacts];
    newContacts[index][field] = value;
    setManualContacts(newContacts);
  };

  const saveManualContacts = () => {
    const validContacts = manualContacts.filter(c => c.name && c.number);
    if (validContacts.length === 0) {
      toast.error("Tambahkan minimal 1 kontak yang valid");
      return;
    }
    setSelectedNumbers(validContacts);
    setShowImportDialog(false);
    toast.success(`${validContacts.length} kontak berhasil ditambahkan`);
  };

  const handleToggleTemplate = (templateId: string) => {
    setSelectedTemplates(prev => {
      if (spinText) {
        // Multi selection jika spin text ON
        if (prev.includes(templateId)) {
          return prev.filter(id => id !== templateId);
        } else {
          return [...prev, templateId];
        }
      } else {
        // Single selection jika spin text OFF
        return [templateId];
      }
    });
  };

  const applySelectedTemplates = () => {
    if (selectedTemplates.length === 0) {
      toast.error("Pilih minimal 1 template");
      return;
    }
    
    // Jika hanya 1 template, langsung pakai content-nya
    if (selectedTemplates.length === 1) {
      const template = templates.find(t => t.id === selectedTemplates[0]);
      if (template) {
        setMessage(template.content);
      }
    } else {
      // Jika lebih dari 1, gabungkan dengan format spin text
      const selectedContents = selectedTemplates
        .map(id => templates.find(t => t.id === id)?.content)
        .filter(Boolean);
      setMessage(`{${selectedContents.join('|')}}`);
      setSpinText(true);
    }
    
    setShowTemplateDialog(false);
    toast.success(`${selectedTemplates.length} template dipilih`);
  };

  const startBroadcast = async () => {
    if (selectedNumbers.length === 0) {
      toast.error("Pilih nomor WA terlebih dahulu");
      return;
    }
    if (!message.trim()) {
      toast.error("Tulis pesan terlebih dahulu");
      return;
    }

    setIsSending(true);
    setProgress(0);
    setLogs([]);

    // Simulasi pengiriman
    for (let i = 0; i < selectedNumbers.length; i++) {
      const contact = selectedNumbers[i];
      const personalizedMessage = message.replace("{nama}", contact.name);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(((i + 1) / selectedNumbers.length) * 100);
      setLogs(prev => [...prev, `✓ Terkirim ke ${contact.name} (${contact.number})`]);
    }

    setIsSending(false);
    toast.success("Broadcast selesai!");
  };

  const stopBroadcast = () => {
    setIsSending(false);
    toast.info("Broadcast dihentikan");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file berhasil diupload`);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info("File dihapus");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-7 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground mb-4">Broadcast</h1>

        {/* Progress Bar */}
        <p className="text-muted-foreground text-[10px] mb-2">Sending Progress {Math.round(progress)}%</p>
        <Progress value={progress} className="h-[2px] mb-6" />

        {/* Nomor WA Card */}
        <div className="mb-4">
          <div className="w-full h-[40px] rounded-t-[5px] bg-gradient-to-r from-[#45E3FF] to-[#147FEB] flex items-center justify-between px-3 relative">
            <span className="text-white text-[15px] font-medium">Nomor WA</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:bg-white/10 rounded p-1 transition-colors">
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[140px]">
                <DropdownMenuItem onClick={handleImportManual}>
                  Import manual
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleImportSS}>
                  Import SS
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleImportCSV}>
                  Import CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleImportFromContact}>
                  Import From Contact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full h-[106px] border border-t-0 border-border bg-card rounded-b-[3px] p-3 overflow-y-auto">
            {selectedNumbers.length > 0 ? (
              <div className="space-y-1">
                {selectedNumbers.map((contact, idx) => (
                  <div key={idx} className="text-xs text-foreground flex justify-between items-center">
                    <span>{contact.name} - {contact.number}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Pilih metode import nomor WA</p>
            )}
          </div>
        </div>

        {/* Pesan Card */}
        <div className="mb-4">
          <div className="w-full h-[40px] rounded-t-[5px] bg-gradient-to-r from-[#45E3FF] to-[#147FEB] flex items-center px-3">
            <span className="text-white text-[15px] font-medium">Pesan</span>
          </div>
          <div className="border border-t-0 border-border bg-card rounded-b-[3px] p-3">
            {/* Pilih Template */}
            <button 
              onClick={() => setShowTemplateDialog(true)}
              className="w-full h-[31px] rounded-[3px] border border-border bg-card flex items-center justify-between px-3 mb-3 hover:bg-accent transition-colors"
            >
              <span className={selectedTemplates.length > 0 ? "text-foreground text-xs" : "text-muted-foreground text-xs"}>
                {selectedTemplates.length > 0 ? `${selectedTemplates.length} template dipilih` : "Pilih Template"}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Text Area */}
            <div className="w-full h-[79px] rounded-[3px] border border-border bg-card mb-3 p-2">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-full bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="Tulis pesan..."
              />
            </div>

            {/* SpinText Toggle */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-foreground text-xs">SpinText</span>
              <Switch checked={spinText} onCheckedChange={setSpinText} />
            </div>

          </div>
        </div>

        {/* Files Card */}
        <div className="mb-4">
          <div className="w-full h-[40px] rounded-t-[5px] bg-gradient-to-r from-[#45E3FF] to-[#147FEB] flex items-center px-3">
            <span className="text-white text-[15px] font-medium">Files</span>
          </div>
          <div className="border border-t-0 border-border bg-card rounded-b-[3px] p-3">
            {/* Upload Files */}
            <div className="w-full h-[43px] rounded-[3px] border border-border bg-card flex items-center px-3 mb-3">
              <label className="flex items-center gap-2 px-3 py-1 rounded-md border border-border bg-card hover:bg-accent transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                <span className="text-xs font-bold">Upload Files</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                />
              </label>
            </div>

            {/* File Display Area */}
            <div className="w-full h-[76px] rounded-[3px] border border-border bg-card mb-3 p-2 overflow-y-auto">
              {uploadedFiles.length > 0 ? (
                <div className="space-y-1">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-foreground truncate flex-1">{file.name}</span>
                      <button
                        onClick={() => removeFile(idx)}
                        className="ml-2 hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">File yang diupload akan muncul di sini...</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <Button 
                onClick={stopBroadcast}
                disabled={!isSending}
                className="bg-[#F63033] hover:bg-[#d42528] text-white font-bold text-[15px] px-6 h-[25px] rounded-[3px] disabled:opacity-50"
              >
                Stop
              </Button>
              <Button 
                onClick={startBroadcast}
                disabled={isSending}
                className="bg-[#30B7F6] hover:bg-[#2a9fd6] text-white font-bold text-[15px] px-6 h-[25px] rounded-[3px] disabled:opacity-50"
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>

        {/* LOG Card */}
        <div className="mb-4">
          <div className="w-full h-[40px] rounded-t-[5px] bg-gradient-to-r from-[#45E3FF] to-[#147FEB] flex items-center justify-between px-3 relative">
            <span className="text-white text-[15px] font-medium">LOG</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:bg-white/10 rounded p-1 transition-colors">
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[120px]">
                <DropdownMenuItem>Clear Log</DropdownMenuItem>
                <DropdownMenuItem>Export Log</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full h-[76px] border border-t-0 border-border bg-card rounded-b-[3px] p-3 overflow-y-auto">
            {logs.length > 0 ? (
              <div className="space-y-1">
                {logs.map((log, idx) => (
                  <p key={idx} className="text-[10px] text-foreground">{log}</p>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Log broadcast akan muncul di sini...</p>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation currentPage="broadcast" />

      {/* Import Manual Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-[320px] max-h-[500px] overflow-hidden flex flex-col p-0">
          <DialogHeader className="w-full h-[53px] bg-gradient-to-r from-[#45E3FF] to-[#147FEB] flex items-center px-4">
            <DialogTitle className="text-primary-foreground text-lg font-semibold">Import manual</DialogTitle>
          </DialogHeader>
          
          <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-4">
            <div className="border border-border rounded-[3px] overflow-hidden">
              <div className="grid grid-cols-[1fr_2fr_auto] bg-muted border-b border-border">
                <div className="p-2 text-xs font-medium text-foreground border-r border-border">Nama</div>
                <div className="p-2 text-xs font-medium text-foreground border-r border-border">Nomor WA</div>
                <div className="w-10"></div>
              </div>
              
              {manualContacts.map((contact, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_2fr_auto] border-b border-border last:border-b-0">
                  <Input
                    value={contact.name}
                    onChange={(e) => updateContact(idx, "name", e.target.value)}
                    placeholder="Nama"
                    className="h-8 text-xs rounded-none border-0 border-r border-border focus-visible:ring-0"
                  />
                  <Input
                    value={contact.number}
                    onChange={(e) => updateContact(idx, "number", e.target.value)}
                    placeholder="628xxx"
                    className="h-8 text-xs rounded-none border-0 border-r border-border focus-visible:ring-0"
                  />
                  <button
                    onClick={() => removeContactRow(idx)}
                    className="w-10 h-8 flex items-center justify-center hover:bg-destructive/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
            
            <Button
              onClick={addContactRow}
              variant="outline"
              size="sm"
              className="w-full mt-3"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Baris
            </Button>
          </div>

          <div className="flex gap-2 justify-end p-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Batal
            </Button>
            <Button onClick={saveManualContacts}>
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Selection Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-[320px] p-0 gap-0">
          <DialogHeader className="w-full h-[53px] bg-gradient-to-r from-primary to-primary/80 flex items-center px-4 m-0">
            <DialogTitle className="text-primary-foreground text-lg font-semibold">Pilih Template</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-2 p-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleToggleTemplate(template.id)}
                className={`w-full p-3 border rounded-md transition-all text-left relative ${
                  selectedTemplates.includes(template.id) 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:bg-accent'
                }`}
              >
                {selectedTemplates.includes(template.id) && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <p className="text-sm font-medium text-foreground pr-8">{template.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{template.content}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-2 justify-end p-4 border-t">
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
              Batal
            </Button>
            <Button onClick={applySelectedTemplates}>
              Terapkan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Broadcast;
