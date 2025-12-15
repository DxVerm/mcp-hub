"use client";

import * as React from "react";
import { motion } from "framer-motion";

import type { FilterState } from "@/types";
import {
  getCategoriesWithCounts,
  getAllTags,
  filterServers,
  sortServers,
} from "@/lib/data";
import { ServerGrid } from "@/components/servers/server-grid";
import { SearchInput } from "@/components/servers/search-input";
import { FilterBar } from "@/components/servers/filter-bar";

const initialFilters: FilterState = {
  search: "",
  category: null,
  type: null,
  source: null,
  tags: [],
  verified: null,
};

export default function CategoriesPage() {
  const [filters, setFilters] = React.useState<FilterState>(initialFilters);
  const categories = getCategoriesWithCounts();
  const allTags = getAllTags();

  const filteredServers = React.useMemo(() => {
    const filtered = filterServers(filters);
    return sortServers(filtered, "featured");
  }, [filters]);

  return (
    <div className="container py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Browse MCP Servers</h1>
        <p className="text-muted-foreground">
          Discover and install MCP servers for Claude Code. Filter by category,
          type, or search for specific functionality.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-6"
      >
        <SearchInput
          value={filters.search}
          onChange={(search) => setFilters({ ...filters, search })}
          placeholder="Search servers by name, description, or tags..."
          className="max-w-xl"
        />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          availableTags={allTags}
          resultCount={filteredServers.length}
          className="mb-8"
        />
      </motion.div>

      {/* Server Grid */}
      <ServerGrid servers={filteredServers} />
    </div>
  );
}
