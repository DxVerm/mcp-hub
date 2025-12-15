import { describe, it, expect } from "vitest";
import {
  servers,
  categories,
  getAllTags,
  getServerBySlug,
  getServerById,
  getServersByCategory,
  getCategoryById,
  getFeaturedServers,
  getOfficialServers,
  getCommunityServers,
  getVerifiedServers,
  filterServers,
  getCategoriesWithCounts,
  generateClaudeConfig,
  sortServers,
} from "@/lib/data";
import type { FilterState } from "@/types";

describe("Data Module", () => {
  describe("servers and categories", () => {
    it("should have servers data loaded", () => {
      expect(servers).toBeDefined();
      expect(Array.isArray(servers)).toBe(true);
      expect(servers.length).toBeGreaterThan(0);
    });

    it("should have categories data loaded", () => {
      expect(categories).toBeDefined();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it("servers should have required properties", () => {
      servers.forEach((server) => {
        expect(server.id).toBeDefined();
        expect(server.slug).toBeDefined();
        expect(server.name).toBeDefined();
        expect(server.description).toBeDefined();
        expect(server.type).toMatch(/^(stdio|http|sse)$/);
        expect(server.category).toBeDefined();
        expect(server.tags).toBeDefined();
        expect(Array.isArray(server.tags)).toBe(true);
        expect(server.source).toMatch(/^(official|community|custom)$/);
        expect(typeof server.verified).toBe("boolean");
        expect(server.install).toBeDefined();
        expect(server.claudeConfig).toBeDefined();
      });
    });

    it("categories should have required properties", () => {
      categories.forEach((category) => {
        expect(category.id).toBeDefined();
        expect(category.name).toBeDefined();
        expect(category.description).toBeDefined();
        expect(category.icon).toBeDefined();
        expect(category.color).toBeDefined();
      });
    });
  });

  describe("getAllTags", () => {
    it("should return an array of unique tags", () => {
      const tags = getAllTags();
      expect(Array.isArray(tags)).toBe(true);
      expect(tags.length).toBeGreaterThan(0);

      // Check for uniqueness
      const uniqueTags = new Set(tags);
      expect(uniqueTags.size).toBe(tags.length);
    });

    it("should return sorted tags", () => {
      const tags = getAllTags();
      const sortedTags = [...tags].sort();
      expect(tags).toEqual(sortedTags);
    });
  });

  describe("getServerBySlug", () => {
    it("should return a server when slug exists", () => {
      const firstServer = servers[0];
      const result = getServerBySlug(firstServer.slug);
      expect(result).toEqual(firstServer);
    });

    it("should return undefined for non-existent slug", () => {
      const result = getServerBySlug("non-existent-slug-12345");
      expect(result).toBeUndefined();
    });
  });

  describe("getServerById", () => {
    it("should return a server when id exists", () => {
      const firstServer = servers[0];
      const result = getServerById(firstServer.id);
      expect(result).toEqual(firstServer);
    });

    it("should return undefined for non-existent id", () => {
      const result = getServerById("non-existent-id-12345");
      expect(result).toBeUndefined();
    });
  });

  describe("getServersByCategory", () => {
    it("should return servers for a valid category", () => {
      const categoryId = categories[0].id;
      const result = getServersByCategory(categoryId);
      expect(Array.isArray(result)).toBe(true);
      result.forEach((server) => {
        expect(server.category).toBe(categoryId);
      });
    });

    it("should return empty array for non-existent category", () => {
      const result = getServersByCategory("non-existent-category");
      expect(result).toEqual([]);
    });
  });

  describe("getCategoryById", () => {
    it("should return a category when id exists", () => {
      const firstCategory = categories[0];
      const result = getCategoryById(firstCategory.id);
      expect(result).toEqual(firstCategory);
    });

    it("should return undefined for non-existent id", () => {
      const result = getCategoryById("non-existent-id");
      expect(result).toBeUndefined();
    });
  });

  describe("getFeaturedServers", () => {
    it("should return only featured servers", () => {
      const result = getFeaturedServers();
      expect(Array.isArray(result)).toBe(true);
      result.forEach((server) => {
        expect(server.featured).toBe(true);
      });
    });
  });

  describe("getOfficialServers", () => {
    it("should return only official servers", () => {
      const result = getOfficialServers();
      expect(Array.isArray(result)).toBe(true);
      result.forEach((server) => {
        expect(server.source).toBe("official");
      });
    });
  });

  describe("getCommunityServers", () => {
    it("should return only community servers", () => {
      const result = getCommunityServers();
      expect(Array.isArray(result)).toBe(true);
      result.forEach((server) => {
        expect(server.source).toBe("community");
      });
    });
  });

  describe("getVerifiedServers", () => {
    it("should return only verified servers", () => {
      const result = getVerifiedServers();
      expect(Array.isArray(result)).toBe(true);
      result.forEach((server) => {
        expect(server.verified).toBe(true);
      });
    });
  });

  describe("filterServers", () => {
    const emptyFilters: FilterState = {
      search: "",
      category: null,
      type: null,
      source: null,
      tags: [],
      verified: null,
    };

    it("should return all servers with empty filters", () => {
      const result = filterServers(emptyFilters);
      expect(result.length).toBe(servers.length);
    });

    it("should filter by search term in name", () => {
      const firstServer = servers[0];
      const result = filterServers({
        ...emptyFilters,
        search: firstServer.name.substring(0, 5),
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((s) => s.id === firstServer.id)).toBe(true);
    });

    it("should filter by search term in description", () => {
      const server = servers.find((s) => s.description.length > 10);
      if (server) {
        const result = filterServers({
          ...emptyFilters,
          search: server.description.split(" ")[0],
        });
        expect(result.length).toBeGreaterThan(0);
      }
    });

    it("should filter by category", () => {
      const categoryId = categories[0].id;
      const result = filterServers({
        ...emptyFilters,
        category: categoryId,
      });
      result.forEach((server) => {
        expect(server.category).toBe(categoryId);
      });
    });

    it("should filter by type", () => {
      const result = filterServers({
        ...emptyFilters,
        type: "stdio",
      });
      result.forEach((server) => {
        expect(server.type).toBe("stdio");
      });
    });

    it("should filter by source", () => {
      const result = filterServers({
        ...emptyFilters,
        source: "official",
      });
      result.forEach((server) => {
        expect(server.source).toBe("official");
      });
    });

    it("should filter by tags", () => {
      const tags = getAllTags();
      if (tags.length > 0) {
        const result = filterServers({
          ...emptyFilters,
          tags: [tags[0]],
        });
        result.forEach((server) => {
          expect(server.tags).toContain(tags[0]);
        });
      }
    });

    it("should filter by verified status", () => {
      const result = filterServers({
        ...emptyFilters,
        verified: true,
      });
      result.forEach((server) => {
        expect(server.verified).toBe(true);
      });
    });

    it("should combine multiple filters", () => {
      const result = filterServers({
        ...emptyFilters,
        type: "stdio",
        verified: true,
      });
      result.forEach((server) => {
        expect(server.type).toBe("stdio");
        expect(server.verified).toBe(true);
      });
    });
  });

  describe("getCategoriesWithCounts", () => {
    it("should return categories with serverCount property", () => {
      const result = getCategoriesWithCounts();
      expect(result.length).toBe(categories.length);
      result.forEach((category) => {
        expect(category.serverCount).toBeDefined();
        expect(typeof category.serverCount).toBe("number");
        expect(category.serverCount).toBeGreaterThanOrEqual(0);
      });
    });

    it("should have correct server counts", () => {
      const result = getCategoriesWithCounts();
      result.forEach((category) => {
        const expectedCount = servers.filter(
          (s) => s.category === category.id
        ).length;
        expect(category.serverCount).toBe(expectedCount);
      });
    });
  });

  describe("generateClaudeConfig", () => {
    it("should generate valid JSON config", () => {
      const server = servers[0];
      const result = generateClaudeConfig(server);
      expect(() => JSON.parse(result)).not.toThrow();
    });

    it("should have mcpServers key", () => {
      const server = servers[0];
      const result = generateClaudeConfig(server);
      const parsed = JSON.parse(result);
      expect(parsed.mcpServers).toBeDefined();
    });

    it("should use server id as key", () => {
      const server = servers[0];
      const result = generateClaudeConfig(server);
      const parsed = JSON.parse(result);
      expect(parsed.mcpServers[server.id]).toBeDefined();
    });

    it("should include claudeConfig contents", () => {
      const server = servers[0];
      const result = generateClaudeConfig(server);
      const parsed = JSON.parse(result);
      expect(parsed.mcpServers[server.id]).toEqual(server.claudeConfig);
    });
  });

  describe("sortServers", () => {
    it("should sort by name alphabetically", () => {
      const result = sortServers(servers, "name");
      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].name.localeCompare(result[i].name)).toBeLessThanOrEqual(0);
      }
    });

    it("should sort by stars descending", () => {
      const result = sortServers(servers, "stars");
      for (let i = 1; i < result.length; i++) {
        const prevStars = result[i - 1].stats?.stars ?? 0;
        const currStars = result[i].stats?.stars ?? 0;
        expect(prevStars).toBeGreaterThanOrEqual(currStars);
      }
    });

    it("should sort by downloads descending", () => {
      const result = sortServers(servers, "downloads");
      for (let i = 1; i < result.length; i++) {
        const prevDownloads = result[i - 1].stats?.downloads ?? 0;
        const currDownloads = result[i].stats?.downloads ?? 0;
        expect(prevDownloads).toBeGreaterThanOrEqual(currDownloads);
      }
    });

    it("should sort featured first by default", () => {
      const result = sortServers(servers, "featured");
      const featuredServers = result.filter((s) => s.featured);
      const nonFeaturedServers = result.filter((s) => !s.featured);

      // Featured servers should come first
      const firstNonFeaturedIndex = result.findIndex((s) => !s.featured);
      if (firstNonFeaturedIndex > 0 && featuredServers.length > 0) {
        result.slice(0, firstNonFeaturedIndex).forEach((s) => {
          expect(s.featured).toBe(true);
        });
      }
    });

    it("should not mutate original array", () => {
      const original = [...servers];
      sortServers(servers, "name");
      expect(servers).toEqual(original);
    });
  });
});
