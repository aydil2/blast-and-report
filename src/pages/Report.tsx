import { useState } from "react";
import { Search, Flag } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { DownloadReportDialog } from "@/components/DownloadReportDialog";
import { toast } from "@/hooks/use-toast";

interface ReportItem {
  id: number;
  name: string;
  date: string;
}

const Report = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [reports] = useState<ReportItem[]>([
    { id: 1, name: "Report-27-10-2025", date: "27-10-2025" },
    { id: 2, name: "Report-26-10-2025", date: "26-10-2025" },
    { id: 3, name: "Report-25-10-2025", date: "25-10-2025" },
    { id: 4, name: "Report-18-10-2025", date: "18-10-2025" },
    { id: 5, name: "Report-10-10-2025", date: "10-10-2025" },
  ]);

  const handleReportClick = (report: ReportItem) => {
    setSelectedReport(report);
    setDialogOpen(true);
  };

  const handleDownload = () => {
    toast({
      title: "Download selesai",
      description: `${selectedReport?.name} berhasil didownload`,
    });
  };

  const filteredReports = reports.filter((report) =>
    report.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[393px] h-[852px] relative">
        {/* Header */}
        <div className="pt-[46px] px-7">
          <h1 className="text-[30px] font-bold text-foreground">Report</h1>
        </div>

        {/* Search Bar */}
        <div className="mt-8 px-[37px]">
          <div className="relative w-full">
            <div className="h-[47px] rounded-[5px] bg-search-bg/40 flex items-center px-4 gap-3">
              <Search className="w-8 h-8 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari tanggal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-base font-medium text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {/* Report List Container */}
        <div className="mt-6 mx-[37px] rounded-[10px] bg-[#D9E9FC]/40 p-0 min-h-[590px] overflow-hidden">
          <div className="divide-y divide-border/20">
            {filteredReports.map((report) => (
              <button
                key={report.id}
                onClick={() => handleReportClick(report)}
                className="w-full h-[52px] px-4 flex items-center gap-4 hover:bg-background/30 transition-colors group"
              >
                <Flag className="w-5 h-5 text-destructive fill-destructive flex-shrink-0" />
                <span className="text-[15px] font-medium text-[#1FB5E8] group-hover:text-[#1BA5D8] transition-colors">
                  {report.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentPage="report" />

        {/* Download Dialog */}
        <DownloadReportDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          reportName={selectedReport?.name || ""}
          onConfirm={handleDownload}
        />
      </div>
    </div>
  );
};

export default Report;
