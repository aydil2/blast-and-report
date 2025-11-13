import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Calendar } from "lucide-react";

const Report = () => {
  const reports = [
    { id: 1, title: "Report Januari 2024", date: "2024-01-31", status: "Completed" },
    { id: 2, title: "Report Februari 2024", date: "2024-02-29", status: "Completed" },
    { id: 3, title: "Report Maret 2024", date: "2024-03-31", status: "In Progress" },
  ];

  const handleDownload = (reportId: number) => {
    console.log("Downloading report:", reportId);
    // Implement download logic here
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-6">Report</h1>

        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{report.date}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      report.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDownload(report.id)}
                  disabled={report.status !== "Completed"}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Report;
