import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { IOSButton } from "@/components/ui/ios-button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Message } from "@shared/schema";

export default function MailPage() {
  const [, navigate] = useLocation();
  const { isAuthenticated, unlockApp } = useAuth();

  const { data: messages } = useQuery<Message[]>({
    queryKey: ["/api/messages"]
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    unlockApp("mail");
  }, [isAuthenticated, navigate, unlockApp]);

  return (
    <div className="min-h-screen bg-[#F2F2F7] p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Mail</h1>
          <IOSButton variant="ghost" onClick={() => navigate("/home")}>Back</IOSButton>
        </div>

        <div className="space-y-4">
          {messages?.map((message, i) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{message.subject}</h3>
                    <span className="text-sm text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{message.content}</p>
                  <p className="text-sm text-gray-500">From: {message.sender}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}