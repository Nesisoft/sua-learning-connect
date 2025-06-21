
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BookOpen, Clock, Star } from "lucide-react";

interface StudentProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: number;
    name: string;
    grade: string;
    subject: string;
    progress: number;
  };
}

const StudentProgressModal = ({ isOpen, onClose, student }: StudentProgressModalProps) => {
  const mockProgressData = {
    overallProgress: student.progress,
    weeklyLessons: 3,
    totalHours: 24,
    averageScore: 87,
    recentTopics: [
      { topic: "Algebra Basics", completion: 95, score: 92 },
      { topic: "Quadratic Equations", completion: 80, score: 85 },
      { topic: "Functions", completion: 60, score: 78 }
    ],
    strengths: ["Problem Solving", "Quick Learning", "Consistent Practice"],
    improvements: ["Formula Memorization", "Word Problems", "Time Management"]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            {student.name} - Progress Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{mockProgressData.overallProgress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{mockProgressData.weeklyLessons}</div>
                <div className="text-sm text-gray-600">Lessons/Week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{mockProgressData.totalHours}</div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{mockProgressData.averageScore}</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Topics</CardTitle>
              <CardDescription>Progress on recent learning topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProgressData.recentTopics.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{topic.topic}</span>
                      <Badge variant={topic.completion >= 80 ? "default" : "secondary"}>
                        {topic.score}% Score
                      </Badge>
                    </div>
                    <Progress value={topic.completion} className="h-2" />
                    <div className="text-sm text-gray-600">{topic.completion}% Complete</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Areas for Improvement */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockProgressData.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-green-600" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockProgressData.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-orange-600" />
                      <span>{improvement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button>Download Report</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProgressModal;
