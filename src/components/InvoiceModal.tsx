
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Printer, Mail, Calendar, Clock, User, BookOpen, CreditCard, CheckCircle } from "lucide-react";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: {
    id: number;
    date: string;
    tutor: string;
    subject: string;
    amount: number;
    status: string;
  };
}

const InvoiceModal = ({ isOpen, onClose, payment }: InvoiceModalProps) => {
  const invoiceNumber = `INV-2024-${String(payment.id).padStart(4, '0')}`;
  const dueDate = new Date(payment.date);
  dueDate.setDate(dueDate.getDate() + 7);

  const handleDownload = () => {
    console.log("Downloading invoice:", invoiceNumber);
  };

  const handlePrint = () => {
    console.log("Printing invoice:", invoiceNumber);
  };

  const handleEmail = () => {
    console.log("Emailing invoice:", invoiceNumber);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Invoice Details
          </DialogTitle>
          <DialogDescription>Invoice {invoiceNumber}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">Sua</h2>
                  <p className="text-sm text-gray-600">Private Tutoring Services</p>
                  <p className="text-sm text-gray-600">Accra, Ghana</p>
                  <p className="text-sm text-gray-600">info@sua.edu.gh</p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold">INVOICE</h3>
                  <p className="text-sm text-gray-600">#{invoiceNumber}</p>
                  <Badge variant={payment.status === "paid" ? "default" : "secondary"} className="mt-2">
                    {payment.status === "paid" ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Paid</>
                    ) : (
                      <><Clock className="h-3 w-3 mr-1" /> Pending</>
                    )}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bill To & Invoice Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Bill To
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">John Johnson</p>
                  <p className="text-gray-600">123 Main Street</p>
                  <p className="text-gray-600">East Legon, Accra</p>
                  <p className="text-gray-600">john.johnson@email.com</p>
                  <p className="text-gray-600">+233 20 123 4567</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Invoice Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Invoice Date:</span>
                    <span>{payment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span>{dueDate.toISOString().split('T')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>Mobile Money</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Items */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Service Details
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-medium">Description</th>
                      <th className="text-right py-2 text-sm font-medium hidden sm:table-cell">Tutor</th>
                      <th className="text-right py-2 text-sm font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-sm">{payment.subject} Tutoring Session</p>
                          <p className="text-xs text-gray-600 sm:hidden">Tutor: {payment.tutor}</p>
                          <p className="text-xs text-gray-600">1 hour session</p>
                        </div>
                      </td>
                      <td className="text-right py-3 text-sm hidden sm:table-cell">{payment.tutor}</td>
                      <td className="text-right py-3 font-medium">GHS {payment.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>GHS {payment.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (0%):</span>
                  <span>GHS 0</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">GHS {payment.amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          {payment.status === "paid" && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Payment Received</h3>
                    <p className="text-sm text-green-700">This invoice has been paid in full.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handlePrint} className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleEmail} className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
