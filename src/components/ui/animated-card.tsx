"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  delay?: number;
}

export function AnimatedCard({
  children,
  className,
  hoverScale = 1.02,
  hoverY = -4,
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { duration: 0.2 },
      }}
      className={cn(
        "transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCardGrid({
  children,
  className,
  staggerDelay = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCardItem({
  children,
  className,
  hoverScale = 1.02,
  hoverY = -4,
}: {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { duration: 0.2 },
      }}
      className={cn(
        "transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
