"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

import type { MCPServer } from "@/types";
import { Button } from "@/components/ui/button";
import { ServerCard } from "@/components/servers/server-card";

interface FeaturedServersProps {
  servers: MCPServer[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturedServers({ servers }: FeaturedServersProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </motion.div>
              <h2 className="text-2xl font-bold md:text-3xl">Featured Servers</h2>
            </div>
            <p className="text-muted-foreground">
              Hand-picked MCP servers recommended by the community
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/categories">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Server Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servers.slice(0, 6).map((server, index) => (
            <ServerCard key={server.id} server={server} index={index} />
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center sm:hidden"
        >
          <Button variant="outline" asChild>
            <Link href="/categories">
              View all servers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
