
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, FileText, Settings, BarChart3, DollarSign, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAdminStats, useRecentActivities } from "@/hooks/use-admin-data";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useAdminStats();
  const { data: activities, isLoading: activitiesLoading, error: activitiesError } = useRecentActivities();
  
  useEffect(() => {
    if (statsError) {
      toast.error("Failed to load dashboard statistics");
      console.error(statsError);
    }
    if (activitiesError) {
      toast.error("Failed to load recent activities");
      console.error(activitiesError);
    }
  }, [statsError, activitiesError]);
  
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center gap-4">
          <Link to="/admin/settings">
            <Settings className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-colancer-purple" />
          </Link>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <Card key={i} className="flex items-center justify-center p-6">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </Card>
              ))
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats?.usersCount || 0}</div>
                    <p className="text-xs text-green-500">
                      {stats?.freelancerCount || 0} freelancers, {stats?.clientCount || 0} clients
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Freelancers</CardTitle>
                    <UserPlus className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats?.freelancerCount || 0}</div>
                    <p className="text-xs text-green-500">
                      {Math.round((stats?.freelancerCount || 0) / (stats?.usersCount || 1) * 100)}% of users
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats?.projectsCount || 0}</div>
                    <p className="text-xs text-green-500">
                      {(stats?.projectsCount || 0) > 0 ? "Projects in progress" : "No active projects"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats?.totalBalance || 0}</div>
                    <p className="text-xs text-green-500">
                      Platform total balance
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                  User signups and activity over time
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
                  <BarChart3 className="h-16 w-16 text-slate-300" />
                  <span className="ml-2 text-slate-400">Chart will load here</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Latest platform activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activitiesLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {activities?.map((activity) => (
                      <li key={`${activity.type}-${activity.id}`} className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                          {activity.type === 'project' ? (
                            <FileText className="h-4 w-4 text-slate-500" />
                          ) : (
                            <Users className="h-4 w-4 text-slate-500" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {activity.type === 'project' 
                              ? `New project: ${activity.title}`
                              : `New user: ${activity.username}`}
                          </p>
                          <p className="text-xs text-slate-500">
                            {activity.created_at 
                              ? formatDistanceToNow(new Date(activity.created_at), { addSuffix: true }) 
                              : 'Recently'}
                          </p>
                        </div>
                      </li>
                    )) || (
                      <p className="text-center text-sm text-muted-foreground py-4">No recent activities</p>
                    )}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed analytics information will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics features will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Reports features will be implemented here</p>
        </TabsContent>
        
        <TabsContent value="notifications" className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Notifications features will be implemented here</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
