import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { IOSButton } from "@/components/ui/ios-button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Message } from "@shared/schema";

const FULL_MESSAGES: Record<string, string> = {
  "Miss you": `Любимая,

Я так скучаю по тебе каждую минуту. Твоя улыбка освещает мой мир, а твой смех делает каждый день особенным. Не могу дождаться нашей следующей встречи.

Ты - самое прекрасное, что случилось в моей жизни. Каждый момент с тобой - это счастье.

С любовью,
Егор ❤️`,

  "Our plans": `Дорогая,

Я так взволнован нашими планами на следующую неделю! Представляю, как мы будем гулять вместе, держаться за руки и наслаждаться каждым моментом.

У меня столько идей для нашего времени вместе. Хочу сделать каждую минуту особенной для тебя.

Твой Егор 💑`,

  "Love you": `Моя любимая,

Просто хотел сказать, как сильно я тебя люблю. Ты - мое вдохновение, моя радость, мое все. Каждый день благодарю судьбу за то, что ты есть в моей жизни.

Ты делаешь меня счастливым просто тем, что ты есть. Люблю тебя бесконечно.

Навсегда твой,
Егор 💖`
};

export default function MailPage() {
  const [, navigate] = useLocation();
  const { isAuthenticated, unlockApp } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

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
    <div className="min-h-screen bg-[#FFF0F5] p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-pink-600">Mail</h1>
          <IOSButton variant="ghost" onClick={() => navigate("/home")}>Back</IOSButton>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {messages?.map((message, i) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedMessage(message)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-pink-600">{message.subject}</h3>
                      <span className="text-sm text-pink-400">{message.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.content}</p>
                    <p className="text-sm text-pink-500">From: {message.sender}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-pink-600">{selectedMessage?.subject}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p className="whitespace-pre-wrap text-gray-700">
                {selectedMessage && FULL_MESSAGES[selectedMessage.subject]}
              </p>
              <p className="text-sm text-pink-500">From: {selectedMessage?.sender}</p>
              <p className="text-sm text-pink-400">{selectedMessage?.date}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}