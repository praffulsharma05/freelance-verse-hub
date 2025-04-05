
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Search, UserPlus, Filter, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUsersList } from "@/hooks/use-admin-data";
import { supabase } from "@/integrations/supabase/client";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Profile } from '@/types/supabase';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: users, isLoading, error, refetch } = useUsersList();
  const [filteredUsers, setFilteredUsers] = useState<Profile[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<Profile | null>(null);
  const [editRole, setEditRole] = useState<string>("");

  // Filter users based on search query
  useEffect(() => {
    if (!users) return;
    
    const filtered = users.filter(user => 
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredUsers(filtered);
  }, [users, searchQuery]);
  
  // Show error toast if users data fails to load
  useEffect(() => {
    if (error) {
      toast.error("Failed to load user data");
      console.error(error);
    }
  }, [error]);
  
  const handleEdit = (user: Profile) => {
    setEditUser(user);
    setEditRole(user.role || 'freelancer');
  };
  
  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("User deleted successfully");
      refetch();
    } catch (err: any) {
      toast.error("Failed to delete user: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleUpdateRole = async () => {
    if (!editUser || !editRole) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: editRole as any })
        .eq('id', editUser.id);
      
      if (error) throw error;
      
      toast.success("User role updated successfully");
      setEditUser(null);
      refetch();
    } catch (err: any) {
      toast.error("Failed to update user role: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };
  
  const handleCreateUser = () => {
    toast.info("Create user feature will be implemented");
  };

  const getUserStatusClass = (role?: string) => {
    switch (role) {
      case 'admin':
        return "bg-purple-100 text-purple-800";
      case 'freelancer':
        return "bg-blue-100 text-blue-800";
      case 'client':
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button onClick={handleCreateUser} className="bg-colancer-purple hover:bg-colancer-purple/90">
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
              <TableHead>User ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.id.substring(0, 8)}...</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.full_name || "—"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getUserStatusClass(user.role)}`}>
                      {user.role || "freelancer"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog open={editUser?.id === user.id} onOpenChange={(open) => !open && setEditUser(null)}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User Role</DialogTitle>
                            <DialogDescription>
                              Change the role for user {user.username || user.id}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="role">User Role</Label>
                                <Select value={editRole} onValueChange={setEditRole}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="freelancer">Freelancer</SelectItem>
                                    <SelectItem value="client">Client</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditUser(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateRole} className="bg-colancer-purple hover:bg-colancer-purple/90">
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(user.id)}
                        disabled={isDeleting === user.id}
                      >
                        {isDeleting === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users?.length || 0} users
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled={filteredUsers.length < 10}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
