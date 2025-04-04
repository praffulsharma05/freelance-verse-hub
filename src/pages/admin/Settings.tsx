
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Settings = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Co-Lancer",
    siteDescription: "A platform for freelancers to collaborate and find work",
    contactEmail: "support@colancer.com",
    enableRegistration: true,
    enableProjects: true,
    maintenanceMode: false,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@colancer.com",
    smtpPassword: "************",
    senderEmail: "noreply@colancer.com",
    senderName: "Co-Lancer",
  });

  const handleSiteSettingsChange = (field: string, value: any) => {
    setSiteSettings({
      ...siteSettings,
      [field]: value
    });
  };
  
  const handleEmailSettingsChange = (field: string, value: string) => {
    setEmailSettings({
      ...emailSettings,
      [field]: value
    });
  };
  
  const handleSaveSettings = (settingType: string) => {
    toast.success(`${settingType} settings saved successfully`);
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Manage your site's general settings and configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={siteSettings.siteName}
                  onChange={(e) => handleSiteSettingsChange('siteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={siteSettings.siteDescription}
                  onChange={(e) => handleSiteSettingsChange('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={siteSettings.contactEmail}
                  onChange={(e) => handleSiteSettingsChange('contactEmail', e.target.value)}
                />
              </div>
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-registration">Enable User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register on the platform
                    </p>
                  </div>
                  <Switch
                    id="enable-registration"
                    checked={siteSettings.enableRegistration}
                    onCheckedChange={(checked) => handleSiteSettingsChange('enableRegistration', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-projects">Enable Projects</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to create and apply to projects
                    </p>
                  </div>
                  <Switch
                    id="enable-projects"
                    checked={siteSettings.enableProjects}
                    onCheckedChange={(checked) => handleSiteSettingsChange('enableProjects', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the site in maintenance mode (only admins can access)
                    </p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={siteSettings.maintenanceMode}
                    onCheckedChange={(checked) => handleSiteSettingsChange('maintenanceMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button 
                className="bg-colancer-purple hover:bg-colancer-darkpurple"
                onClick={() => handleSaveSettings('General')}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure your email server settings for notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={emailSettings.smtpHost}
                    onChange={(e) => handleEmailSettingsChange('smtpHost', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={emailSettings.smtpPort}
                    onChange={(e) => handleEmailSettingsChange('smtpPort', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => handleEmailSettingsChange('smtpUsername', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => handleEmailSettingsChange('smtpPassword', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sender-email">Sender Email</Label>
                  <Input
                    id="sender-email"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) => handleEmailSettingsChange('senderEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sender-name">Sender Name</Label>
                  <Input
                    id="sender-name"
                    value={emailSettings.senderName}
                    onChange={(e) => handleEmailSettingsChange('senderName', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <Button variant="outline">Test Email Connection</Button>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button 
                className="bg-colancer-purple hover:bg-colancer-darkpurple"
                onClick={() => handleSaveSettings('Email')}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage security settings and authentication options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for admin logins
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-attempts">Maximum Login Attempts</Label>
                    <p className="text-sm text-muted-foreground">
                      Number of failed login attempts before account lockout
                    </p>
                  </div>
                  <Input id="login-attempts" type="number" defaultValue="5" className="w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <p className="text-sm text-muted-foreground">
                      Days before users are required to change their password
                    </p>
                  </div>
                  <Input id="password-expiry" type="number" defaultValue="90" className="w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Minutes of inactivity before automatic logout
                    </p>
                  </div>
                  <Input id="session-timeout" type="number" defaultValue="30" className="w-20" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button 
                className="bg-colancer-purple hover:bg-colancer-darkpurple"
                onClick={() => handleSaveSettings('Security')}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Stripe API Key</Label>
                <div className="flex gap-2">
                  <Input type="password" defaultValue="sk_test_*****************" className="flex-1" />
                  <Button variant="outline">Reveal</Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>OpenAI API Key</Label>
                <div className="flex gap-2">
                  <Input type="password" defaultValue="sk_*****************" className="flex-1" />
                  <Button variant="outline">Reveal</Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Public API Key</Label>
                <div className="flex gap-2">
                  <Input defaultValue="pk_colancer_public_9a7b3c4d5e6f" className="flex-1" />
                  <Button variant="outline">Copy</Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button 
                className="bg-colancer-purple hover:bg-colancer-darkpurple"
                onClick={() => handleSaveSettings('API')}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
