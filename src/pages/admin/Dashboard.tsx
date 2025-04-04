
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, FileText, Settings, BarChart3, DollarSign } from "lucide-react";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for dashboard (will be replaced with actual data from Supabase)
  const stats = [
    { 
      title: "Total Users",
      value: "1,234",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
      change: "+12%",
      trend: "up"
    },
    { 
      title: "New Freelancers",
      value: "321",
      icon: <UserPlus className="h-5 w-5 text-muted-foreground" />,
      change: "+18%",
      trend: "up"
    },
    { 
      title: "Active Projects", 
      value: "543",
      icon: <FileText className="h-5 w-5 text-muted-foreground" />,
      change: "+7%",
      trend: "up"
    },
    { 
      title: "Revenue",
      value: "$12,345",
      icon: <DollarSign className="h-5 w-5 text-muted-foreground" />,
      change: "+24%",
      trend: "up"
    }
  ];

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
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
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
                  Latest user activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((_, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-slate-500">{30 - i * 7} minutes ago</p>
                      </div>
                    </li>
                  ))}
                </ul>
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
