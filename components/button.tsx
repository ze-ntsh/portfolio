import { cascadia } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";


interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  hoverStyle?: any;
}

export const Button = ({children, onClick, className, hoverStyle, ...props}: ButtonProps) => {
  return (
    <motion.button className={cn('bg-[--foreground] text-[--text-inverse] px-4 py-2', cascadia.className, className)}
      whileHover={{
        background: 'var(--accent)',
        color: 'var(--text-primary)',
        boxShadow: '3px 3px 0 var(--text-primary)',
        ...hoverStyle
      }}
      transition={{
        duration: 0.1,
        bounce: 0.5,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}