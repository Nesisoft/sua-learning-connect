
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Search, 
  ArrowLeft,
  LogOut,
  MessageCircle
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Messages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Determine user type based on route state or current user
  const userType = location.state?.userType || "tutor"; // Default to tutor for demo

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

  const handleContactClick = (contact: any) => {
    navigate("/conversation", { 
      state: { 
        userType, 
        contact,
        contactId: contact.id
      } 
    });
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-xl">Your Conversations</CardTitle>
            </div>
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
              <div className="space-y-1 p-4">
                {filteredContacts.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No conversations found</p>
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-gray-100"
                      onClick={() => handleContactClick(contact)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
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
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{contact.timestamp}</span>
                            {contact.unread > 0 && (
                              <Badge variant="default" className="h-5 w-5 p-0 text-xs rounded-full bg-blue-600">
                                {contact.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">{contact.lastMessage}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {contact.subject}
                          </Badge>
                          <span className="text-xs text-blue-600 font-medium">
                            {contact.type === "tutor" ? "Tutor" : "Student"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
