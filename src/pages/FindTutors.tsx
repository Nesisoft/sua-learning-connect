
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Star, MapPin, Clock, Users, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const FindTutors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Mock tutor data
  const tutors = [
    {
      id: 1,
      name: "Dr. Kwame Asante",
      subjects: ["Mathematics", "Physics"],
      rating: 4.9,
      reviews: 45,
      experience: "8 years",
      location: "Accra",
      rate: "GHS 80/hour",
      availability: "Available",
      image: "/placeholder.svg"
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
      availability: "Available",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Prof. Yaw Mensah",
      subjects: ["Chemistry", "Biology"],
      rating: 4.7,
      reviews: 28,
      experience: "12 years",
      location: "Tema",
      rate: "GHS 90/hour",
      availability: "Busy",
      image: "/placeholder.svg"
    }
  ];

  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Sua</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Tutor</h1>
          <p className="text-gray-600">Connect with verified tutors across Ghana</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
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
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accra">Accra</SelectItem>
                    <SelectItem value="kumasi">Kumasi</SelectItem>
                    <SelectItem value="takoradi">Takoradi</SelectItem>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
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

        {/* Call to Action for Tutors */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Become a Tutor?</h2>
            <p className="text-gray-600 mb-6">Join our community of verified tutors and start earning while making a difference</p>
            <Link to="/register/tutor">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Apply as Tutor
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindTutors;
