import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { IOSButton } from "@/components/ui/ios-button";
import { motion } from "framer-motion";

export default function LockedPage() {
  const [, navigate] = useLocation();
  const { isAuthenticated, areAllAppsUnlocked } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !areAllAppsUnlocked()) {
      navigate("/home");
    }
  }, [isAuthenticated, areAllAppsUnlocked, navigate]);

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{
            background: [
              "#FF0000",
              "#00FF00", 
              "#0000FF",
              "#FF0000"
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 rounded-full mx-auto mb-8"
        />
        
        <h1 className="text-3xl font-bold mb-4">
          You've unlocked everything!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for exploring all the apps ❤️
        </p>

        <IOSButton onClick={() => navigate("/home")}>
          Back to Home
        </IOSButton>
      </motion.div>
    </div>
  );
}
