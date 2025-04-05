
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Profile, Project, UserRole } from "@/types/supabase";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      console.log("Fetching admin stats");
      // Get total users count
      const { count: usersCount, error: usersError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      
      if (usersError) {
        console.error("Error fetching users:", usersError);
        throw new Error(`Error fetching users: ${usersError.message}`);
      }
      
      // Get freelancer count
      const { count: freelancerCount, error: freelancerError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "freelancer");
      
      if (freelancerError) {
        console.error("Error fetching freelancers:", freelancerError);
        throw new Error(`Error fetching freelancers: ${freelancerError.message}`);
      }
      
      // Get client count
      const { count: clientCount, error: clientError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "client");
      
      if (clientError) {
        console.error("Error fetching clients:", clientError);
        throw new Error(`Error fetching clients: ${clientError.message}`);
      }
      
      // Get projects count
      const { count: projectsCount, error: projectsError } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });
      
      if (projectsError) {
        console.error("Error fetching projects:", projectsError);
        throw new Error(`Error fetching projects: ${projectsError.message}`);
      }
      
      // Get wallet total (as a proxy for revenue)
      const { data: wallets, error: walletsError } = await supabase
        .from("wallets")
        .select("balance");
      
      if (walletsError) {
        console.error("Error fetching wallets:", walletsError);
        throw new Error(`Error fetching wallets: ${walletsError.message}`);
      }
      
      const totalBalance = wallets?.reduce((sum, wallet) => sum + (wallet.balance || 0), 0) || 0;
      
      console.log("Admin stats fetched:", {
        usersCount,
        freelancerCount,
        clientCount,
        projectsCount,
        totalBalance
      });
      
      return {
        usersCount: usersCount || 0,
        freelancerCount: freelancerCount || 0,
        clientCount: clientCount || 0,
        projectsCount: projectsCount || 0,
        totalBalance
      };
    }
  });
}

export function useUsersList() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      console.log("Fetching users list");
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (error) {
        console.error("Error fetching users list:", error);
        throw new Error(`Error fetching users: ${error.message}`);
      }
      
      console.log("Users list fetched:", data);
      return data as Profile[];
    }
  });
}

export function useProjectsList() {
  return useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      console.log("Fetching projects list");
      const { data, error } = await supabase
        .from("projects")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (error) {
        console.error("Error fetching projects list:", error);
        throw new Error(`Error fetching projects: ${error.message}`);
      }
      
      console.log("Projects list fetched:", data);
      return data as (Project & { profiles: { username: string } })[];
    }
  });
}

export function useRecentActivities() {
  return useQuery({
    queryKey: ["admin-activities"],
    queryFn: async () => {
      console.log("Fetching recent activities");
      // Get recent projects
      const { data: projects, error: projectsError } = await supabase
        .from("projects")
        .select("id, title, client_id, created_at, profiles(username)")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (projectsError) {
        console.error("Error fetching recent projects:", projectsError);
        throw new Error(`Error fetching recent projects: ${projectsError.message}`);
      }

      // Get recent users
      const { data: users, error: usersError } = await supabase
        .from("profiles")
        .select("id, username, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (usersError) {
        console.error("Error fetching recent users:", usersError);
        throw new Error(`Error fetching recent users: ${usersError.message}`);
      }
      
      // Combine and sort by date
      const activities = [
        ...(projects || []).map(project => ({
          type: 'project' as const,
          id: project.id,
          title: project.title,
          username: project.profiles?.username || 'Unknown',
          created_at: project.created_at
        })),
        ...(users || []).map(user => ({
          type: 'user' as const,
          id: user.id,
          username: user.username,
          created_at: user.created_at
        }))
      ].sort((a, b) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      ).slice(0, 5);
      
      console.log("Recent activities fetched:", activities);
      
      return activities;
    }
  });
}
