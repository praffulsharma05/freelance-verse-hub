
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Search, UserPlus, Filter } from "lucide-react";
import { toast } from "sonner";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock users data (will be replaced with Supabase data)
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Freelancer", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Client", status: "Active" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "Admin", status: "Active" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Freelancer", status: "Inactive" },
    { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "Client", status: "Active" },
  ];
  
  const handleEdit = (id: number) => {
    toast.info(`Editing user ${id}`);
  };
  
  const handleDelete = (id: number) => {
    toast.success(`User ${id} deleted`);
  };
  
  const handleCreateUser = () => {
    toast.info("Create user feature will be implemented");
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button onClick={handleCreateUser} className="bg-colancer-purple hover:bg-colancer-darkpurple">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="rounded-md border">
        <div className="p-4 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === "Admin" 
                      ? "bg-purple-100 text-purple-800" 
                      : user.role === "Freelancer"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(user.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 5 of 100 users
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
