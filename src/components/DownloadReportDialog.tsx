import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DownloadReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportName: string;
  onConfirm: () => void;
}

export const DownloadReportDialog = ({
  open,
  onOpenChange,
  reportName,
  onConfirm,
}: DownloadReportDialogProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isDownloading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      const timer = setTimeout(() => {
        setIsDownloading(false);
        setProgress(0);
        onOpenChange(false);
        onConfirm();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isDownloading, progress, onConfirm, onOpenChange]);

  const handleDownload = () => {
    setIsDownloading(true);
    setProgress(0);
  };

  const handleCancel = () => {
    setIsDownloading(false);
    setProgress(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[270px] rounded-[10px] border-[3px] border-[#45E3FF] bg-background p-0 gap-0">
        <div className="flex flex-col items-center py-8 px-6">
          {!isDownloading ? (
            <>
              <h2 className="text-[20px] font-medium text-[#232323] text-center mb-8">
                Download {reportName}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="w-[77px] h-[30px] rounded-[5px] bg-[#F63033] text-white text-[15px] font-medium hover:bg-[#E02023] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDownload}
                  className="w-[77px] h-[30px] rounded-[5px] bg-[#30B7F6] text-white text-[15px] font-medium hover:bg-[#2AA7E6] transition-colors"
                >
                  Lanjut
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[20px] font-medium text-[#232323] text-center mb-6">
                Downloading Progress {progress}%
              </h2>
              <div className="w-[170px] h-[20px] bg-gray-300 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-[#00FF00] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="w-[77px] h-[30px] rounded-[5px] bg-[#F63033] text-white text-[15px] font-medium hover:bg-[#E02023] transition-colors"
                >
                  Batal
                </button>
                <button
                  disabled
                  className="w-[77px] h-[30px] rounded-[5px] bg-[#30B7F6] text-white text-[15px] font-medium opacity-50 cursor-not-allowed"
                >
                  Lanjut
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
