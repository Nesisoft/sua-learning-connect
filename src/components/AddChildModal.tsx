
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, UserPlus } from "lucide-react";

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChildAdded: (child: any) => void;
}

const AddChildModal = ({ isOpen, onClose, onChildAdded }: AddChildModalProps) => {
  const [childData, setChildData] = useState({
    name: "",
    grade: "",
    age: "",
    school: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newChild = {
      id: Date.now(),
      name: childData.name,
      grade: childData.grade,
      subjects: []
    };

    console.log("Adding new child:", newChild);
    onChildAdded(newChild);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setChildData({
        name: "",
        grade: "",
        age: "",
        school: ""
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md text-center">
          <div className="py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Child Added Successfully!</h3>
            <p className="text-gray-600">
              {childData.name} has been added to your account.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            Add New Child
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter child's full name"
              value={childData.name}
              onChange={(e) => setChildData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Select value={childData.grade} onValueChange={(value) => setChildData(prev => ({ ...prev, grade: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 1">Grade 1</SelectItem>
                  <SelectItem value="Grade 2">Grade 2</SelectItem>
                  <SelectItem value="Grade 3">Grade 3</SelectItem>
                  <SelectItem value="Grade 4">Grade 4</SelectItem>
                  <SelectItem value="Grade 5">Grade 5</SelectItem>
                  <SelectItem value="Grade 6">Grade 6</SelectItem>
                  <SelectItem value="Grade 7">Grade 7</SelectItem>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="5"
                max="18"
                placeholder="Age"
                value={childData.age}
                onChange={(e) => setChildData(prev => ({ ...prev, age: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="school">School (Optional)</Label>
            <Input
              id="school"
              placeholder="Current school name"
              value={childData.school}
              onChange={(e) => setChildData(prev => ({ ...prev, school: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Child</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddChildModal;
