"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server,
  Terminal,
  Globe,
  Radio,
  Star,
  Download,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { MCPServer } from "@/types";
import { serverTypeColors, sourceColors } from "@/lib/config";
import { getCategoryById } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SaveButton } from "./save-button";

interface ServerCardProps {
  server: MCPServer;
  onSave?: (server: MCPServer) => void;
  onUnsave?: (serverId: string) => void;
  isSaved?: boolean;
  showSaveButton?: boolean;
  index?: number;
}

const typeIcons = {
  stdio: Terminal,
  http: Globe,
  sse: Radio,
};

export function ServerCard({
  server,
  showSaveButton = true,
  index = 0,
}: ServerCardProps) {
  const TypeIcon = typeIcons[server.type];
  const category = getCategoryById(server.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
    <Card className="group relative flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50">
      {/* Save button - positioned in top right */}
      {showSaveButton && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <SaveButton serverId={server.id} />
        </div>
      )}

      {/* Featured badge */}
      {server.featured && (
        <div className={cn(
          "absolute -top-2 z-10",
          showSaveButton ? "-right-2" : "-right-2"
        )}>
          <Badge className="bg-yellow-500 text-yellow-950 hover:bg-yellow-500">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Server className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Link
                href={`/servers/${server.slug}`}
                className="font-semibold hover:text-primary transition-colors line-clamp-1"
              >
                {server.name}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", serverTypeColors[server.type])}
                      >
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {server.type}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Server type: {server.type}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {server.verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified server</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {server.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {category && (
            <Badge variant="secondary" className="text-xs">
              {category.name}
            </Badge>
          )}
          <Badge
            variant="outline"
            className={cn("text-xs", sourceColors[server.source])}
          >
            {server.source}
          </Badge>
          {server.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {server.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{server.tags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {server.stats?.stars !== undefined && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {server.stats.stars.toLocaleString()}
            </span>
          )}
          {server.stats?.downloads !== undefined && (
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {server.stats.downloads.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {server.repository && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a
                      href={server.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View repository</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Button size="sm" asChild>
            <Link href={`/servers/${server.slug}`}>View</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
    </motion.div>
  );
}
