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
      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
        <IOSHomeIcon
          href="/reasons"
          icon={<Heart className="w-12 h-12 text-pink-500 fill-current" />}
        />
        <IOSHomeIcon
          href="/photos"
          icon={<Camera className="w-12 h-12 text-pink-400" />}
        />
        <IOSHomeIcon
          href="/mail"
          icon={<Mail className="w-12 h-12 text-pink-600" />}
        />
        <IOSHomeIcon
          href={isUnlocked ? "/locked" : "#"}
          icon={isUnlocked ? 
            <Unlock className="w-12 h-12 text-pink-500" /> : 
            <Lock className="w-12 h-12 text-gray-400" />
          }
          className={!isUnlocked ? "opacity-50" : ""}
        />
      </div>
    </div>
  );
}