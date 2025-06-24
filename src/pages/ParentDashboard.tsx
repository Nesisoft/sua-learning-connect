import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Users, Calendar, CreditCard, Star, MapPin, LogOut, Plus, Search, Clock, Filter, DollarSign, CheckCircle, X, Video, Menu, Phone, MessageSquare, MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import StudentProgressModal from "@/components/StudentProgressModal";
import RequestTutorModal from "@/components/RequestTutorModal";
import AddChildModal from "@/components/AddChildModal";
import RescheduleModal from "@/components/RescheduleModal";
import JoinLessonModal from "@/components/JoinLessonModal";
import PaymentModal from "@/components/PaymentModal";
import TutorProfileModal from "@/components/TutorProfileModal";
import BookLessonModal from "@/components/BookLessonModal";
import InvoiceModal from "@/components/InvoiceModal";
import { toast } from "sonner";

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showJoinLessonModal, setShowJoinLessonModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTutorProfileModal, setShowTutorProfileModal] = useState(false);
  const [showBookLessonModal, setShowBookLessonModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Mock data
  const [children, setChildren] = useState([
    { id: 1, name: "Sarah Johnson", grade: "Grade 8", subjects: ["Mathematics", "Science"] },
    { id: 2, name: "Michael Johnson", grade: "Grade 5", subjects: ["English", "Mathematics"] }
  ]);

  const ongoingLessons = [
    { id: 1, subject: "Mathematics", tutor: "Dr. Kwame Asante", student: "Sarah", location: "Home Visit", startTime: "3:30 PM", status: "In Progress", duration: "45 mins" },
    { id: 2, subject: "English", tutor: "Ms. Akosua Boateng", student: "Michael", location: "Virtual", startTime: "2:00 PM", status: "In Progress", duration: "60 mins" }
  ];

  const todaysLessons = [
    { id: 1, subject: "Mathematics", tutor: "Dr. Kwame Asante", time: "4:00 PM", student: "Sarah", status: "confirmed", location: "Home Visit" },
    { id: 2, subject: "Science", tutor: "Prof. Yaw Mensah", time: "6:00 PM", student: "Sarah", status: "confirmed", location: "Virtual" }
  ];

  const upcomingLessons = [
    { id: 1, subject: "English", tutor: "Ms. Akosua Boateng", time: "Tomorrow, 2:00 PM", student: "Michael", status: "confirmed", location: "Virtual" },
    { id: 2, subject: "Science", tutor: "Prof. Yaw Mensah", time: "Friday, 3:00 PM", student: "Sarah", status: "pending", location: "Home Visit" }
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

  const allTutors = [
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
    },
    {
      id: 3,
      name: "Prof. Yaw Mensah",
      subjects: ["Chemistry", "Biology", "Science"],
      rating: 4.7,
      reviews: 28,
      experience: "12 years",
      location: "Tema",
      rate: "GHS 90/hour",
      availability: "Busy"
    },
    {
      id: 4,
      name: "Dr. Ama Adjei",
      subjects: ["Mathematics", "Statistics"],
      rating: 4.9,
      reviews: 52,
      experience: "10 years",
      location: "Accra",
      rate: "GHS 85/hour",
      availability: "Available"
    }
  ];

  // Filter tutors based on search term, subject, and location
  const filteredTutors = allTutors.filter(tutor => {
    const matchesSearch = searchTerm === "" || 
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === "" || selectedSubject === "all" ||
      tutor.subjects.some(subject => subject.toLowerCase() === selectedSubject.toLowerCase());
    
    const matchesLocation = selectedLocation === "" || selectedLocation === "all" ||
      tutor.location.toLowerCase() === selectedLocation.toLowerCase();

    return matchesSearch && matchesSubject && matchesLocation;
  });

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

  const handleRescheduleLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setShowRescheduleModal(true);
  };

  const handleStartLesson = (lesson: any) => {
    console.log("Starting lesson:", lesson);
    toast.success(`Starting ${lesson.subject} lesson with ${lesson.tutor}!`);
    
    setTimeout(() => {
      if (lesson.location === "Virtual") {
        toast.info("Connecting to virtual classroom...");
      } else {
        toast.info("Tutor will arrive shortly for home visit");
      }
    }, 1000);
  };

  const handleMakePayment = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handleViewTutorProfile = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowTutorProfileModal(true);
  };

  const handleBookTutorLesson = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowBookLessonModal(true);
  };

  const handleViewInvoice = (payment: any) => {
    setSelectedInvoice(payment);
    setShowInvoiceModal(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSubject("");
    setSelectedLocation("");
  };

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "children", label: "My Children", icon: Users },
    { id: "tutors", label: "Find Tutors", icon: Search },
    { id: "lessons", label: "Lessons", icon: Calendar },
    { id: "payments", label: "Payments", icon: CreditCard }
  ];

  const handleJoinOngoingLesson = (lesson: any) => {
    console.log("Joining ongoing lesson:", lesson);
    if (lesson.location === "Virtual") {
      toast.success(`Joining virtual lesson with ${lesson.tutor}`);
      setTimeout(() => {
        toast.info("Connected to virtual classroom");
      }, 1000);
    } else {
      toast.info("Connecting to home visit tutor...");
    }
  };

  const handleContactTutor = (lesson: any) => {
    console.log("Contacting tutor:", lesson);
    toast.success(`Calling ${lesson.tutor}...`);
  };

  const handleEndLesson = (lesson: any) => {
    console.log("Ending lesson:", lesson);
    toast.success(`Lesson with ${lesson.tutor} has been ended`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Sua</span>
              <Badge variant="outline" className="hidden sm:inline-flex">Parent</Badge>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-sm sm:text-base text-gray-700 hidden sm:block">Welcome, John Johnson</span>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-4 lg:gap-8">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:bg-transparent lg:border-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:block`}>
            <div className="flex flex-col h-full pt-16 lg:pt-0">
              <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                        <div className="ml-3 sm:ml-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-600">Children</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">{children.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center">
                        <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                        <div className="ml-3 sm:ml-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-600">This Week</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">8</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center">
                        <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                        <div className="ml-3 sm:ml-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-600">Active Tutors</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">3</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center">
                        <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                        <div className="ml-3 sm:ml-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">GHS 450</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Ongoing Lessons */}
                {ongoingLessons.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">Ongoing Lessons</CardTitle>
                      <CardDescription>Lessons currently in progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {ongoingLessons.map((lesson) => (
                          <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200 space-y-3 sm:space-y-0">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-sm sm:text-base">{lesson.subject} - {lesson.student}</h3>
                                <Badge variant="default" className="bg-green-600 text-xs">
                                  {lesson.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.location}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">with {lesson.tutor}</p>
                              <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500 mt-1">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Started: {lesson.startTime}
                                </span>
                                <span className="flex items-center">
                                  {lesson.location === "Virtual" ? <Video className="h-4 w-4 mr-1" /> : <MapPinIcon className="h-4 w-4 mr-1" />}
                                  {lesson.location}
                                </span>
                                <span>Duration: {lesson.duration}</span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              {lesson.location === "Virtual" ? (
                                <Button size="sm" onClick={() => handleJoinOngoingLesson(lesson)} className="w-full sm:w-auto text-xs">
                                  <Video className="h-4 w-4 mr-1" />
                                  Join Now
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" onClick={() => handleContactTutor(lesson)} className="w-full sm:w-auto text-xs">
                                  <Phone className="h-4 w-4 mr-1" />
                                  Call Tutor
                                </Button>
                              )}
                              <Button size="sm" variant="outline" onClick={() => handleContactTutor(lesson)} className="w-full sm:w-auto text-xs">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Today's Lessons */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Today's Lessons</CardTitle>
                    <CardDescription>Your children's lessons scheduled for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaysLessons.map((lesson) => (
                        <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-sm sm:text-base">{lesson.subject} - {lesson.student}</h3>
                              <Badge variant="outline" className="text-xs">
                                {lesson.location}
                              </Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">with {lesson.tutor}</p>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4" />
                              <span>Today, {lesson.time}</span>
                              <span className="flex items-center">
                                {lesson.location === "Virtual" ? <Video className="h-4 w-4 ml-2 mr-1" /> : <MapPinIcon className="h-4 w-4 ml-2 mr-1" />}
                                {lesson.location}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs flex-1 sm:flex-none"
                              onClick={() => handleRescheduleLesson(lesson)}
                            >
                              Reschedule
                            </Button>
                            <Button 
                              size="sm" 
                              className="text-xs flex-1 sm:flex-none"
                              onClick={() => handleStartLesson(lesson)}
                            >
                              Start Lesson
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Lessons */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Upcoming Lessons</CardTitle>
                    <CardDescription>Your children's scheduled lessons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-sm sm:text-base">{lesson.subject} - {lesson.student}</h3>
                              <Badge variant="outline" className="text-xs">
                                {lesson.location}
                              </Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">with {lesson.tutor}</p>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4" />
                              <span>{lesson.time}</span>
                              <span className="flex items-center">
                                {lesson.location === "Virtual" ? <Video className="h-4 w-4 ml-2 mr-1" /> : <MapPinIcon className="h-4 w-4 ml-2 mr-1" />}
                                {lesson.location}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs flex-1 sm:flex-none"
                              onClick={() => handleRescheduleLesson(lesson)}
                            >
                              Reschedule
                            </Button>
                            <Button 
                              size="sm" 
                              className="text-xs flex-1 sm:flex-none"
                              onClick={() => handleStartLesson(lesson)}
                            >
                              Start Lesson
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tutor Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Tutor Requests</CardTitle>
                    <CardDescription>Your active requests for tutors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tutorRequests.map((request) => (
                        <div key={request.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">{request.subject} - {request.grade}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{request.matches} tutor matches found</p>
                          </div>
                          <Badge variant={request.status === "Pending" ? "secondary" : "default"} className="w-fit">
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Children</h1>
                  <Button onClick={() => setShowAddChildModal(true)} className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Child
                  </Button>
                </div>
                
                <div className="grid gap-6">
                  {children.map((child) => (
                    <Card key={child.id}>
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">{child.name}</CardTitle>
                        <CardDescription>{child.grade}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Current Subjects</p>
                            <div className="flex flex-wrap gap-2">
                              {child.subjects.length > 0 ? child.subjects.map((subject) => (
                                <Badge key={subject} variant="outline" className="text-xs">{subject}</Badge>
                              )) : <span className="text-gray-500 text-sm">No subjects added yet</span>}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button size="sm" onClick={() => handleViewProgress(child)} className="w-full sm:w-auto">View Progress</Button>
                            <Button size="sm" variant="outline" onClick={() => handleRequestTutor(child)} className="w-full sm:w-auto">Request Tutor</Button>
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Tutors</h1>
                
                {/* Search and Filters */}
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="search" className="text-sm">Search Tutors</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="search"
                            placeholder="Name or subject..."
                            className="pl-10 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Subject</Label>
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Subjects</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Location</Label>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="accra">Accra</SelectItem>
                            <SelectItem value="kumasi">Kumasi</SelectItem>
                            <SelectItem value="tema">Tema</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col sm:flex-row items-end gap-2">
                        <Button className="flex-1 w-full text-sm" onClick={() => console.log("Applied filters")}>
                          <Filter className="h-4 w-4 mr-2" />
                          Apply
                        </Button>
                        <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto text-sm">
                          Clear
                        </Button>
                      </div>
                    </div>
                    
                    {/* Filter Summary */}
                    {(searchTerm || selectedSubject || selectedLocation) && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                          <span className="text-sm text-blue-800">
                            Showing {filteredTutors.length} of {allTutors.length} tutors
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {searchTerm && (
                              <Badge variant="secondary" className="text-xs">Search: {searchTerm}</Badge>
                            )}
                            {selectedSubject && selectedSubject !== "all" && (
                              <Badge variant="secondary" className="text-xs">Subject: {selectedSubject}</Badge>
                            )}
                            {selectedLocation && selectedLocation !== "all" && (
                              <Badge variant="secondary" className="text-xs">Location: {selectedLocation}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tutors Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {filteredTutors.map((tutor) => (
                    <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-base sm:text-lg">{tutor.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{tutor.experience} experience</p>
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
                            <Badge variant={tutor.availability === "Available" ? "default" : "secondary"} className="text-xs">
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

                          <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <Button size="sm" className="flex-1 text-xs" onClick={() => handleViewTutorProfile(tutor)}>
                              View Profile
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => handleBookTutorLesson(tutor)}>
                              Book Lesson
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredTutors.length === 0 && (
                  <Card>
                    <CardContent className="p-6 sm:p-8 text-center">
                      <p className="text-gray-500 mb-4">No tutors found matching your criteria.</p>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "lessons" && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Lessons Schedule</h1>
                
                <div className="grid gap-4 sm:gap-6">
                  {[...todaysLessons, ...upcomingLessons].map((lesson) => (
                    <Card key={lesson.id}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-base sm:text-lg">{lesson.subject}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.location}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">with {lesson.tutor}</p>
                              <p className="text-xs sm:text-sm text-gray-500">Student: {lesson.student}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2">
                              <Clock className="h-4 w-4 mr-1" />
                              {lesson.time}
                            </div>
                            <Badge variant={lesson.status === "confirmed" ? "default" : "secondary"} className="text-xs mb-3 sm:mb-0">
                              {lesson.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleRescheduleLesson(lesson)} className="w-full sm:w-auto text-xs">
                            Reschedule
                          </Button>
                          <Button size="sm" onClick={() => handleStartLesson(lesson)} className="w-full sm:w-auto text-xs">
                            Start Lesson
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment History</h1>
                
                {/* Payment Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <Card>
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">GHS 360</div>
                      <div className="text-xs sm:text-sm text-gray-600">Paid This Month</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">GHS 150</div>
                      <div className="text-xs sm:text-sm text-gray-600">Pending Payment</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">GHS 1,240</div>
                      <div className="text-xs sm:text-sm text-gray-600">Total Paid</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Recent Payments</CardTitle>
                    <CardDescription>Your payment history and invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.map((payment) => (
                        <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-4 sm:space-y-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm sm:text-base">{payment.subject} Lesson</h3>
                              <p className="text-xs sm:text-sm text-gray-600">with {payment.tutor}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{payment.date}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="font-semibold text-base sm:text-lg">GHS {payment.amount}</div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                              <Badge variant={payment.status === "paid" ? "default" : "secondary"} className="text-xs w-fit">
                                {payment.status === "paid" ? (
                                  <><CheckCircle className="h-3 w-3 mr-1" /> Paid</>
                                ) : (
                                  <><Clock className="h-3 w-3 mr-1" /> Pending</>
                                )}
                              </Badge>
                              <div className="flex flex-col sm:flex-row gap-2">
                                {payment.status === "pending" && (
                                  <Button size="sm" onClick={() => handleMakePayment(payment)} className="text-xs">
                                    Pay Now
                                  </Button>
                                )}
                                <Button size="sm" variant="outline" className="text-xs" onClick={() => handleViewInvoice(payment)}>
                                  View Invoice
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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

      {selectedLesson && (
        <RescheduleModal
          isOpen={showRescheduleModal}
          onClose={() => setShowRescheduleModal(false)}
          lesson={selectedLesson}
        />
      )}

      {selectedLesson && (
        <JoinLessonModal
          isOpen={showJoinLessonModal}
          onClose={() => setShowJoinLessonModal(false)}
          lesson={selectedLesson}
        />
      )}

      {selectedPayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          payment={selectedPayment}
        />
      )}

      {selectedTutor && (
        <TutorProfileModal
          isOpen={showTutorProfileModal}
          onClose={() => setShowTutorProfileModal(false)}
          tutor={selectedTutor}
          onBookLesson={() => {
            setShowTutorProfileModal(false);
            setShowBookLessonModal(true);
          }}
        />
      )}

      {selectedTutor && (
        <BookLessonModal
          isOpen={showBookLessonModal}
          onClose={() => setShowBookLessonModal(false)}
          tutorName={selectedTutor.name}
          rate={selectedTutor.rate}
        />
      )}

      {selectedInvoice && (
        <InvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          payment={selectedInvoice}
        />
      )}
    </div>
  );
};

export default ParentDashboard;
