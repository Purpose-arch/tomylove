import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { IOSButton } from "@/components/ui/ios-button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

function FloatingHearts() {
  const hearts = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    delay: i * 0.5,
    left: `${Math.random() * 100}%`,
  }));

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="floating-heart absolute"
          initial={{ y: "100%", x: "-50%", opacity: 0 }}
          animate={{ 
            y: "-100%", 
            x: "50%",
            opacity: [0, 0.6, 0],
            transition: { 
              duration: 6,
              repeat: Infinity,
              delay: heart.delay 
            }
          }}
          style={{ left: heart.left }}
        >
          <Heart className="w-8 h-8 fill-current" />
        </motion.div>
      ))}
    </>
  );
}

export default function LockedPage() {
  const [, navigate] = useLocation();
  const { isAuthenticated, areAllAppsUnlocked } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !areAllAppsUnlocked()) {
      navigate("/home");
    }
  }, [isAuthenticated, areAllAppsUnlocked, navigate]);

  return (
    <div className="min-h-screen bg-[#FFF0F5] flex flex-col items-center justify-center p-4 love-bg relative overflow-hidden">
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8 text-4xl"
        >
          ❤️
        </motion.div>

        <h1 className="text-4xl font-bold mb-4 text-pink-600">
          Я люблю тебя ♥️
        </h1>
        <p className="text-xl text-pink-500 mb-8">
          Спасибо, что ты есть в моей жизни
        </p>

        <IOSButton onClick={() => navigate("/home")}>
          Вернуться домой
        </IOSButton>
      </motion.div>
    </div>
  );
}