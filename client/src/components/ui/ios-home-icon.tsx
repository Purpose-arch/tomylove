import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface IOSHomeIconProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  className?: string;
}

export function IOSHomeIcon({ icon, label, href, className }: IOSHomeIconProps) {
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
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <span className="text-xs text-[#000000]">{label}</span>
      </motion.a>
    </Link>
  );
}
