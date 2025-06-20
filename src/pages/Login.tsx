
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Users, Shield, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSocialLogin = (provider: 'google' | 'facebook', userType: string) => {
    console.log(`${provider} login for ${userType}`);
    // Mock social login - in real app, this would authenticate with provider
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
                  {/* Social Login Buttons - Only for parent and tutor */}
                  {userType !== 'admin' && (
                    <>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleSocialLogin('google', userType)}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Continue with Google
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleSocialLogin('facebook', userType)}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Continue with Facebook
                        </Button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email/Password Form */}
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
