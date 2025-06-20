
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Clock, 
  MapPin, 
  Video, 
  CreditCard, 
  Star, 
  BookOpen,
  Home
} from "lucide-react";

const Features = () => {
  const parentFeatures = [
    {
      icon: Users,
      title: "Ward Management",
      description: "Add and manage multiple children's learning profiles in one place"
    },
    {
      icon: MapPin,
      title: "Smart Tutor Matching",
      description: "Find tutors by location, rating, subject expertise, and availability"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book lessons at your convenience with automated reminders"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Pay safely with mobile money, cards, or bank transfers"
    }
  ];

  const tutorFeatures = [
    {
      icon: Shield,
      title: "Verification System",
      description: "Get verified with ID and certificates for increased trust"
    },
    {
      icon: BookOpen,
      title: "Lesson Planning",
      description: "Create and manage weekly lesson plans for each student"
    },
    {
      icon: Star,
      title: "Rating & Reviews",
      description: "Build your reputation with parent feedback and reviews"
    },
    {
      icon: CreditCard,
      title: "Earnings Dashboard",
      description: "Track your earnings and manage withdrawal requests"
    }
  ];

  const coreFeatures = [
    {
      icon: Home,
      title: "Home Tutoring",
      description: "Professional tutors come to your home for personalized learning"
    },
    {
      icon: Video,
      title: "Virtual Sessions",
      description: "Online tutoring sessions for flexible learning anywhere"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "All tutors are background-checked and verified professionals"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">
            Why Choose Sua?
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need for successful tutoring
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides comprehensive tools for parents, tutors, and students to create 
            the perfect learning environment.
          </p>
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-100 to-green-100 rounded-full w-fit">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Parent & Tutor Features */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Parents */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              For Parents
            </h3>
            <div className="space-y-4">
              {parentFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* For Tutors */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 text-green-600 mr-2" />
              For Tutors
            </h3>
            <div className="space-y-4">
              {tutorFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <feature.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
