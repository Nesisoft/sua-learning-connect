import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, CreditCard, Star, Clock, LogOut, Users, Settings, Menu, X, Video, Phone, MessageSquare, MapPinIcon, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StudentProgressModal from "@/components/StudentProgressModal";
import BookLessonModal from "@/components/BookLessonModal";
import AddChildModal from "@/components/AddChildModal";
import PaymentModal from "@/components/PaymentModal";
import RescheduleModal from "@/components/RescheduleModal";
import { toast } from "sonner";

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [modalType, setModalType] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock data
  const ongoingLessons = [
    { id: 1, subject: "Mathematics", child: "Emma Johnson", tutor: "Dr. Kwame Asante", location: "Home Visit", startTime: "3:30 PM", status: "In Progress", duration: "45 mins", address: "123 Elm Street, Accra" },
    { id: 2, subject: "Physics", child: "James Johnson", tutor: "Prof. Sarah Mensah", location: "Virtual", startTime: "2:00 PM", status: "In Progress", duration: "60 mins" }
  ];

  const todaysLessons = [
    { id: 1, subject: "Mathematics", child: "Emma Johnson", tutor: "Dr. Kwame Asante", time: "Today, 4:00 PM", location: "Home Visit", address: "123 Elm Street, Accra" },
    { id: 2, subject: "Physics", child: "James Johnson", tutor: "Prof. Sarah Mensah", time: "Today, 6:00 PM", location: "Virtual" }
  ];

  const upcomingLessons = [
    { id: 1, subject: "Mathematics", child: "Emma Johnson", tutor: "Dr. Kwame Asante", time: "Tomorrow, 10:00 AM", location: "Home Visit", address: "456 Oak Avenue, Kumasi" },
    { id: 2, subject: "Physics", child: "James Johnson", tutor: "Prof. Sarah Mensah", time: "Wednesday, 2:00 PM", location: "Virtual" },
    { id: 3, subject: "Chemistry", child: "Emma Johnson", tutor: "Dr. Michael Ofori", time: "Thursday, 4:00 PM", location: "Home Visit", address: "789 Pine Street, Tamale" }
  ];

  const children = [
    { id: 1, name: "Emma Johnson", grade: "Grade 8", subjects: ["Mathematics", "Science"], progress: 85, avatar: "/placeholder.svg" },
    { id: 2, name: "James Johnson", grade: "Grade 10", subjects: ["Physics", "Chemistry"], progress: 78, avatar: "/placeholder.svg" }
  ];

  const openModal = (type: string, child?: any, lesson?: any) => {
    setSelectedChild(child);
    setSelectedLesson(lesson);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedChild(null);
    setSelectedLesson(null);
  };

  const handleStartLesson = (lesson: any) => {
    console.log("Starting lesson:", lesson);
    toast.success(`Starting ${lesson.subject} lesson for ${lesson.child}!`);
    
    setTimeout(() => {
      if (lesson.location === "Virtual") {
        toast.info("Connecting to virtual classroom...");
      } else {
        toast.info("Tutor is on the way to your location");
      }
    }, 1000);
  };

  const handleCallTutor = (lesson: any) => {
    console.log("Calling tutor:", lesson);
    toast.success(`Calling ${lesson.tutor}...`);
    setTimeout(() => {
      toast.info("Call connected successfully");
    }, 1500);
  };

  const handleSendMessage = (lesson: any) => {
    console.log("Opening chat with tutor:", lesson);
    navigate('/chat', { state: { recipient: lesson.tutor, type: 'tutor' } });
  };

  const handleNavigateToLocation = (lesson: any) => {
    console.log("Navigating to location:", lesson);
    toast.success(`Opening navigation to lesson location`);
    setTimeout(() => {
      toast.info("GPS navigation started");
    }, 1000);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const handleChildAdded = (childData: any) => {
    console.log("Child added:", childData);
    toast.success("Child added successfully!");
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold text-gray-900">Sua</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">Parent</Badge>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:block text-gray-700 text-sm">Mrs. Johnson</span>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                  <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-4 lg:gap-8">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:bg-transparent lg:border-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-4 space-y-2 pt-20 lg:pt-0">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => handleTabChange("overview")}
              >
                <Users className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === "children" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => handleTabChange("children")}
              >
                <Users className="h-4 w-4 mr-2" />
                My Children
              </Button>
              <Button
                variant={activeTab === "schedule" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => handleTabChange("schedule")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button
                variant={activeTab === "payments" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => handleTabChange("payments")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payments
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => handleTabChange("profile")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => navigate('/chat')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "overview" && (
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parent Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  <Card>
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2 sm:mb-0" />
                        <div className="sm:ml-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-600">Children</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">{children.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2 sm:mb-0" />
                        <div className="sm:ml-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-600">This Week</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">8</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 mb-2 sm:mb-0" />
                        <div className="sm:ml-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Progress</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">82%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2 sm:mb-0" />
                        <div className="sm:ml-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">GHS 480</p>
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
                      <CardDescription className="text-sm">Lessons currently in progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {ongoingLessons.map((lesson) => (
                          <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg bg-green-50 border-green-200 space-y-3 sm:space-y-0">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-sm sm:text-base">{lesson.subject}</h3>
                                <Badge variant="default" className="bg-green-600 text-xs">
                                  {lesson.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.location === "Virtual" ? <Video className="h-3 w-3 mr-1" /> : <MapPinIcon className="h-3 w-3 mr-1" />}
                                  {lesson.location}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">Child: {lesson.child}</p>
                              <p className="text-xs sm:text-sm text-gray-600">Tutor: {lesson.tutor}</p>
                              <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500 mt-1">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Started: {lesson.startTime}
                                </span>
                                <span>Duration: {lesson.duration}</span>
                              </div>
                              {lesson.address && (
                                <p className="text-xs text-gray-500 mt-1">Address: {lesson.address}</p>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleCallTutor(lesson)} className="w-full sm:w-auto text-xs">
                                <Phone className="h-4 w-4 mr-1" />
                                Call Tutor
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleSendMessage(lesson)} className="w-full sm:w-auto text-xs">
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
                    <CardDescription className="text-sm">Your scheduled lessons for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaysLessons.map((lesson) => (
                        <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-sm sm:text-base">{lesson.subject}</h3>
                              <Badge variant="outline" className="text-xs">
                                {lesson.location === "Virtual" ? <Video className="h-3 w-3 mr-1" /> : <MapPinIcon className="h-3 w-3 mr-1" />}
                                {lesson.location}
                              </Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">Child: {lesson.child}</p>
                            <p className="text-xs sm:text-sm text-gray-600">Tutor: {lesson.tutor}</p>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4" />
                              <span>{lesson.time}</span>
                            </div>
                            {lesson.address && (
                              <p className="text-xs text-gray-500 mt-1">Address: {lesson.address}</p>
                            )}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs flex-1 sm:flex-none"
                              onClick={() => openModal('reschedule', null, lesson)}
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
                    <CardDescription className="text-sm">Your scheduled lessons for the coming days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-sm sm:text-base">{lesson.subject}</h3>
                              <Badge variant="outline" className="text-xs">
                                {lesson.location === "Virtual" ? <Video className="h-3 w-3 mr-1" /> : <MapPinIcon className="h-3 w-3 mr-1" />}
                                {lesson.location}
                              </Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">Child: {lesson.child}</p>
                            <p className="text-xs sm:text-sm text-gray-600">Tutor: {lesson.tutor}</p>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4" />
                              <span>{lesson.time}</span>
                            </div>
                            {lesson.address && (
                              <p className="text-xs text-gray-500 mt-1">Address: {lesson.address}</p>
                            )}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs flex-1 sm:flex-none"
                              onClick={() => openModal('reschedule', null, lesson)}
                            >
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                    <CardDescription className="text-sm">Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button onClick={() => navigate('/find-tutors')} className="h-20 flex-col space-y-2 text-sm">
                        <Users className="h-6 w-6" />
                        <span>Find Tutors</span>
                      </Button>
                      <Button variant="outline" onClick={() => openModal('book')} className="h-20 flex-col space-y-2 text-sm">
                        <Calendar className="h-6 w-6" />
                        <span>Book Lesson</span>
                      </Button>
                      <Button variant="outline" onClick={() => openModal('add-child')} className="h-20 flex-col space-y-2 text-sm">
                        <Plus className="h-6 w-6" />
                        <span>Add Child</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "children" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Children</h1>
                  <Button onClick={() => openModal('add-child')} className="text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Child
                  </Button>
                </div>
                
                <div className="grid gap-4 sm:gap-6">
                  {children.map((child) => (
                    <Card key={child.id}>
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                          <div>
                            <CardTitle className="text-lg sm:text-xl">{child.name}</CardTitle>
                            <CardDescription className="text-sm">{child.grade} • {child.subjects.join(", ")}</CardDescription>
                          </div>
                          <Badge variant="outline" className="text-xs self-start">Progress: {child.progress}%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button size="sm" onClick={() => openModal('progress', child)} className="text-xs">
                            View Progress
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openModal('book', child)} className="text-xs">
                            Book Lesson
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => navigate('/find-tutors')} className="text-xs">
                            Find Tutors
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Schedule</h1>
                
                <div className="grid gap-4 sm:gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">This Week's Lessons</CardTitle>
                      <CardDescription className="text-sm">All scheduled lessons for the current week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...todaysLessons, ...upcomingLessons].map((lesson) => (
                          <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-sm sm:text-base">{lesson.subject}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.location}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">Child: {lesson.child}</p>
                              <p className="text-xs sm:text-sm text-gray-600">Tutor: {lesson.tutor}</p>
                              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mt-1">
                                <Clock className="h-4 w-4" />
                                <span>{lesson.time}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs flex-1 sm:flex-none"
                                onClick={() => openModal('reschedule', null, lesson)}
                              >
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payments</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                        <p className="text-xl sm:text-3xl font-bold text-blue-600">GHS 480</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-xl sm:text-3xl font-bold text-yellow-600">GHS 120</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Total Paid</p>
                        <p className="text-xl sm:text-3xl font-bold text-green-600">GHS 2,340</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Recent Payments</CardTitle>
                    <CardDescription className="text-sm">Your payment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">Mathematics Lesson - Emma</p>
                          <p className="text-xs text-gray-500">Dr. Kwame Asante • March 15, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">GHS 60</p>
                          <Badge variant="default" className="bg-green-600 text-xs">Paid</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">Physics Lesson - James</p>
                          <p className="text-xs text-gray-500">Prof. Sarah Mensah • March 14, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">GHS 80</p>
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile Settings</h1>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Account Information</CardTitle>
                    <CardDescription className="text-sm">Manage your account details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <p className="text-sm text-gray-600">Mrs. Johnson</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-gray-600">mrs.johnson@email.com</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-gray-600">+233 24 123 4567</p>
                      </div>
                      <Button className="text-sm">Edit Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {!["overview", "children", "schedule", "payments", "profile"].includes(activeTab) && (
              <div className="text-center py-12">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">This section is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalType === 'progress' && selectedChild && (
        <StudentProgressModal
          isOpen={true}
          onClose={closeModal}
          student={selectedChild}
        />
      )}

      {modalType === 'book' && (
        <BookLessonModal
          isOpen={true}
          onClose={closeModal}
          tutorName="Selected Tutor"
          rate={60}
        />
      )}

      {modalType === 'add-child' && (
        <AddChildModal
          isOpen={true}
          onClose={closeModal}
          onChildAdded={handleChildAdded}
        />
      )}

      {modalType === 'payment' && (
        <PaymentModal
          isOpen={true}
          onClose={closeModal}
        />
      )}

      {modalType === 'reschedule' && selectedLesson && (
        <RescheduleModal
          isOpen={true}
          onClose={closeModal}
          lesson={selectedLesson}
        />
      )}
    </div>
  );
};

export default ParentDashboard;
