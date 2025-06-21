
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Mic, MicOff, VideoOff, Users, Clock } from "lucide-react";

interface JoinLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: any;
}

const JoinLessonModal = ({ isOpen, onClose, lesson }: JoinLessonModalProps) => {
  const [isJoining, setIsJoining] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const handleJoinLesson = () => {
    setIsJoining(true);
    console.log("Joining lesson:", lesson);
    
    // Simulate joining process
    setTimeout(() => {
      alert("Joining virtual classroom... (This would redirect to the actual lesson platform)");
      setIsJoining(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600" />
            Join Lesson
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lesson Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{lesson?.subject}</h3>
            <p className="text-gray-600">with {lesson?.tutor}</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{lesson?.time}</span>
            </div>
            <Badge variant="default" className="mt-2">Starting Soon</Badge>
          </div>

          {/* Audio/Video Controls */}
          <div className="space-y-3">
            <h4 className="font-medium">Check your settings:</h4>
            <div className="flex gap-4">
              <Button
                variant={micEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setMicEnabled(!micEnabled)}
                className="flex items-center gap-2"
              >
                {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                Microphone
              </Button>
              <Button
                variant={videoEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setVideoEnabled(!videoEnabled)}
                className="flex items-center gap-2"
              >
                {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                Camera
              </Button>
            </div>
          </div>

          {/* Participants */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">1 participant waiting</span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleJoinLesson} 
              disabled={isJoining}
              className="bg-green-600 hover:bg-green-700"
            >
              {isJoining ? "Joining..." : "Join Lesson"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinLessonModal;
