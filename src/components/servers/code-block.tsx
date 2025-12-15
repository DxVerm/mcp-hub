"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language = "json",
  title,
  className,
  showCopy = true,
}: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-lg border bg-muted/50", className)}>
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="text-sm font-medium">{title}</span>
          {showCopy && <CopyButton value={code} />}
        </div>
      )}
      <div className="relative">
        {!title && showCopy && (
          <CopyButton value={code} className="absolute right-2 top-2" />
        )}
        <pre
          className={cn(
            "overflow-x-auto p-4 text-sm",
            !title && showCopy && "pr-12"
          )}
        >
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
