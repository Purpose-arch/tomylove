import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { IOSButton } from "@/components/ui/ios-button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Reason } from "@shared/schema";

export default function ReasonsPage() {
  const [, navigate] = useLocation();
  const { isAuthenticated, unlockApp } = useAuth();

  const { data: reasons } = useQuery<Reason[]>({
    queryKey: ["api/reasons"]
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    unlockApp("reasons");
  }, [isAuthenticated, navigate, unlockApp]);

  return (
    <div className="min-h-screen bg-[#F2F2F7] p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Reasons</h1>
          <IOSButton variant="ghost" onClick={() => navigate("/home")}>Back</IOSButton>
        </div>

        {reasons?.map((reason, i) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <p className="text-lg">{reason.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}