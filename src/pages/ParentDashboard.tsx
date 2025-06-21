
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Users, Calendar, CreditCard, Star, MapPin, LogOut, Plus, Search, Clock, Filter, DollarSign, CheckCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import StudentProgressModal from "@/components/StudentProgressModal";
import RequestTutorModal from "@/components/RequestTutorModal";
import AddChildModal from "@/components/AddChildModal";

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const [children, setChildren] = useState([
    { id: 1, name: "Sarah Johnson", grade: "Grade 8", subjects: ["Mathematics", "Science"] },
    { id: 2, name: "Michael Johnson", grade: "Grade 5", subjects: ["English", "Mathematics"] }
  ]);

  const upcomingLessons = [
    { id: 1, subject: "Mathematics", tutor: "Dr. Kwame Asante", time: "Today, 4:00 PM", student: "Sarah", status: "confirmed" },
    { id: 2, subject: "English", tutor: "Ms. Akosua Boateng", time: "Tomorrow, 2:00 PM", student: "Michael", status: "confirmed" },
    { id: 3, subject: "Science", tutor: "Prof. Yaw Mensah", time: "Friday, 3:00 PM", student: "Sarah", status: "pending" }
  ];

  const tutorRequests = [
    { id: 1, subject: "Physics", grade: "Grade 8", status: "Pending", matches: 3 },
    { id: 2, subject: "French", grade: "Grade 5", status: "In Review", matches: 1 }
  ];

  const payments = [
    { id: 1, date: "2024-01-15", tutor: "Dr. Kwame Asante", subject: "Mathematics", amount: 120, status: "paid" },
    { id: 2, date: "2024-01-10", tutor: "Ms. Akosua Boateng", subject: "English", amount: 90, status: "paid" },
    { id: 3, date: "2024-01-05", tutor: "Prof. Yaw Mensah", subject: "Science", amount: 150, status: "pending" }
  ];

  const mockTutors = [
    {
      id: 1,
      name: "Dr. Kwame Asante",
      subjects: ["Mathematics", "Physics"],
      rating: 4.9,
      reviews: 45,
      experience: "8 years",
      location: "Accra",
      rate: "GHS 80/hour",
      availability: "Available"
    },
    {
      id: 2,
      name: "Ms. Akosua Boateng",
      subjects: ["English", "Literature"],
      rating: 4.8,
      reviews: 32,
      experience: "5 years",
      location: "Kumasi",
      rate: "GHS 60/hour",
      availability: "Available"
    }
  ];

  const handleViewProgress = (child: any) => {
    setSelectedChild({
      ...child,
      subject: child.subjects[0] || "Mathematics",
      progress: Math.floor(Math.random() * 40) + 60
    });
    setShowProgressModal(true);
  };

  const handleRequestTutor = (child: any) => {
    setSelectedChild(child);
    setShowRequestModal(true);
  };

  const handleAddChild = (newChild: any) => {
    setChildren(prev => [...prev, newChild]);
  };

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
                  <Button onClick={() => setShowAddChildModal(true)}>
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
                              {child.subjects.length > 0 ? child.subjects.map((subject) => (
                                <Badge key={subject} variant="outline">{subject}</Badge>
                              )) : <span className="text-gray-500">No subjects added yet</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleViewProgress(child)}>View Progress</Button>
                            <Button size="sm" variant="outline" onClick={() => handleRequestTutor(child)}>Request Tutor</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tutors" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Find Tutors</h1>
                
                {/* Search and Filters */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="search">Search Tutors</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="search"
                            placeholder="Name or subject..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accra">Accra</SelectItem>
                            <SelectItem value="kumasi">Kumasi</SelectItem>
                            <SelectItem value="tema">Tema</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button className="w-full">
                          <Filter className="h-4 w-4 mr-2" />
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tutors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockTutors.map((tutor) => (
                    <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-8 w-8 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{tutor.name}</h3>
                            <p className="text-sm text-gray-600">{tutor.experience} experience</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Subjects</p>
                            <div className="flex flex-wrap gap-1">
                              {tutor.subjects.map((subject) => (
                                <Badge key={subject} variant="outline" className="text-xs">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span>{tutor.rating}</span>
                              <span className="text-gray-500">({tutor.reviews} reviews)</span>
                            </div>
                            <Badge variant={tutor.availability === "Available" ? "default" : "secondary"}>
                              {tutor.availability}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{tutor.location}</span>
                            </div>
                            <span className="font-semibold text-green-600">{tutor.rate}</span>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1">View Profile</Button>
                            <Button size="sm" variant="outline" className="flex-1">Book Lesson</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "lessons" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Lessons Schedule</h1>
                
                <div className="grid gap-6">
                  {upcomingLessons.map((lesson) => (
                    <Card key={lesson.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{lesson.subject}</h3>
                              <p className="text-sm text-gray-600">with {lesson.tutor}</p>
                              <p className="text-sm text-gray-500">Student: {lesson.student}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <Clock className="h-4 w-4 mr-1" />
                              {lesson.time}
                            </div>
                            <Badge variant={lesson.status === "confirmed" ? "default" : "secondary"}>
                              {lesson.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm">Join Lesson</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Payments</CardTitle>
                    <CardDescription>Your payment history and invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{payment.subject} Lesson</h3>
                              <p className="text-sm text-gray-600">with {payment.tutor}</p>
                              <p className="text-sm text-gray-500">{payment.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">GHS {payment.amount}</div>
                            <div className="flex items-center gap-2">
                              <Badge variant={payment.status === "paid" ? "default" : "secondary"}>
                                {payment.status === "paid" ? (
                                  <><CheckCircle className="h-3 w-3 mr-1" /> Paid</>
                                ) : (
                                  <><Clock className="h-3 w-3 mr-1" /> Pending</>
                                )}
                              </Badge>
                              <Button size="sm" variant="outline">Invoice</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-2">GHS 360</div>
                      <div className="text-sm text-gray-600">Paid This Month</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-2">GHS 150</div>
                      <div className="text-sm text-gray-600">Pending Payment</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">GHS 1,240</div>
                      <div className="text-sm text-gray-600">Total Paid</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedChild && (
        <StudentProgressModal
          isOpen={showProgressModal}
          onClose={() => setShowProgressModal(false)}
          student={selectedChild}
        />
      )}

      {selectedChild && (
        <RequestTutorModal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          childName={selectedChild.name}
        />
      )}

      <AddChildModal
        isOpen={showAddChildModal}
        onClose={() => setShowAddChildModal(false)}
        onChildAdded={handleAddChild}
      />
    </div>
  );
};

export default ParentDashboard;
