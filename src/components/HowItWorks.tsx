
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, Calendar, BookOpen } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Find Your Tutor",
      description: "Browse verified tutors by subject, location, and availability. Read reviews and compare profiles.",
      color: "blue"
    },
    {
      step: "02",
      icon: UserCheck,
      title: "Book & Connect",
      description: "Select your preferred tutor and schedule a trial session. Pay the commitment fee to secure your match.",
      color: "green"
    },
    {
      step: "03",
      icon: Calendar,
      title: "Schedule Lessons",
      description: "Set up regular lesson times that work for your family. Get automated reminders and updates.",
      color: "purple"
    },
    {
      step: "04",
      icon: BookOpen,
      title: "Start Learning",
      description: "Begin your personalized learning journey with progress tracking and regular feedback.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-4">
            Simple Process
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Sua Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with personalized tutoring in just four simple steps. 
            We make it easy to find, book, and learn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-2 border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <div className={`mx-auto mb-4 p-4 rounded-full w-fit border-2 ${getColorClasses(step.color)} group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 bg-white shadow-sm text-gray-700 font-bold"
                  >
                    {step.step}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-gray-600">
                  {step.description}
                </CardDescription>
              </CardContent>

              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Find a Tutor Now
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Apply to Teach
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
