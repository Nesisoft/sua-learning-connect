
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { BookOpen, Calendar as CalendarIcon, Clock, Users, MapPin, Video, Home } from "lucide-react";
import { Link } from "react-router-dom";

const TutorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock schedule data
  const todayLessons = [
    {
      id: 1,
      time: "9:00 AM - 10:00 AM",
      student: "Sarah Johnson",
      subject: "Mathematics",
      type: "Home Visit",
      location: "East Legon, Accra",
      status: "confirmed"
    },
    {
      id: 2,
      time: "2:00 PM - 3:00 PM",
      student: "Michael Osei",
      subject: "Physics",
      type: "Virtual",
      location: "Google Meet",
      status: "confirmed"
    },
    {
      id: 3,
      time: "4:00 PM - 5:00 PM",
      student: "Emma Asante",
      subject: "Chemistry",
      type: "Home Visit",
      location: "Adenta, Accra",
      status: "pending"
    }
  ];

  const upcomingLessons = [
    {
      id: 4,
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      student: "Kwame Nkrumah",
      subject: "Mathematics",
      type: "Virtual"
    },
    {
      id: 5,
      date: "Friday",
      time: "3:00 PM - 4:00 PM",
      student: "Ama Boateng",
      subject: "English",
      type: "Home Visit"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard/tutor" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Sua</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">Tutor</Badge>
            </Link>
            <Link to="/dashboard/tutor">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Calendar Section */}
          <div className="w-80">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Schedule Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Scheduled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
              <Button className="bg-green-600 hover:bg-green-700">
                Set Availability
              </Button>
            </div>

            {/* Today's Lessons */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Lessons</CardTitle>
                <CardDescription>Your scheduled lessons for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{lesson.subject}</h3>
                          <p className="text-sm text-gray-600">Student: {lesson.student}</p>
                          <p className="text-sm text-gray-500">{lesson.time}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {lesson.type === "Virtual" ? (
                              <Video className="h-4 w-4 text-green-600" />
                            ) : (
                              <Home className="h-4 w-4 text-blue-600" />
                            )}
                            <span className="text-xs text-gray-500">{lesson.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={lesson.status === "confirmed" ? "default" : "secondary"}>
                          {lesson.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm">
                            {lesson.type === "Virtual" ? "Join" : "Navigate"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Lessons */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Lessons</CardTitle>
                <CardDescription>Your lessons for the rest of the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                          <CalendarIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{lesson.subject}</h3>
                          <p className="text-sm text-gray-600">Student: {lesson.student}</p>
                          <p className="text-sm text-gray-500">{lesson.date} • {lesson.time}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {lesson.type === "Virtual" ? (
                              <Video className="h-4 w-4 text-green-600" />
                            ) : (
                              <Home className="h-4 w-4 text-blue-600" />
                            )}
                            <span className="text-xs text-gray-500">{lesson.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                    <div key={day} className="p-2">
                      <div className="font-medium text-sm">{day}</div>
                      <div className="mt-2 space-y-1">
                        {index < 5 && (
                          <div className="w-full h-2 bg-blue-200 rounded"></div>
                        )}
                        {index < 3 && (
                          <div className="w-full h-2 bg-green-200 rounded"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSchedule;
