import { useState } from "react";
import { ContactCard } from "@/components/ContactCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import { AddContactDialog } from "@/components/AddContactDialog";
import { FilterContactDialog } from "@/components/FilterContactDialog";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const contacts = [
    { id: 1, name: "John Doe", phone: "+62 812 3456 7890", label: { text: "VIP", color: "green" as const } },
    { id: 2, name: "Jane Smith", phone: "+62 813 4567 8901", label: { text: "New", color: "yellow" as const } },
    { id: 3, name: "Bob Johnson", phone: "+62 814 5678 9012" },
    { id: 4, name: "Alice Williams", phone: "+62 815 6789 0123", label: { text: "Important", color: "red" as const } },
  ];

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);
    
    const matchesFilter = selectedFilter.length === 0 || 
      (contact.label && selectedFilter.includes(contact.label.text));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">List Contact</h1>
          <Button variant="default" size="sm" className="gap-2 bg-gradient-to-r from-[#45E3FF] to-[#147FEB] hover:opacity-90" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilterDialog(true)}>
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                name={contact.name}
                phone={contact.phone}
                label={contact.label}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No contacts found
            </div>
          )}
        </div>
      </div>
      
      <AddContactDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <FilterContactDialog 
        open={showFilterDialog} 
        onOpenChange={setShowFilterDialog}
        selectedFilters={selectedFilter}
        onFiltersChange={setSelectedFilter}
      />
      
      <BottomNavigation currentPage="contact" />
    </div>
  );
};

export default Contacts;
