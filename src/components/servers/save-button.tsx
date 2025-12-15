"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSavedServers } from "@/hooks";

interface SaveButtonProps {
  serverId: string;
  className?: string;
  variant?: "default" | "icon";
}

export function SaveButton({
  serverId,
  className,
  variant = "icon",
}: SaveButtonProps) {
  const { isServerSaved, toggleSaveServer } = useSavedServers();
  const isSaved = isServerSaved(serverId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveServer(serverId);
  };

  if (variant === "default") {
    return (
      <Button
        variant={isSaved ? "default" : "outline"}
        size="sm"
        onClick={handleClick}
        className={className}
      >
        <Heart
          className={cn(
            "h-4 w-4 mr-2",
            isSaved && "fill-current"
          )}
        />
        {isSaved ? "Saved" : "Save"}
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className={cn(
              "h-8 w-8 shrink-0",
              isSaved && "text-red-500 hover:text-red-600",
              className
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all",
                isSaved && "fill-current scale-110"
              )}
            />
            <span className="sr-only">
              {isSaved ? "Remove from saved" : "Save server"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isSaved ? "Remove from saved" : "Save server"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
