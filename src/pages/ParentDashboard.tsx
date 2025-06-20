import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar, CreditCard, Star, MapPin, LogOut, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const children = [
    { id: 1, name: "Sarah Johnson", grade: "Grade 8", subjects: ["Mathematics", "Science"] },
    { id: 2, name: "Michael Johnson", grade: "Grade 5", subjects: ["English", "Mathematics"] }
  ];

  const upcomingLessons = [
    { id: 1, subject: "Mathematics", tutor: "Dr. Kwame Asante", time: "Today, 4:00 PM", student: "Sarah" },
    { id: 2, subject: "English", tutor: "Ms. Akosua Boateng", time: "Tomorrow, 2:00 PM", student: "Michael" }
  ];

  const tutorRequests = [
    { id: 1, subject: "Physics", grade: "Grade 8", status: "Pending", matches: 3 },
    { id: 2, subject: "French", grade: "Grade 5", status: "In Review", matches: 1 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Sua</span>
              <Badge variant="outline">Parent</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, John Johnson</span>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Users className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "children" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("children")}
            >
              <Users className="h-4 w-4 mr-2" />
              My Children
            </Button>
            <Button
              variant={activeTab === "tutors" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("tutors")}
            >
              <Search className="h-4 w-4 mr-2" />
              Find Tutors
            </Button>
            <Button
              variant={activeTab === "lessons" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("lessons")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Lessons
            </Button>
            <Button
              variant={activeTab === "payments" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("payments")}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Payments
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Children</p>
                          <p className="text-2xl font-bold text-gray-900">{children.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Calendar className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">This Week</p>
                          <p className="text-2xl font-bold text-gray-900">8</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Star className="h-8 w-8 text-yellow-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Active Tutors</p>
                          <p className="text-2xl font-bold text-gray-900">3</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <CreditCard className="h-8 w-8 text-purple-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">This Month</p>
                          <p className="text-2xl font-bold text-gray-900">GHS 450</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Lessons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Lessons</CardTitle>
                    <CardDescription>Your children's scheduled lessons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{lesson.subject} - {lesson.student}</h3>
                            <p className="text-sm text-gray-600">with {lesson.tutor}</p>
                            <p className="text-sm text-gray-500">{lesson.time}</p>
                          </div>
                          <Button size="sm">Join Lesson</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tutor Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tutor Requests</CardTitle>
                    <CardDescription>Your active requests for tutors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tutorRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{request.subject} - {request.grade}</h3>
                            <p className="text-sm text-gray-600">{request.matches} tutor matches found</p>
                          </div>
                          <Badge variant={request.status === "Pending" ? "secondary" : "default"}>
                            {request.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "children" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-900">My Children</h1>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Child
                  </Button>
                </div>
                
                <div className="grid gap-6">
                  {children.map((child) => (
                    <Card key={child.id}>
                      <CardHeader>
                        <CardTitle>{child.name}</CardTitle>
                        <CardDescription>{child.grade}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Current Subjects</p>
                            <div className="flex gap-2">
                              {child.subjects.map((subject) => (
                                <Badge key={subject} variant="outline">{subject}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">View Progress</Button>
                            <Button size="sm" variant="outline">Request Tutor</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {activeTab !== "overview" && activeTab !== "children" && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h2>
                <p className="text-gray-600">This section is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
