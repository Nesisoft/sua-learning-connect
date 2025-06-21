
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Smartphone, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "bank" | "mobile";
  availableBalance: number;
}

const WithdrawalModal = ({ isOpen, onClose, type, availableBalance }: WithdrawalModalProps) => {
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    mobileNetwork: "",
    mobileNumber: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    console.log("Processing withdrawal:", { type, ...withdrawalData });
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setWithdrawalData({
        amount: "",
        bankName: "",
        accountNumber: "",
        accountName: "",
        mobileNetwork: "",
        mobileNumber: "",
      });
    }, 2000);
  };

  const fees = type === "bank" ? 2 : 1; // GHS 2 for bank, GHS 1 for mobile money
  const withdrawalAmount = parseFloat(withdrawalData.amount) || 0;
  const netAmount = withdrawalAmount - fees;

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md text-center">
          <div className="py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your withdrawal of GHS {withdrawalAmount} has been processed successfully.
            </p>
            <p className="text-sm text-gray-500">
              You should receive the funds within 24 hours.
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
            {type === "bank" ? (
              <CreditCard className="h-5 w-5 text-blue-600" />
            ) : (
              <Smartphone className="h-5 w-5 text-green-600" />
            )}
            Withdraw to {type === "bank" ? "Bank Account" : "Mobile Money"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Available Balance: GHS {availableBalance}
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="amount">Withdrawal Amount (GHS)</Label>
            <Input
              id="amount"
              type="number"
              min="10"
              max={available

              placeholder="Enter amount"
              value={withdrawalData.amount}
              onChange={(e) => setWithdrawalData(prev => ({ ...prev, amount: e.target.value }))}
              required
            />
            {withdrawalAmount > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>GHS {withdrawalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>GHS {fees}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-1">
                  <span>You'll receive:</span>
                  <span>GHS {netAmount}</span>
                </div>
              </div>
            )}
          </div>

          {type === "bank" ? (
            <>
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Select value={withdrawalData.bankName} onValueChange={(value) => setWithdrawalData(prev => ({ ...prev, bankName: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gcb">GCB Bank</SelectItem>
                    <SelectItem value="ecobank">Ecobank Ghana</SelectItem>
                    <SelectItem value="absa">Absa Bank Ghana</SelectItem>
                    <SelectItem value="access">Access Bank Ghana</SelectItem>
                    <SelectItem value="fidelity">Fidelity Bank Ghana</SelectItem>
                    <SelectItem value="cal">CAL Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={withdrawalData.accountNumber}
                  onChange={(e) => setWithdrawalData(prev => ({ ...prev, accountNumber: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  placeholder="Enter account holder name"
                  value={withdrawalData.accountName}
                  onChange={(e) => setWithdrawalData(prev => ({ ...prev, accountName: e.target.value }))}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="mobileNetwork">Mobile Network</Label>
                <Select value={withdrawalData.mobileNetwork} onValueChange={(value) => setWithdrawalData(prev => ({ ...prev, mobileNetwork: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                    <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                    <SelectItem value="airteltigo">AirtelTigo Money</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  placeholder="e.g., 0241234567"
                  value={withdrawalData.mobileNumber}
                  onChange={(e) => setWithdrawalData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isProcessing || withdrawalAmount < 10 || withdrawalAmount > availableBalance}
            >
              {isProcessing ? "Processing..." : `Withdraw GHS ${netAmount || 0}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawalModal;
