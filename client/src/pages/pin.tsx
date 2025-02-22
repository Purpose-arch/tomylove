import { useEffect } from "react";
import { useLocation } from "wouter";
import { IOSPinPad } from "@/components/ui/ios-pin-pad";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

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
    <div className="min-h-screen bg-[#FFF0F5] flex flex-col items-center justify-center p-4 love-bg">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-8"
      >
        <Heart className="w-16 h-16 text-pink-500 fill-current" />
      </motion.div>
      <IOSPinPad onSubmit={handlePinSubmit} />
    </div>
  );
}