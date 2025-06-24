
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Send, 
  Phone, 
  Video, 
  Search, 
  MoreVertical, 
  ArrowLeft,
  Paperclip,
  Smile,
  LogOut
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine user type based on route state or current user
  const userType = location.state?.userType || "tutor"; // Default to tutor for demo
  const recipient = location.state?.recipient;

  // Mock contacts data
  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      type: userType === "tutor" ? "student" : "tutor",
      avatar: "/placeholder.svg",
      lastMessage: "Thank you for the lesson today!",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      subject: "Mathematics"
    },
    {
      id: 2,
      name: "Dr. Kwame Asante",
      type: userType === "parent" ? "tutor" : "student",
      avatar: "/placeholder.svg",
      lastMessage: "Let's reschedule tomorrow's session",
      timestamp: "15 min ago",
      unread: 0,
      online: true,
      subject: "Physics"
    },
    {
      id: 3,
      name: "Alex Mensah",
      type: userType === "tutor" ? "student" : "tutor",
      avatar: "/placeholder.svg",
      lastMessage: "I have a question about the homework",
      timestamp: "1 hour ago",
      unread: 1,
      online: false,
      subject: "Chemistry"
    },
    {
      id: 4,
      name: "Emma Ofori",
      type: userType === "tutor" ? "student" : "tutor",
      avatar: "/placeholder.svg",
      lastMessage: "Great progress this week!",
      timestamp: "2 hours ago",
      unread: 0,
      online: true,
      subject: "English"
    }
  ];

  // Mock messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 1,
      senderName: "Sarah Johnson",
      content: "Hi! I wanted to thank you for today's lesson. The algebra concepts are much clearer now.",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: 2,
      senderId: "me",
      senderName: "Me",
      content: "I'm so glad to hear that! You're making excellent progress. Keep practicing those problems I gave you.",
      timestamp: "10:32 AM",
      type: "text"
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Sarah Johnson",
      content: "Will do! Can we go over quadratic equations in our next session?",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: 4,
      senderId: "me",
      senderName: "Me",
      content: "Absolutely! I'll prepare some examples for you. See you tomorrow at 4 PM.",
      timestamp: "10:37 AM",
      type: "text"
    }
  ]);

  useEffect(() => {
    // Auto-select contact if coming from another page
    if (recipient && contacts.length > 0) {
      const contact = contacts.find(c => c.name === recipient);
      if (contact) {
        setSelectedContact(contact);
      }
    } else if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [recipient, contacts, selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;

    const newMessage = {
      id: Date.now(),
      senderId: "me",
      senderName: "Me",
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    toast.success("Message sent!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCall = () => {
    if (!selectedContact) return;
    toast.success(`Calling ${selectedContact.name}...`);
    setTimeout(() => {
      toast.info("Call connected");
    }, 1500);
  };

  const handleVideoCall = () => {
    if (!selectedContact) return;
    toast.success(`Starting video call with ${selectedContact.name}...`);
    setTimeout(() => {
      toast.info("Video call connected");
    }, 1500);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackClick = () => {
    if (userType === "tutor") {
      navigate("/dashboard/tutor");
    } else {
      navigate("/dashboard/parent");
    }
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
              <span className="hidden sm:block text-gray-700 text-sm">Messages</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
          {/* Contacts List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Messages</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-1 p-2">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContact?.id === contact.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {contact.name}
                          </p>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">{contact.timestamp}</span>
                            {contact.unread > 0 && (
                              <Badge variant="default" className="h-5 w-5 p-0 text-xs rounded-full bg-blue-600">
                                {contact.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{contact.subject}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedContact.avatar} />
                          <AvatarFallback>
                            {selectedContact.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedContact.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedContact.name}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedContact.online ? "Online" : "Last seen 2 hours ago"} • {selectedContact.subject}
                        </p>
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
                </CardHeader>

                {/* Messages */}
                <CardContent className="p-0 flex flex-col h-[calc(100vh-20rem)]">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.senderId === "me"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                msg.senderId === "me" ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1">
                        <Input
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="border-0 focus-visible:ring-0 shadow-none"
                        />
                      </div>
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                  <p className="text-gray-600">Choose a contact to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
