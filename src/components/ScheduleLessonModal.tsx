
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

interface ScheduleLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: number;
    name: string;
    grade: string;
    subject: string;
  };
}

const ScheduleLessonModal = ({ isOpen, onClose, student }: ScheduleLessonModalProps) => {
  const [lessonData, setLessonData] = useState({
    date: "",
    time: "",
    duration: "60",
    type: "",
    location: "",
    topic: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Scheduling lesson:", { student, ...lessonData });
    onClose();
    // Here you would typically send the data to your backend
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Lesson with {student.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={lessonData.date}
                onChange={(e) => setLessonData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={lessonData.time}
                onChange={(e) => setLessonData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select value={lessonData.duration} onValueChange={(value) => setLessonData(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Lesson Type</Label>
            <Select value={lessonData.type} onValueChange={(value) => setLessonData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select lesson type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Home Visit
                  </div>
                </SelectItem>
                <SelectItem value="virtual">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Virtual Lesson
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {lessonData.type === "home" && (
            <div>
              <Label htmlFor="location">Location/Address</Label>
              <Input
                id="location"
                placeholder="Enter address for home visit"
                value={lessonData.location}
                onChange={(e) => setLessonData(prev => ({ ...prev, location: e.target.value }))}
                required={lessonData.type === "home"}
              />
            </div>
          )}

          <div>
            <Label htmlFor="topic">Topic/Subject Focus</Label>
            <Input
              id="topic"
              placeholder="e.g., Quadratic Equations"
              value={lessonData.topic}
              onChange={(e) => setLessonData(prev => ({ ...prev, topic: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special instructions or notes..."
              value={lessonData.notes}
              onChange={(e) => setLessonData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!lessonData.date || !lessonData.time || !lessonData.type}>
              Schedule Lesson
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleLessonModal;
