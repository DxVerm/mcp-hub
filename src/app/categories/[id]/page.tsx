"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  getServersByCategory,
  getCategoryById,
  sortServers,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ServerGrid } from "@/components/servers/server-grid";
import { SearchInput } from "@/components/servers/search-input";

interface CategoryPageProps {
  params: { id: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryById(params.id);
  const categoryServers = getServersByCategory(params.id);

  if (!category) {
    notFound();
  }

  const [search, setSearch] = React.useState("");

  const filteredServers = React.useMemo(() => {
    if (!search) return sortServers(categoryServers, "featured");

    const searchLower = search.toLowerCase();
    const filtered = categoryServers.filter(
      (server) =>
        server.name.toLowerCase().includes(searchLower) ||
        server.description.toLowerCase().includes(searchLower) ||
        server.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
    return sortServers(filtered, "featured");
  }, [categoryServers, search]);

  return (
    <div className="container py-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/categories">
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Categories
        </Link>
      </Button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {categoryServers.length} server{categoryServers.length !== 1 ? "s" : ""} in this category
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={`Search ${category.name.toLowerCase()} servers...`}
          className="max-w-xl"
        />
      </div>

      {/* Results Count */}
      {search && (
        <p className="text-sm text-muted-foreground mb-4">
          {filteredServers.length} result{filteredServers.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Server Grid */}
      <ServerGrid servers={filteredServers} />
    </div>
  );
}
