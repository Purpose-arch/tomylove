import { useEffect } from "react";
import { useLocation } from "wouter";
import { IOSPinPad } from "@/components/ui/ios-pin-pad";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function PinPage() {
  const [, navigate] = useLocation();
  const { checkPin, authenticate } = useAuth();
  const { toast } = useToast();

  const handlePinSubmit = (pin: string) => {
    if (checkPin(pin)) {
      authenticate();
      navigate("/home");
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect PIN",
        description: "Please try again"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-8">Enter PIN</h1>
      <IOSPinPad onSubmit={handlePinSubmit} />
    </div>
  );
}
