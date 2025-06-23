import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, MapPin, Clock, Save, Edit, Camera, LogOut, Users, Calendar, CreditCard, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const TutorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Kwame Asante",
    email: "kwame.asante@email.com",
    phone: "+233 24 123 4567",
    address: "East Legon, Accra",
    subjects: "Mathematics, Physics, Chemistry",
    hourlyRate: "25",
    experience: "5",
    bio: "Experienced tutor with a passion for helping students excel in STEM subjects. I hold a PhD in Mathematics and have been teaching for over 5 years.",
    availability: "Monday-Friday: 4PM-8PM, Saturday: 9AM-5PM"
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
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
              <Link to="/dashboard/tutor">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Overview
                </Button>
              </Link>
              <Link to="/dashboard/tutor">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  My Students
                </Button>
              </Link>
              <Link to="/tutor/schedule">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </Link>
              <Link to="/dashboard/tutor">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Earnings
                </Button>
              </Link>
              <Button variant="default" className="w-full justify-start text-sm">
                <Users className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
              <Button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {/* Profile Picture & Rating */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">KA</span>
                      </div>
                      {isEditing && (
                        <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full p-2">
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-semibold">4.8</span>
                        <span className="text-gray-600">(142 reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{profileData.address}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Teaching Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Teaching Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subjects">Subjects</Label>
                    <Input
                      id="subjects"
                      value={profileData.subjects}
                      onChange={(e) => handleChange('subjects', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate (GHS)</Label>
                      <Input
                        id="hourlyRate"
                        value={profileData.hourlyRate}
                        onChange={(e) => handleChange('hourlyRate', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        value={profileData.experience}
                        onChange={(e) => handleChange('experience', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Textarea
                      id="availability"
                      value={profileData.availability}
                      onChange={(e) => handleChange('availability', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">142</div>
                      <div className="text-sm text-gray-600">Total Reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">95%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">350+</div>
                      <div className="text-sm text-gray-600">Hours Taught</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">28</div>
                      <div className="text-sm text-gray-600">Active Students</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
