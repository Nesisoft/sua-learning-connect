
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Shield, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (userType: string) => {
    // Mock login - in real app, this would authenticate with backend
    console.log(`Logging in as ${userType} with email: ${email}`);
    
    // Navigate to appropriate dashboard
    switch (userType) {
      case 'parent':
        navigate('/dashboard/parent');
        break;
      case 'tutor':
        navigate('/dashboard/tutor');
        break;
      case 'admin':
        navigate('/dashboard/admin');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Sua</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Choose your account type and sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="parent" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="parent" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Parent
                </TabsTrigger>
                <TabsTrigger value="tutor" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Tutor
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              {["parent", "tutor", "admin"].map((userType) => (
                <TabsContent key={userType} value={userType} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`email-${userType}`}>Email</Label>
                    <Input
                      id={`email-${userType}`}
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`password-${userType}`}>Password</Label>
                    <Input
                      id={`password-${userType}`}
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleLogin(userType)}
                  >
                    Sign In as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
