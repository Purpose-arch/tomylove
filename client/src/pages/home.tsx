import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { IOSHomeIcon } from "@/components/ui/ios-home-icon";
import { Heart, Camera, Mail, Lock } from "lucide-react";

export default function HomePage() {
  const [, navigate] = useLocation();
  const { isAuthenticated, areAllAppsUnlocked } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#F2F2F7] p-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <IOSHomeIcon
          href="/reasons"
          icon={<Heart className="w-8 h-8 text-red-500" />}
          label="Reasons"
        />
        <IOSHomeIcon
          href="/photos"
          icon={<Camera className="w-8 h-8 text-[#34C759]" />}
          label="Photos"
        />
        <IOSHomeIcon
          href="/mail"
          icon={<Mail className="w-8 h-8 text-[#007AFF]" />}
          label="Mail"
        />
        <IOSHomeIcon
          href={areAllAppsUnlocked() ? "/locked" : "#"}
          icon={<Lock className="w-8 h-8 text-gray-500" />}
          label="Locked"
          className={!areAllAppsUnlocked() ? "opacity-50" : ""}
        />
      </div>
    </div>
  );
}
