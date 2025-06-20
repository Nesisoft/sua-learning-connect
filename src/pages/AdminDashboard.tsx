import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Shield, DollarSign, AlertTriangle, LogOut, Settings, BarChart3, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalParents: 245,
    totalTutors: 89,
    activeLessons: 156,
    pendingVerifications: 12,
    monthlyRevenue: 12450,
    disputesOpen: 3
  };

  const pendingTutors = [
    { id: 1, name: "Dr. Ama Serwaa", subject: "Mathematics", experience: "8 years", submitted: "2 days ago" },
    { id: 2, name: "Mr. Kofi Mensah", subject: "Physics", experience: "5 years", submitted: "1 day ago" },
    { id: 3, name: "Ms. Grace Osei", subject: "English", experience: "6 years", submitted: "3 hours ago" }
  ];

  const recentDisputes = [
    { id: 1, type: "Payment", parent: "John Doe", tutor: "Ms. Akosua", status: "Open", priority: "High" },
    { id: 2, type: "Scheduling", parent: "Mary Smith", tutor: "Dr. Kwame", status: "In Review", priority: "Medium" },
    { id: 3, type: "Quality", parent: "Peter Wilson", tutor: "Mr. Samuel", status: "Resolved", priority: "Low" }
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
              <Badge variant="outline" className="bg-red-50 text-red-700">Admin</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Administrator</span>
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
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "verification" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("verification")}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Tutor Verification
            </Button>
            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-4 w-4 mr-2" />
              User Management
            </Button>
            <Button
              variant={activeTab === "disputes" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("disputes")}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Disputes
            </Button>
            <Button
              variant={activeTab === "payments" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("payments")}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Payments
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600">Parents</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalParents}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600">Tutors</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalTutors}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600">Active Lessons</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.activeLessons}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <UserCheck className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.pendingVerifications}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600">Revenue</p>
                        <p className="text-lg font-bold text-gray-900">GHS {stats.monthlyRevenue}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600">Disputes</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.disputesOpen}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Signups</CardTitle>
                      <CardDescription>Latest user registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-sm text-gray-600">Parent • 2 hours ago</p>
                          </div>
                          <Badge variant="outline">New</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Dr. Kwame Asante</p>
                            <p className="text-sm text-gray-600">Tutor • 5 hours ago</p>
                          </div>
                          <Badge variant="outline" className="bg-yellow-50">Pending</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Michael Osei</p>
                            <p className="text-sm text-gray-600">Parent • 1 day ago</p>
                          </div>
                          <Badge variant="outline" className="bg-green-50">Verified</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Alerts</CardTitle>
                      <CardDescription>Important notifications requiring attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">High Priority Dispute</p>
                            <p className="text-xs text-gray-600">Payment issue requires immediate attention</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <UserCheck className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">12 Tutors Awaiting Verification</p>
                            <p className="text-xs text-gray-600">Review and approve new tutor applications</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Monthly Revenue Target Met</p>
                            <p className="text-xs text-gray-600">This month's revenue exceeded target by 15%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "verification" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-900">Tutor Verification</h1>
                  <Badge variant="outline">{pendingTutors.length} Pending</Badge>
                </div>
                
                <div className="grid gap-6">
                  {pendingTutors.map((tutor) => (
                    <Card key={tutor.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{tutor.name}</CardTitle>
                            <CardDescription>{tutor.subject} • {tutor.experience} experience</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-yellow-50">Pending</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Submitted: {tutor.submitted}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Documents</Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                              Reject
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "disputes" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-900">Dispute Management</h1>
                  <Badge variant="outline">{stats.disputesOpen} Open</Badge>
                </div>
                
                <div className="grid gap-6">
                  {recentDisputes.map((dispute) => (
                    <Card key={dispute.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{dispute.type} Dispute</CardTitle>
                            <CardDescription>
                              Between {dispute.parent} and {dispute.tutor}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge 
                              variant={dispute.priority === "High" ? "destructive" : 
                                      dispute.priority === "Medium" ? "default" : "secondary"}
                            >
                              {dispute.priority}
                            </Badge>
                            <Badge variant="outline">{dispute.status}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button size="sm">View Details</Button>
                          <Button size="sm" variant="outline">Contact Parties</Button>
                          {dispute.status !== "Resolved" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Resolve
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {!["overview", "verification", "disputes"].includes(activeTab) && (
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

export default AdminDashboard;
