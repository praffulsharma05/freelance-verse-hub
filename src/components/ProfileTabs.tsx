
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Star, Plus, Briefcase, BookOpen, Award, Wallet } from "lucide-react";

const ProfileTabs = () => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
        <TabsTrigger value="about" className="text-xs md:text-sm">About Me</TabsTrigger>
        <TabsTrigger value="portfolio" className="text-xs md:text-sm">Portfolio</TabsTrigger>
        <TabsTrigger value="experience" className="text-xs md:text-sm">Experience</TabsTrigger>
        <TabsTrigger value="education" className="text-xs md:text-sm">Education</TabsTrigger>
        <TabsTrigger value="reviews" className="text-xs md:text-sm">Reviews</TabsTrigger>
        <TabsTrigger value="wallet" className="text-xs md:text-sm">Wallet</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>About Me</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
              {editMode ? "Save" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <Textarea 
                className="min-h-[200px]" 
                defaultValue="I'm a passionate freelance developer with 5+ years of experience in web and mobile development. Specialized in React, React Native, and Node.js."
              />
            ) : (
              <p className="text-gray-700">
                I'm a passionate freelance developer with 5+ years of experience in web and mobile development. Specialized in React, React Native, and Node.js.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="portfolio" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="card-hover">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                      <span className="text-gray-400">Project {item} Image</span>
                    </div>
                    <h4 className="font-medium">Project Title {item}</h4>
                    <p className="text-sm text-gray-500 mt-1">Brief project description goes here. This project showcases my skills in UI development.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="experience" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Experience</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-2 border-colancer-purple pl-4 pb-6 relative">
                <div className="absolute w-3 h-3 bg-colancer-purple rounded-full -left-[7px] top-1"></div>
                <h4 className="font-medium">Senior Frontend Developer</h4>
                <p className="text-sm text-gray-500">ABC Tech • 2022 - Present</p>
                <p className="mt-2">Developed responsive web applications using React and TypeScript. Led a team of 3 junior developers.</p>
              </div>
              
              <div className="border-l-2 border-colancer-purple pl-4 pb-6 relative">
                <div className="absolute w-3 h-3 bg-colancer-purple rounded-full -left-[7px] top-1"></div>
                <h4 className="font-medium">Frontend Developer</h4>
                <p className="text-sm text-gray-500">XYZ Software • 2019 - 2022</p>
                <p className="mt-2">Worked on various client projects using JavaScript frameworks including React and Vue.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="education" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Education & Qualifications</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-2 border-colancer-purple pl-4 pb-6 relative">
                <div className="absolute w-3 h-3 bg-colancer-purple rounded-full -left-[7px] top-1"></div>
                <h4 className="font-medium">Bachelor of Computer Science</h4>
                <p className="text-sm text-gray-500">University of Technology • 2015 - 2019</p>
                <p className="mt-2">Specialized in Software Development with honors.</p>
              </div>
              
              <div className="border-l-2 border-colancer-purple pl-4 pb-6 relative">
                <div className="absolute w-3 h-3 bg-colancer-purple rounded-full -left-[7px] top-1"></div>
                <h4 className="font-medium">AWS Certified Developer</h4>
                <p className="text-sm text-gray-500">Amazon Web Services • 2021</p>
                <p className="mt-2">Professional certification for AWS cloud development.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Client Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">5.0</span>
                </div>
                <p className="text-gray-700">"Excellent work! Delivered the project on time and with superb quality. Highly recommended."</p>
                <p className="mt-2 text-sm text-gray-500">- John D., Project Manager</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                  <span className="ml-2 text-sm font-medium">4.0</span>
                </div>
                <p className="text-gray-700">"Great communication and solid development skills. Would work with again."</p>
                <p className="mt-2 text-sm text-gray-500">- Sarah M., Startup Founder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="wallet" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>My Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-6 rounded-lg mb-6 text-center">
              <h3 className="text-gray-600 mb-2">ECA Coins Balance</h3>
              <div className="flex items-center justify-center gap-2">
                <Wallet className="text-orange-400" />
                <span className="text-4xl font-bold text-green-600">0</span>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">
                ECAcoins
              </Button>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-4">Transaction History</h4>
              <div className="text-center text-gray-500 py-8">
                <p>No transactions yet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
