import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, CreditCard, Star, Clock, LogOut, Users, Settings, Menu, X, Video, Phone, MessageSquare, MapPinIcon, DollarSign, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StudentProgressModal from "@/components/StudentProgressModal";
import ScheduleLessonModal from "@/components/ScheduleLessonModal";
import SendMessageModal from "@/components/SendMessageModal";
import WithdrawalModal from "@/components/WithdrawalModal";
import RescheduleModal from "@/components/RescheduleModal";
import { toast } from "sonner";

const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [modalType, setModalType] = useState<string>("");
  const [withdrawalType, setWithdrawalType] = useState<"bank" | "mobile">("bank");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock data
  const ongoingLessons = [
    { id: 1, subject: "Mathematics", student: "Sarah Johnson", location: "Home Visit", startTime: "3:30 PM", status: "In Progress", duration: "45 mins", address: "123 Elm Street, Accra" },
    { id: 2, subject: "Physics", student: "Alex Mensah", location: "Virtual", startTime: "2:00 PM", status: "In Progress", duration: "60 mins" }
  ];

  const todaysLessons = [
    { id: 1, subject: "Mathematics", student: "Sarah Johnson", time: "Today, 4:00 PM", location: "Home Visit", address: "123 Elm Street, Accra" },
    { id: 2, subject: "Physics", student: "Alex Mensah", time: "Today, 6:00 PM", location: "Virtual" }
  ];

  const upcomingLessons = [
    { id: 1, subject: "Mathematics", student: "Sarah Johnson", time: "Tomorrow, 10:00 AM", location: "Home Visit", address: "456 Oak Avenue, Kumasi" },
    { id: 2, subject: "Physics", student: "Alex Mensah", time: "Wednesday, 2:00 PM", location: "Virtual" },
    { id: 3, subject: "Chemistry", student: "Emma Ofori", time: "Thursday, 4:00 PM", location: "Home Visit", address: "789 Pine Street, Tamale" }
  ];

  const students = [
    { id: 1, name: "Sarah Johnson", grade: "Grade 8", subject: "Mathematics", progress: 85 },
    { id: 2, name: "Alex Mensah", grade: "Grade 10", subject: "Physics", progress: 78 },
    { id: 3, name: "Emma Ofori", grade: "Grade 6", subject: "English", progress: 92 }
  ];

  const earnings = {
    thisWeek: 320,
    thisMonth: 1250,
    pending: 180,
    total: 8500
  };

  const openModal = (type: string, student?: any, lesson?: any) => {
    setSelectedStudent(student);
    setSelectedLesson(lesson);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedStudent(null);
    setSelectedLesson(null);
  };

  const handleStartLesson = (lesson: any) => {
    console.log("Starting lesson:", lesson);
    toast.success(`Starting ${lesson.subject} lesson with ${lesson.student}!`);
    
    setTimeout(() => {
      if (lesson.location === "Virtual") {
        toast.info("Connecting to virtual classroom...");
      } else {
        toast.info("Navigate to student location for home visit");
      }
    }, 1000);
  };

  const handleCallStudent = (lesson: any) => {
    console.log("Calling student:", lesson);
    toast.success(`Calling ${lesson.student}...`);
    setTimeout(() => {
      toast.info("Call connected successfully");
    }, 1500);
  };

  const handleSendMessage = (lesson: any) => {
    console.log("Opening chat with student:", lesson);
    navigate('/conversation', { 
      state: { 
        userType: 'tutor',
        contact: {
          id: lesson.id,
          name: lesson.student,
          type: 'student',
          subject: lesson.subject
        }
      } 
    });
  };

  const handleNavigateToLocation = (lesson: any) => {
    console.log("Navigating to location:", lesson);
    toast.success(`Opening navigation to ${lesson.student}'s location`);
    setTimeout(() => {
      toast.info("GPS navigation started");
    }, 1000);
  };

  const handleProfileClick = () => {
    navigate('/tutor/profile');
  };

  const handleScheduleClick = () => {
    navigate('/tutor/schedule');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const handleJoinOngoingLesson = (lesson: any) => {
    console.log("Joining ongoing lesson:", lesson);
    if (lesson.location === "Virtual") {
      toast.success(`Joining virtual lesson with ${lesson.student}`);
      setTimeout(() => {
        toast.info("Connected to virtual classroom");
      }, 1000);
    } else {
      toast.info("Connecting to student...");
    }
  };

  const handleContactStudent = (lesson: any) => {
    console.log("Contacting student:", lesson);
    toast.success(`Calling ${lesson.student}...`);
  };

  const handleEndLesson = (lesson: any) => {
    console.log("Ending lesson:", lesson);
    toast.success(`Lesson with ${lesson.student} has been ended`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">Tutor</Badge>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
              </div>
              <span className="hidden sm:block text-gray-700 text-sm">Dr. Kwame Asante</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
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
                variant={activeTab === "students" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => handleTabChange("students")}
              >
                <Users className="h-4 w-4 mr-2" />
                My Students
              </Button>
              <Button
                variant={activeTab === "schedule" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={handleScheduleClick}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button
                variant={activeTab === "earnings" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => handleTabChange("earnings")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Earnings
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={handleProfileClick}
              >
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => navigate('/messages', { state: { userType: 'tutor' } })}
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tutor Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">12</p>
                        <p className="text-sm text-blue-600">Total Students</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </Card>
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-green-600">8</p>
                        <p className="text-sm text-green-600">Lessons Today</p>
                      </div>
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                  </Card>
                  <Card className="p-4 bg-purple-50 border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-purple-600">₵2,400</p>
                        <p className="text-sm text-purple-600">This Month</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-purple-600" />
                    </div>
                  </Card>
                  <Card className="p-4 bg-orange-50 border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-orange-600">3</p>
                        <p className="text-sm text-orange-600">New Messages</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/messages', { state: { userType: 'tutor' } })}
                        className="p-0"
                      >
                        <MessageCircle className="h-8 w-8 text-orange-600 cursor-pointer hover:text-orange-700" />
                      </Button>
                    </div>
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
                                  {lesson.location}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">Student: {lesson.student}</p>
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
                              {lesson.address && (
                                <p className="text-xs text-gray-500 mt-1">Address: {lesson.address}</p>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleCallStudent(lesson)} className="w-full sm:w-auto text-xs">
                                <Phone className="h-4 w-4 mr-1" />
                                Call
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
                            <p className="text-xs sm:text-sm text-gray-600">Student: {lesson.student}</p>
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
                            <p className="text-xs sm:text-sm text-gray-600">Student: {lesson.student}</p>
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

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                    <CardDescription className="text-sm">Latest updates and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-xs sm:text-sm">New lesson request from parent for Grade 9 Chemistry</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-xs sm:text-sm">Payment of GHS 120 received for last week's lessons</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-xs sm:text-sm">Reminder: Submit progress report for Sarah Johnson</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "students" && (
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Students</h1>
                
                <div className="grid gap-4 sm:gap-6">
                  {students.map((student) => (
                    <Card key={student.id}>
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                          <div>
                            <CardTitle className="text-lg sm:text-xl">{student.name}</CardTitle>
                            <CardDescription className="text-sm">{student.grade} • {student.subject}</CardDescription>
                          </div>
                          <Badge variant="outline" className="text-xs self-start">Progress: {student.progress}%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button size="sm" onClick={() => openModal('progress', student)} className="text-xs">
                            View Progress
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openModal('schedule', student)} className="text-xs">
                            Schedule Lesson
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openModal('message', student)} className="text-xs">
                            Send Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "earnings" && (
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Earnings</h1>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">This Week</p>
                        <p className="text-xl sm:text-3xl font-bold text-green-600">GHS {earnings.thisWeek}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                        <p className="text-xl sm:text-3xl font-bold text-blue-600">GHS {earnings.thisMonth}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-xl sm:text-3xl font-bold text-yellow-600">GHS {earnings.pending}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Total Earned</p>
                        <p className="text-xl sm:text-3xl font-bold text-purple-600">GHS {earnings.total}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Withdrawal Options</CardTitle>
                    <CardDescription className="text-sm">Withdraw your earnings to your preferred account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={() => {
                        setWithdrawalType('bank');
                        openModal('withdrawal');
                      }} className="text-sm">
                        Withdraw to Bank
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setWithdrawalType('mobile');
                        openModal('withdrawal');
                      }} className="text-sm">
                        Withdraw to Mobile Money
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {!["overview", "students", "earnings"].includes(activeTab) && (
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
      {modalType === 'progress' && selectedStudent && (
        <StudentProgressModal
          isOpen={true}
          onClose={closeModal}
          student={selectedStudent}
        />
      )}

      {modalType === 'schedule' && selectedStudent && (
        <ScheduleLessonModal
          isOpen={true}
          onClose={closeModal}
          student={selectedStudent}
        />
      )}

      {modalType === 'message' && selectedStudent && (
        <SendMessageModal
          isOpen={true}
          onClose={closeModal}
          student={selectedStudent}
        />
      )}

      {modalType === 'withdrawal' && (
        <WithdrawalModal
          isOpen={true}
          onClose={closeModal}
          type={withdrawalType}
          availableBalance={earnings.thisMonth}
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

export default TutorDashboard;
