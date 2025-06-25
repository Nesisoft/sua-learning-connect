
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ArrowLeft,
  LogOut,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Conversation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user type and contact from navigation state
  const userType = location.state?.userType || "tutor";
  const contact = location.state?.contact || {
    id: 1,
    name: "Unknown Contact",
    type: "student",
    subject: "General"
  };

  // Mock messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: contact.name,
      text: "Hello! I have a question about today's lesson.",
      timestamp: "2:30 PM",
      isCurrentUser: false
    },
    {
      id: 2,
      sender: userType === "tutor" ? "Dr. Kwame Asante" : "Mrs. Johnson",
      text: "Hi! I'm happy to help. What would you like to know?",
      timestamp: "2:32 PM",
      isCurrentUser: true
    },
    {
      id: 3,
      sender: contact.name,
      text: "I'm having trouble understanding the quadratic equations we covered. Could you explain it again?",
      timestamp: "2:35 PM",
      isCurrentUser: false
    },
    {
      id: 4,
      sender: userType === "tutor" ? "Dr. Kwame Asante" : "Mrs. Johnson",
      text: "Of course! A quadratic equation is any equation that can be written in the form ax² + bx + c = 0. Let me break it down step by step for you.",
      timestamp: "2:37 PM",
      isCurrentUser: true
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: userType === "tutor" ? "Dr. Kwame Asante" : "Mrs. Johnson",
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response = {
          id: messages.length + 2,
          sender: contact.name,
          text: "Thank you! That helps a lot. I'll practice more problems.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleBackClick = () => {
    navigate('/messages', { state: { userType } });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCall = () => {
    console.log(`Calling ${contact.name}...`);
    // Simulate call functionality
  };

  const handleVideoCall = () => {
    console.log(`Starting video call with ${contact.name}...`);
    // Simulate video call functionality
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold text-gray-900">Sua</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                {userType === "tutor" ? "Tutor" : "Parent"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
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

      {/* Chat Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {contact.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-gray-900">{contact.name}</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {contact.subject}
                </Badge>
                <span className="text-xs text-blue-600 font-medium">
                  {contact.type === "tutor" ? "Tutor" : "Student"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCall}>
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleVideoCall}>
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
        <Card className="h-full rounded-none border-0 border-x">
          <CardContent className="p-0 h-full flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.isCurrentUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      <p className="text-sm">Typing...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Conversation;
