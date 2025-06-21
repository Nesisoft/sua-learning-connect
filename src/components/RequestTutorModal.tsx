
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen } from "lucide-react";

interface RequestTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
}

const RequestTutorModal = ({ isOpen, onClose, childName }: RequestTutorModalProps) => {
  const [requestData, setRequestData] = useState({
    subject: "",
    grade: "",
    sessionsPerWeek: "",
    duration: "",
    budget: "",
    description: "",
    learningGoals: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tutor request submitted:", { child: childName, ...requestData });
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setRequestData({
        subject: "",
        grade: "",
        sessionsPerWeek: "",
        duration: "",
        budget: "",
        description: "",
        learningGoals: ""
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md text-center">
          <div className="py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
            <p className="text-gray-600 mb-4">
              We'll find suitable tutors for {childName} and get back to you within 24 hours.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Request Tutor for {childName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select value={requestData.subject} onValueChange={(value) => setRequestData(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="grade">Grade Level</Label>
              <Select value={requestData.grade} onValueChange={(value) => setRequestData(prev => ({ ...prev, grade: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade-1">Grade 1</SelectItem>
                  <SelectItem value="grade-2">Grade 2</SelectItem>
                  <SelectItem value="grade-3">Grade 3</SelectItem>
                  <SelectItem value="grade-4">Grade 4</SelectItem>
                  <SelectItem value="grade-5">Grade 5</SelectItem>
                  <SelectItem value="grade-6">Grade 6</SelectItem>
                  <SelectItem value="grade-7">Grade 7</SelectItem>
                  <SelectItem value="grade-8">Grade 8</SelectItem>
                  <SelectItem value="grade-9">Grade 9</SelectItem>
                  <SelectItem value="grade-10">Grade 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sessions">Sessions per Week</Label>
              <Select value={requestData.sessionsPerWeek} onValueChange={(value) => setRequestData(prev => ({ ...prev, sessionsPerWeek: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 session</SelectItem>
                  <SelectItem value="2">2 sessions</SelectItem>
                  <SelectItem value="3">3 sessions</SelectItem>
                  <SelectItem value="4">4 sessions</SelectItem>
                  <SelectItem value="5">5 sessions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="duration">Session Duration</Label>
              <Select value={requestData.duration} onValueChange={(value) => setRequestData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="budget">Budget (GHS per hour)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="e.g., 50"
              value={requestData.budget}
              onChange={(e) => setRequestData(prev => ({ ...prev, budget: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="goals">Learning Goals</Label>
            <Textarea
              id="goals"
              placeholder="What would you like your child to achieve? e.g., improve grades, prepare for exams, build confidence..."
              value={requestData.learningGoals}
              onChange={(e) => setRequestData(prev => ({ ...prev, learningGoals: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Additional Notes</Label>
            <Textarea
              id="description"
              placeholder="Any specific requirements or preferences for the tutor..."
              value={requestData.description}
              onChange={(e) => setRequestData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestTutorModal;
