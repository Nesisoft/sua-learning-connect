
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Upload, User, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const TutorProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
    region: "",
    qualification: "",
    subjects: "",
    experience: "",
    hourlyRate: "",
    bio: "",
    availability: ""
  });
  const [documents, setDocuments] = useState({
    certificate: null as File | null,
    idCard: null as File | null,
    cv: null as File | null
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Tutor profile setup:", { formData, documents });
      // Mock profile completion - in real app, this would upload documents and update backend
      navigate('/dashboard/tutor');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = (type: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="e.g., +233 24 123 4567"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          name="address"
          placeholder="Street address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City/Town *</Label>
          <Input
            id="city"
            name="city"
            placeholder="e.g., Accra"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">Region *</Label>
          <Input
            id="region"
            name="region"
            placeholder="e.g., Greater Accra"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="qualification">Highest Qualification *</Label>
        <Input
          id="qualification"
          name="qualification"
          placeholder="e.g., Bachelor's in Mathematics"
          value={formData.qualification}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjects">Subjects You Teach *</Label>
        <Input
          id="subjects"
          name="subjects"
          placeholder="e.g., Mathematics, Physics, Chemistry"
          value={formData.subjects}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience *</Label>
          <Input
            id="experience"
            name="experience"
            type="number"
            placeholder="e.g., 3"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly Rate (GHS) *</Label>
          <Input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            placeholder="e.g., 25"
            value={formData.hourlyRate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Brief Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell parents about your teaching style and experience..."
          value={formData.bio}
          onChange={handleChange}
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
        <h3 className="font-semibold text-gray-900 mb-1">Document Verification Required</h3>
        <p className="text-sm text-gray-600">Upload your documents for verification. This helps build trust with parents.</p>
      </div>

      {[
        { key: 'certificate', label: 'Educational Certificate', required: true },
        { key: 'idCard', label: 'National ID Card', required: true },
        { key: 'cv', label: 'CV/Resume', required: false }
      ].map((doc) => (
        <div key={doc.key} className="space-y-2">
          <Label className="flex items-center gap-2">
            {doc.label}
            {doc.required && <span className="text-red-500">*</span>}
            {documents[doc.key as keyof typeof documents] && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <div className="space-y-2">
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(doc.key as keyof typeof documents, e.target.files?.[0] || null)}
                className="hidden"
                id={`file-${doc.key}`}
              />
              <Label htmlFor={`file-${doc.key}`} className="cursor-pointer">
                <Button variant="outline" type="button" asChild>
                  <span>
                    {documents[doc.key as keyof typeof documents] ? 'Change File' : 'Choose File'}
                  </span>
                </Button>
              </Label>
              {documents[doc.key as keyof typeof documents] && (
                <p className="text-sm text-gray-600">
                  {documents[doc.key as keyof typeof documents]!.name}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Verification Process</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your documents will be reviewed by our admin team within 24-48 hours. 
              You'll receive an email once your profile is approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Sua</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Tutor Profile</h1>
          <p className="text-gray-600">Step {currentStep} of 3</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <CardTitle>
                  {currentStep === 1 && "Contact Information"}
                  {currentStep === 2 && "Teaching Details"}
                  {currentStep === 3 && "Document Upload"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Let's start with your basic contact details"}
                  {currentStep === 2 && "Tell us about your teaching expertise"}
                  {currentStep === 3 && "Upload your verification documents"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex gap-3 pt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={currentStep === 3 && (!documents.certificate || !documents.idCard)}
                >
                  {currentStep < 3 ? 'Continue' : 'Submit for Review'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorProfileSetup;
