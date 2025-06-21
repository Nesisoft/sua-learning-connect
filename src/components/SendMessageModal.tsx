
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send } from "lucide-react";

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: number;
    name: string;
    grade: string;
    subject: string;
  };
}

const SendMessageModal = ({ isOpen, onClose, student }: SendMessageModalProps) => {
  const [messageData, setMessageData] = useState({
    recipient: "parent",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending message:", { student, ...messageData });
    onClose();
    // Reset form
    setMessageData({ recipient: "parent", subject: "", message: "" });
  };

  const messageTemplates = {
    progress: `Dear Parent,\n\nI wanted to update you on ${student.name}'s progress in ${student.subject}. They have been showing great improvement and dedication to their studies.\n\nBest regards,\nDr. Kwame Asante`,
    reminder: `Dear Parent,\n\nThis is a reminder that ${student.name} has a ${student.subject} lesson scheduled for tomorrow. Please ensure they have their materials ready.\n\nBest regards,\nDr. Kwame Asante`,
    concern: `Dear Parent,\n\nI would like to discuss some areas where ${student.name} could use additional support in ${student.subject}. Please let me know when would be a good time to talk.\n\nBest regards,\nDr. Kwame Asante`
  };

  const useTemplate = (template: keyof typeof messageTemplates) => {
    setMessageData(prev => ({
      ...prev,
      message: messageTemplates[template]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Send Message - {student.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="recipient">Send to</Label>
            <Select value={messageData.recipient} onValueChange={(value) => setMessageData(prev => ({ ...prev, recipient: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">Parent/Guardian</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="both">Both Parent & Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select value={messageData.subject} onValueChange={(value) => setMessageData(prev => ({ ...prev, subject: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select message type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Progress Update">Progress Update</SelectItem>
                <SelectItem value="Lesson Reminder">Lesson Reminder</SelectItem>
                <SelectItem value="Schedule Change">Schedule Change</SelectItem>
                <SelectItem value="Concern">Academic Concern</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="message">Message</Label>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => useTemplate('progress')}>
                  Progress Template
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => useTemplate('reminder')}>
                  Reminder Template
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => useTemplate('concern')}>
                  Concern Template
                </Button>
              </div>
            </div>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={messageData.message}
              onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
              rows={8}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!messageData.subject || !messageData.message}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageModal;
