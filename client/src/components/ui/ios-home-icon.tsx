import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface IOSHomeIconProps {
  icon: React.ReactNode;
  href: string;
  className?: string;
}

export function IOSHomeIcon({ icon, href, className }: IOSHomeIconProps) {
  return (
    <Link href={href}>
      <motion.a
        className={cn(
          "flex flex-col items-center space-y-1 cursor-pointer",
          className
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-24 h-24 rounded-3xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-pink-100">
          {icon}
        </div>
      </motion.a>
    </Link>
  );
}