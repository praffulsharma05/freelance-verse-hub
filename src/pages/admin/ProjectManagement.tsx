
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Search, Filter, FileText } from "lucide-react";
import { toast } from "sonner";

const ProjectManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock projects data (will be replaced with Supabase data)
  const projects = [
    { 
      id: 1, 
      title: "Website Redesign", 
      client: "ABC Company",
      freelancer: "John Doe",
      budget: "$3,000",
      status: "In Progress",
      deadline: "2025-05-15"
    },
    { 
      id: 2, 
      title: "Mobile App Development", 
      client: "XYZ Corp",
      freelancer: "Jane Smith",
      budget: "$8,500",
      status: "Pending",
      deadline: "2025-06-20"
    },
    { 
      id: 3, 
      title: "Logo Design", 
      client: "123 Industries",
      freelancer: "Emily Davis",
      budget: "$500",
      status: "Completed",
      deadline: "2025-04-10"
    },
    { 
      id: 4, 
      title: "E-commerce Platform", 
      client: "Shop Easy",
      freelancer: "Robert Johnson",
      budget: "$12,000",
      status: "In Progress",
      deadline: "2025-08-01"
    },
    { 
      id: 5, 
      title: "Content Writing", 
      client: "Blog Masters",
      freelancer: "Michael Wilson",
      budget: "$1,200",
      status: "Completed",
      deadline: "2025-04-02"
    }
  ];
  
  const handleEdit = (id: number) => {
    toast.info(`Editing project ${id}`);
  };
  
  const handleDelete = (id: number) => {
    toast.success(`Project ${id} deleted`);
  };
  
  const handleCreateProject = () => {
    toast.info("Create project feature will be implemented");
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Project Management</h2>
        <Button onClick={handleCreateProject} className="bg-colancer-purple hover:bg-colancer-darkpurple">
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
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Freelancer</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{project.freelancer}</TableCell>
                <TableCell>{project.budget}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.deadline}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(project.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
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
            Showing 5 of 42 projects
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

export default ProjectManagement;
