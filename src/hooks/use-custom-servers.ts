"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import type { CustomServer } from "@/types";

const CUSTOM_SERVERS_KEY = "mcp-hub-custom-servers";

export interface CustomServerInput {
  name: string;
  description: string;
  type: "stdio" | "http" | "sse";
  command?: string;
  args?: string[];
  url?: string;
  category: string;
  tags: string[];
  repository?: string;
  documentation?: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function useCustomServers() {
  const [customServers, setCustomServers] = useLocalStorage<CustomServer[]>(
    CUSTOM_SERVERS_KEY,
    []
  );

  const addCustomServer = useCallback(
    (input: CustomServerInput): CustomServer => {
      const id = generateId();
      const slug = generateSlug(input.name);
      const now = new Date().toISOString();

      const newServer: CustomServer = {
        id,
        slug,
        name: input.name,
        description: input.description,
        type: input.type,
        command: input.command,
        args: input.args,
        url: input.url,
        category: input.category,
        tags: input.tags,
        source: "custom",
        verified: false,
        repository: input.repository,
        documentation: input.documentation,
        install: {
          npm: input.command ? `npm install -g ${input.command}` : "N/A",
          npx: input.command ? `npx ${input.command}` : "N/A",
        },
        claudeConfig: generateClaudeConfig(input),
        createdAt: now,
        updatedAt: now,
      };

      setCustomServers((prev) => [...prev, newServer]);
      return newServer;
    },
    [setCustomServers]
  );

  const updateCustomServer = useCallback(
    (id: string, updates: Partial<CustomServerInput>) => {
      setCustomServers((prev) =>
        prev.map((server) => {
          if (server.id === id) {
            const updated = {
              ...server,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
            if (updates.name) {
              updated.slug = generateSlug(updates.name);
            }
            if (updates.command || updates.url || updates.args) {
              updated.claudeConfig = generateClaudeConfig({
                ...server,
                ...updates,
              } as CustomServerInput);
            }
            return updated;
          }
          return server;
        })
      );
    },
    [setCustomServers]
  );

  const deleteCustomServer = useCallback(
    (id: string) => {
      setCustomServers((prev) => prev.filter((server) => server.id !== id));
    },
    [setCustomServers]
  );

  const getCustomServerById = useCallback(
    (id: string): CustomServer | undefined => {
      return customServers.find((server) => server.id === id);
    },
    [customServers]
  );

  const getCustomServerBySlug = useCallback(
    (slug: string): CustomServer | undefined => {
      return customServers.find((server) => server.slug === slug);
    },
    [customServers]
  );

  const clearAllCustomServers = useCallback(() => {
    setCustomServers([]);
  }, [setCustomServers]);

  // Export custom servers as JSON
  const exportCustomServers = useCallback((): string => {
    return JSON.stringify(customServers, null, 2);
  }, [customServers]);

  // Import custom servers from JSON
  const importCustomServers = useCallback(
    (json: string, replace: boolean = false) => {
      try {
        const imported = JSON.parse(json) as CustomServer[];

        if (!Array.isArray(imported)) {
          throw new Error("Invalid format: expected an array");
        }

        // Validate each server has required fields
        for (const server of imported) {
          if (!server.name || !server.type || !server.category) {
            throw new Error("Invalid server: missing required fields");
          }
        }

        // Regenerate IDs to avoid conflicts
        const serversWithNewIds = imported.map((server) => ({
          ...server,
          id: generateId(),
          slug: generateSlug(server.name),
          source: "custom" as const,
          createdAt: server.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));

        if (replace) {
          setCustomServers(serversWithNewIds);
        } else {
          setCustomServers((prev) => [...prev, ...serversWithNewIds]);
        }

        return { success: true, count: serversWithNewIds.length };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Import failed",
        };
      }
    },
    [setCustomServers]
  );

  return {
    customServers,
    addCustomServer,
    updateCustomServer,
    deleteCustomServer,
    getCustomServerById,
    getCustomServerBySlug,
    clearAllCustomServers,
    exportCustomServers,
    importCustomServers,
    customCount: customServers.length,
  };
}

function generateClaudeConfig(
  input: CustomServerInput
): Record<string, unknown> {
  if (input.type === "stdio" && input.command) {
    return {
      command: input.command,
      args: input.args || [],
    };
  }

  if ((input.type === "http" || input.type === "sse") && input.url) {
    return {
      url: input.url,
    };
  }

  return {};
}
