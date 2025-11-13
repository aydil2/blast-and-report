import { Radio, FileText, Clipboard, BarChart3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1">
      <div className={isActive ? "text-primary" : "text-foreground"}>
        {icon}
      </div>
      <span className={`text-[10px] ${isActive ? "text-primary" : "text-foreground"}`}>
        {label}
      </span>
    </button>
  );
};

interface BottomNavigationProps {
  currentPage?: "template" | "report" | "broadcast" | "contact";
}

export const BottomNavigation = ({ currentPage = "template" }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active page from route if not explicitly provided
  const activePage = currentPage || 
    (location.pathname === "/report" ? "report" : "template");

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[87px] bg-background rounded-t-[25px] shadow-[0_8px_15px_8px_rgba(0,0,0,0.25)] flex items-center justify-around px-8 max-w-[393px] mx-auto z-30">
      <NavItem 
        icon={<Radio className="w-[30px] h-[30px]" />} 
        label="Broadcast"
        isActive={activePage === "broadcast"}
        onClick={() => navigate("/")}
      />
      <NavItem 
        icon={<FileText className="w-[30px] h-[30px]" strokeWidth={2} />} 
        label="Template" 
        isActive={activePage === "template"}
        onClick={() => navigate("/template")}
      />
      <NavItem 
        icon={<Clipboard className="w-[30px] h-[30px]" />} 
        label="List Contact"
        isActive={activePage === "contact"}
        onClick={() => navigate("/contacts")}
      />
      <NavItem 
        icon={<BarChart3 className="w-[30px] h-[30px]" />} 
        label="Report"
        isActive={activePage === "report"}
        onClick={() => navigate("/report")}
      />
    </div>
  );
};
