import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, CreditCard, Star, Clock, LogOut, Users, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StudentProgressModal from "@/components/StudentProgressModal";
import ScheduleLessonModal from "@/components/ScheduleLessonModal";
import SendMessageModal from "@/components/SendMessageModal";
import WithdrawalModal from "@/components/WithdrawalModal";

const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [modalType, setModalType] = useState<string>("");
  const [withdrawalType, setWithdrawalType] = useState<"bank" | "mobile">("bank");
  const navigate = useNavigate();

  // Mock data
  const upcomingLessons = [
    { id: 1, subject: "Mathematics", student: "Sarah Johnson", time: "Today, 4:00 PM", location: "Home Visit" },
    { id: 2, subject: "Physics", student: "Alex Mensah", time: "Tomorrow, 10:00 AM", location: "Virtual" }
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

  const openModal = (type: string, student?: any) => {
    setSelectedStudent(student);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedStudent(null);
  };

  const handleProfileClick = () => {
    navigate('/tutor/profile');
  };

  const handleScheduleClick = () => {
    navigate('/tutor/schedule');
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
              <Badge variant="outline" className="bg-green-50 text-green-700">Tutor</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
              </div>
              <span className="text-gray-700">Dr. Kwame Asante</span>
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
              variant={activeTab === "students" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("students")}
            >
              <Users className="h-4 w-4 mr-2" />
              My Students
            </Button>
            <Button
              variant={activeTab === "schedule" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={handleScheduleClick}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button
              variant={activeTab === "earnings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("earnings")}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Earnings
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={handleProfileClick}
            >
              <Settings className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Tutor Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Active Students</p>
                          <p className="text-2xl font-bold text-gray-900">{students.length}</p>
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
                          <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Star className="h-8 w-8 text-yellow-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Rating</p>
                          <p className="text-2xl font-bold text-gray-900">4.8</p>
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
                          <p className="text-2xl font-bold text-gray-900">GHS {earnings.thisMonth}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Lessons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Lessons</CardTitle>
                    <CardDescription>Your scheduled lessons for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{lesson.subject}</h3>
                            <p className="text-sm text-gray-600">Student: {lesson.student}</p>
                            <p className="text-sm text-gray-500">{lesson.time} • {lesson.location}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm">Start Lesson</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm">New lesson request from parent for Grade 9 Chemistry</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm">Payment of GHS 120 received for last week's lessons</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm">Reminder: Submit progress report for Sarah Johnson</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "students" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
                
                <div className="grid gap-6">
                  {students.map((student) => (
                    <Card key={student.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{student.name}</CardTitle>
                            <CardDescription>{student.grade} • {student.subject}</CardDescription>
                          </div>
                          <Badge variant="outline">Progress: {student.progress}%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => openModal('progress', student)}>
                            View Progress
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openModal('schedule', student)}>
                            Schedule Lesson
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openModal('message', student)}>
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
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">This Week</p>
                        <p className="text-3xl font-bold text-green-600">GHS {earnings.thisWeek}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">This Month</p>
                        <p className="text-3xl font-bold text-blue-600">GHS {earnings.thisMonth}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-3xl font-bold text-yellow-600">GHS {earnings.pending}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Total Earned</p>
                        <p className="text-3xl font-bold text-purple-600">GHS {earnings.total}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Withdrawal Options</CardTitle>
                    <CardDescription>Withdraw your earnings to your preferred account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Button onClick={() => {
                        setWithdrawalType('bank');
                        openModal('withdrawal');
                      }}>
                        Withdraw to Bank
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setWithdrawalType('mobile');
                        openModal('withdrawal');
                      }}>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h2>
                <p className="text-gray-600">This section is under development.</p>
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
    </div>
  );
};

export default TutorDashboard;
