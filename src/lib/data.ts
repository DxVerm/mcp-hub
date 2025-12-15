import serversData from "@/data/servers.json";
import categoriesData from "@/data/categories.json";
import type { MCPServer, Category, FilterState } from "@/types";

// Cast imported JSON to typed data
export const servers: MCPServer[] = serversData as MCPServer[];
export const categories: Category[] = categoriesData as Category[];

// Get all unique tags from servers
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  servers.forEach((server) => {
    server.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// Get server by slug
export function getServerBySlug(slug: string): MCPServer | undefined {
  return servers.find((server) => server.slug === slug);
}

// Get server by ID
export function getServerById(id: string): MCPServer | undefined {
  return servers.find((server) => server.id === id);
}

// Get servers by category
export function getServersByCategory(categoryId: string): MCPServer[] {
  return servers.filter((server) => server.category === categoryId);
}

// Get category by ID
export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

// Get featured servers
export function getFeaturedServers(): MCPServer[] {
  return servers.filter((server) => server.featured);
}

// Get official servers
export function getOfficialServers(): MCPServer[] {
  return servers.filter((server) => server.source === "official");
}

// Get community servers
export function getCommunityServers(): MCPServer[] {
  return servers.filter((server) => server.source === "community");
}

// Get verified servers
export function getVerifiedServers(): MCPServer[] {
  return servers.filter((server) => server.verified);
}

// Filter servers
export function filterServers(filters: FilterState): MCPServer[] {
  return servers.filter((server) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        server.name.toLowerCase().includes(searchLower) ||
        server.description.toLowerCase().includes(searchLower) ||
        server.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && server.category !== filters.category) {
      return false;
    }

    // Type filter
    if (filters.type && server.type !== filters.type) {
      return false;
    }

    // Source filter
    if (filters.source && server.source !== filters.source) {
      return false;
    }

    // Tags filter
    if (filters.tags.length > 0) {
      const hasAllTags = filters.tags.every((tag) =>
        server.tags.includes(tag)
      );
      if (!hasAllTags) return false;
    }

    // Verified filter
    if (filters.verified !== null && server.verified !== filters.verified) {
      return false;
    }

    return true;
  });
}

// Get categories with server counts
export function getCategoriesWithCounts(): Category[] {
  return categories.map((category) => ({
    ...category,
    serverCount: servers.filter((s) => s.category === category.id).length,
  }));
}

// Generate Claude config JSON for a server
export function generateClaudeConfig(server: MCPServer): string {
  const config = {
    mcpServers: {
      [server.id]: server.claudeConfig,
    },
  };
  return JSON.stringify(config, null, 2);
}

// Sort servers by different criteria
export function sortServers(
  serverList: MCPServer[],
  sortBy: "name" | "stars" | "downloads" | "featured" = "featured"
): MCPServer[] {
  return [...serverList].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "stars":
        return (b.stats?.stars ?? 0) - (a.stats?.stars ?? 0);
      case "downloads":
        return (b.stats?.downloads ?? 0) - (a.stats?.downloads ?? 0);
      case "featured":
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
}
