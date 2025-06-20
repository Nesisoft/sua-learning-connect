
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Users, BookOpen, Shield, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleSocialLogin = (provider: 'google' | 'facebook', userType: 'parent' | 'tutor') => {
    console.log(`${provider} login for ${userType}`);
    // Mock social login - in real app, this would authenticate with provider
    navigate(userType === 'parent' ? '/dashboard/parent' : '/dashboard/tutor');
  };

  const handleEmailRegistration = (e: React.FormEvent, userType: 'parent' | 'tutor') => {
    e.preventDefault();
    console.log(`Email registration for ${userType}:`, formData);
    // Mock registration - in real app, this would register with backend
    navigate(userType === 'parent' ? '/dashboard/parent' : '/dashboard/tutor');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const RegistrationForm = ({ userType }: { userType: 'parent' | 'tutor' }) => (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          {userType === 'parent' ? (
            <Users className="h-8 w-8 text-blue-600" />
          ) : (
            <Shield className="h-8 w-8 text-green-600" />
          )}
        </div>
        <CardTitle className="text-xl">
          Register as {userType === 'parent' ? 'Parent' : 'Tutor'}
        </CardTitle>
        <CardDescription>
          Choose your preferred registration method
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Social Login Buttons */}
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

        {/* Email Registration Form */}
        <form onSubmit={(e) => handleEmailRegistration(e, userType)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button 
            type="submit" 
            className={`w-full ${userType === 'parent' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            <Mail className="w-4 h-4 mr-2" />
            Register with Email
          </Button>
        </form>

        <div className="text-center pt-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedUserType(null)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to options
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedUserType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Sua</span>
            </Link>
          </div>
          <RegistrationForm userType={selectedUserType as 'parent' | 'tutor'} />
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Sua</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Community</h1>
          <p className="text-gray-600">Choose your role to get started with Sua</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedUserType('parent')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">I'm a Parent</CardTitle>
              <CardDescription>
                Find trusted tutors for your child's academic success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Find verified tutors in your area</li>
                <li>• Schedule flexible lessons</li>
                <li>• Track your child's progress</li>
                <li>• Secure payment system</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Register as Parent
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedUserType('tutor')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">I'm a Tutor</CardTitle>
              <CardDescription>
                Share your knowledge and earn while teaching students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Set your own schedule and rates</li>
                <li>• Get matched with students</li>
                <li>• Secure and timely payments</li>
                <li>• Build your teaching reputation</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Register as Tutor
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
