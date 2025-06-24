
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Send, Search, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock chat data
  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      type: "student",
      lastMessage: "Thank you for today's lesson!",
      time: "2:30 PM",
      unread: 2,
      avatar: "/placeholder.svg",
      status: "online"
    },
    {
      id: 2,
      name: "Mrs. Johnson",
      type: "parent",
      lastMessage: "Can we reschedule tomorrow's lesson?",
      time: "1:45 PM",
      unread: 0,
      avatar: "/placeholder.svg",
      status: "offline"
    },
    {
      id: 3,
      name: "Alex Mensah",
      type: "student",
      lastMessage: "I have a question about the physics homework",
      time: "12:30 PM",
      unread: 1,
      avatar: "/placeholder.svg",
      status: "online"
    },
    {
      id: 4,
      name: "Mr. Mensah",
      type: "parent",
      lastMessage: "Alex's progress report looks great!",
      time: "Yesterday",
      unread: 0,
      avatar: "/placeholder.svg",
      status: "offline"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi! I wanted to ask about today's math lesson.",
      time: "2:25 PM",
      isSelf: false
    },
    {
      id: 2,
      sender: "You",
      content: "Hello Sarah! What would you like to know?",
      time: "2:26 PM",
      isSelf: true
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "I'm still confused about the quadratic equations. Could you explain it again?",
      time: "2:27 PM",
      isSelf: false
    },
    {
      id: 4,
      sender: "You",
      content: "Of course! Let me break it down step by step. A quadratic equation is in the form ax² + bx + c = 0...",
      time: "2:28 PM",
      isSelf: true
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content: "Thank you for today's lesson!",
      time: "2:30 PM",
      isSelf: false
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    console.log("Sending message:", message);
    toast.success("Message sent successfully!");
    setMessage("");
  };

  const handleStartCall = () => {
    if (!selectedChat) return;
    console.log("Starting call with:", selectedChat.name);
    toast.success(`Starting call with ${selectedChat.name}...`);
  };

  const handleStartVideoCall = () => {
    if (!selectedChat) return;
    console.log("Starting video call with:", selectedChat.name);
    toast.success(`Starting video call with ${selectedChat.name}...`);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold text-gray-900">Sua</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">Messages</Badge>
            </div>
            <Link to="/dashboard/tutor">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Messages</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 p-4">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                            <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                              <Badge variant="outline" className="text-xs mt-1">
                                {chat.type}
                              </Badge>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              <span className="text-xs text-gray-500">{chat.time}</span>
                              {chat.unread > 0 && (
                                <Badge variant="default" className="bg-blue-600 text-xs">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 truncate">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                          <AvatarFallback>{selectedChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          selectedChat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedChat.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedChat.status === 'online' ? 'Online' : 'Last seen recently'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={handleStartCall}>
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleStartVideoCall}>
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${msg.isSelf ? 'order-2' : 'order-1'}`}>
                            <div
                              className={`p-3 rounded-lg ${
                                msg.isSelf
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-1">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500">
                    Choose a chat from the list to start messaging
                  </p>
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
