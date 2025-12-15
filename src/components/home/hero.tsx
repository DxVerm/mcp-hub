"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber, AnimatedPercentage } from "@/components/ui/animated-number";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, `${Math.random() * 100}%`],
              x: [null, `${Math.random() * 100}%`],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/30 bg-primary/5"
            >
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              Open Source MCP Registry
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={fadeInUp}
          >
            Discover & Install{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              MCP Servers
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            The community-driven registry for Model Context Protocol servers.
            Find the perfect MCP servers for Claude Code and install them with one click.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeInUp}
          >
            <Button size="lg" asChild className="group">
              <Link href="/categories">
                Browse Servers
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/submit">
                Submit a Server
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            variants={fadeInUp}
          >
            <div className="text-center">
              <AnimatedNumber
                value={50}
                suffix="+"
                className="text-3xl font-bold text-primary"
              />
              <div className="text-sm text-muted-foreground mt-1">MCP Servers</div>
            </div>
            <div className="text-center">
              <AnimatedNumber
                value={12}
                className="text-3xl font-bold text-primary"
              />
              <div className="text-sm text-muted-foreground mt-1">Categories</div>
            </div>
            <div className="text-center">
              <AnimatedPercentage
                value={100}
                className="text-3xl font-bold text-primary"
              />
              <div className="text-sm text-muted-foreground mt-1">Open Source</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
