import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { IOSHomeIcon } from "@/components/ui/ios-home-icon";
import { Heart, Camera, Mail, Lock, Unlock } from "lucide-react";

export default function HomePage() {
  const [, navigate] = useLocation();
  const { isAuthenticated, areAllAppsUnlocked } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const isUnlocked = areAllAppsUnlocked();

  return (
    <div className="min-h-screen bg-[#FFF0F5] p-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <IOSHomeIcon
          href="/reasons"
          icon={<Heart className="w-8 h-8 text-pink-500 fill-current" />}
          label="Reasons"
        />
        <IOSHomeIcon
          href="/photos"
          icon={<Camera className="w-8 h-8 text-pink-400" />}
          label="Photos"
        />
        <IOSHomeIcon
          href="/mail"
          icon={<Mail className="w-8 h-8 text-pink-600" />}
          label="Mail"
        />
        <IOSHomeIcon
          href={isUnlocked ? "/locked" : "#"}
          icon={isUnlocked ? 
            <Unlock className="w-8 h-8 text-pink-500" /> : 
            <Lock className="w-8 h-8 text-gray-500" />
          }
          label={isUnlocked ? "Open" : "Locked"}
          className={!isUnlocked ? "opacity-50" : ""}
        />
      </div>
    </div>
  );
}