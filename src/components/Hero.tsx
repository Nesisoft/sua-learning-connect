
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              🚀 Trusted by 1000+ families across Ghana
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connect with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {" "}verified tutors
              </span>
              {" "}for your child
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Sua bridges parents with trusted, professional tutors for personalized home and virtual tuition. 
              Give your child the academic support they deserve — safely and efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Find a Tutor
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
                Become a Tutor
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                </div>
                <span className="text-sm text-gray-600">500+ active tutors</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold">4.9/5</span>
                <span className="text-sm text-gray-600">rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Shield className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Verified Tutors</h3>
                  <p className="text-sm text-gray-600">ID & certificate verified</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Home & Virtual</h3>
                  <p className="text-sm text-gray-600">Flexible learning modes</p>
                </div>
              </div>
              <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Next Lesson</h4>
                    <p className="text-sm text-gray-600">Mathematics • 4:00 PM</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Join
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Floating elements for visual appeal */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
