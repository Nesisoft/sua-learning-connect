
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Clock, Users, BookOpen, Phone, Mail, Calendar } from "lucide-react";

interface TutorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: {
    id: number;
    name: string;
    subjects: string[];
    rating: number;
    reviews: number;
    experience: string;
    location: string;
    rate: string;
    availability: string;
  };
  onBookLesson?: (tutorId: number) => void;
}

const TutorProfileModal = ({ isOpen, onClose, tutor, onBookLesson }: TutorProfileModalProps) => {
  const handleBookLesson = () => {
    onBookLesson?.(tutor.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Tutor Profile</DialogTitle>
          <DialogDescription>Detailed information about {tutor.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{tutor.name}</h2>
              <p className="text-sm sm:text-base text-gray-600">{tutor.experience} of teaching experience</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{tutor.rating}</span>
                  <span className="text-gray-500 text-sm">({tutor.reviews} reviews)</span>
                </div>
                <Badge variant={tutor.availability === "Available" ? "default" : "secondary"}>
                  {tutor.availability}
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm sm:text-base">{tutor.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-sm sm:text-base">+233 20 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-sm sm:text-base">{tutor.name.toLowerCase().replace(' ', '.')}@sua.edu.gh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm sm:text-base text-green-600 font-semibold">{tutor.rate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subjects */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-semibold text-lg mb-4">Teaching Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject) => (
                  <Badge key={subject} variant="outline" className="text-xs sm:text-sm">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-semibold text-lg mb-4">Qualifications & Experience</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm sm:text-base">Education</h4>
                  <p className="text-gray-600 text-sm sm:text-base">MSc Mathematics, University of Ghana</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">Certifications</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Certified Mathematics Teacher, Ghana Education Service</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">Teaching Philosophy</h4>
                  <p className="text-gray-600 text-sm sm:text-base">I believe in making complex concepts simple and engaging for students through practical examples and interactive learning.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-semibold text-lg mb-4">Availability</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-2">Weekdays</h4>
                  <p className="text-gray-600 text-sm sm:text-base">3:00 PM - 8:00 PM</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-2">Weekends</h4>
                  <p className="text-gray-600 text-sm sm:text-base">9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleBookLesson} className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Book Lesson
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Contact Tutor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorProfileModal;
