
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Search, FileText, Filter, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useProjectsList } from "@/hooks/use-admin-data";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";

const ProjectManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: projects, isLoading, error, refetch } = useProjectsList();
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filter projects based on search query
  useEffect(() => {
    if (!projects) return;
    
    const filtered = projects.filter(project => 
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredProjects(filtered);
  }, [projects, searchQuery]);
  
  // Show error toast if projects data fails to load
  useEffect(() => {
    if (error) {
      toast.error("Failed to load project data");
      console.error(error);
    }
  }, [error]);
  
  const handleEdit = (id: string) => {
    toast.info(`Editing project ${id}`);
  };
  
  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Project deleted successfully");
      refetch();
    } catch (err: any) {
      toast.error("Failed to delete project: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setIsDeleting(null);
    }
  };
  
  const handleCreateProject = () => {
    toast.info("Create project feature will be implemented");
  };

  const getProjectStatusClass = (status?: string) => {
    switch (status) {
      case 'published':
        return "bg-green-100 text-green-800";
      case 'in_progress':
        return "bg-blue-100 text-blue-800";
      case 'completed':
        return "bg-purple-100 text-purple-800";
      case 'cancelled':
        return "bg-red-100 text-red-800";
      case 'draft':
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Project Management</h2>
        <Button onClick={handleCreateProject} className="bg-colancer-purple hover:bg-colancer-purple/90">
          <FileText className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>
      
      <div className="rounded-md border">
        <div className="p-4 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
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
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No projects found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium max-w-[200px] truncate" title={project.title}>
                      {project.title}
                    </TableCell>
                    <TableCell>{project.profiles?.username || "—"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getProjectStatusClass(project.status)}`}>
                        {project.status || "draft"}
                      </span>
                    </TableCell>
                    <TableCell>${project.budget || 0}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {project.created_at
                        ? formatDistanceToNow(new Date(project.created_at), { addSuffix: true })
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(project.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(project.id)}
                          disabled={isDeleting === project.id}
                        >
                          {isDeleting === project.id ? (
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
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects?.length || 0} projects
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled={filteredProjects.length < 10}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
