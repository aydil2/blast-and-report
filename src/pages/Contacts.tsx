import { useState } from "react";
import { ContactCard } from "@/components/ContactCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = [
    { id: 1, name: "John Doe", phone: "+62 812 3456 7890", label: { text: "VIP", color: "green" as const } },
    { id: 2, name: "Jane Smith", phone: "+62 813 4567 8901", label: { text: "New", color: "yellow" as const } },
    { id: 3, name: "Bob Johnson", phone: "+62 814 5678 9012" },
    { id: 4, name: "Alice Williams", phone: "+62 815 6789 0123", label: { text: "Important", color: "red" as const } },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-6">List Contact</h1>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
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
      <BottomNavigation currentPage="contact" />
    </div>
  );
};

export default Contacts;
