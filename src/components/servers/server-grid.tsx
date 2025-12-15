"use client";

import { motion } from "framer-motion";
import type { MCPServer } from "@/types";
import { ServerCard } from "./server-card";

interface ServerGridProps {
  servers: MCPServer[];
  onSave?: (server: MCPServer) => void;
  onUnsave?: (serverId: string) => void;
  savedServerIds?: string[];
  showSaveButton?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export function ServerGrid({
  servers,
  onSave,
  onUnsave,
  savedServerIds = [],
  showSaveButton = false,
}: ServerGridProps) {
  if (servers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="rounded-full bg-muted p-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-1">No servers found</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {servers.map((server, index) => (
        <ServerCard
          key={server.id}
          server={server}
          onSave={onSave}
          onUnsave={onUnsave}
          isSaved={savedServerIds.includes(server.id)}
          showSaveButton={showSaveButton}
          index={index}
        />
      ))}
    </motion.div>
  );
}
