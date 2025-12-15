"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./use-local-storage";
import type { SavedServer, MCPServer } from "@/types";
import { servers } from "@/lib/data";

const SAVED_SERVERS_KEY = "mcp-hub-saved-servers";

export function useSavedServers() {
  const [savedServers, setSavedServers] = useLocalStorage<SavedServer[]>(
    SAVED_SERVERS_KEY,
    []
  );

  const saveServer = useCallback(
    (serverId: string) => {
      setSavedServers((prev) => {
        // Don't add duplicates
        if (prev.some((s) => s.serverId === serverId)) {
          return prev;
        }
        return [
          ...prev,
          {
            serverId,
            savedAt: new Date().toISOString(),
          },
        ];
      });
    },
    [setSavedServers]
  );

  const unsaveServer = useCallback(
    (serverId: string) => {
      setSavedServers((prev) => prev.filter((s) => s.serverId !== serverId));
    },
    [setSavedServers]
  );

  const toggleSaveServer = useCallback(
    (serverId: string) => {
      if (savedServers.some((s) => s.serverId === serverId)) {
        unsaveServer(serverId);
      } else {
        saveServer(serverId);
      }
    },
    [savedServers, saveServer, unsaveServer]
  );

  const isServerSaved = useCallback(
    (serverId: string) => {
      return savedServers.some((s) => s.serverId === serverId);
    },
    [savedServers]
  );

  // Get full server objects for saved servers
  const savedServersList = useMemo(() => {
    return savedServers
      .map((saved) => {
        const server = servers.find((s) => s.id === saved.serverId);
        return server ? { ...server, savedAt: saved.savedAt } : null;
      })
      .filter((s): s is MCPServer & { savedAt: string } => s !== null);
  }, [savedServers]);

  const clearAllSaved = useCallback(() => {
    setSavedServers([]);
  }, [setSavedServers]);

  return {
    savedServers: savedServersList,
    savedServerIds: savedServers,
    saveServer,
    unsaveServer,
    toggleSaveServer,
    isServerSaved,
    clearAllSaved,
    savedCount: savedServers.length,
  };
}
