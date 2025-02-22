import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { IOSButton } from "@/components/ui/ios-button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Photo } from "@shared/schema";

export default function PhotosPage() {
  const [, navigate] = useLocation();
  const { isAuthenticated, unlockApp } = useAuth();
  //baseUrl variable removed

  const { data: photos } = useQuery<Photo[]>({
    queryKey: ["api/photos"]
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    unlockApp("photos");
  }, [isAuthenticated, navigate, unlockApp]);

  return (
    <div className="min-h-screen bg-[#FFF0F5] p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Photos</h1>
          <IOSButton variant="ghost" onClick={() => navigate("/home")}>Back</IOSButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos?.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-0">
                  <img
                    src={photo.url}
                    alt={photo.description}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <p className="p-4 text-sm text-gray-600">{photo.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}