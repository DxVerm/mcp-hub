"use client";

import * as React from "react";
import { Filter, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FilterState, ServerType, ServerSource, Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: Category[];
  availableTags: string[];
  resultCount: number;
  className?: string;
}

const serverTypes: { value: ServerType; label: string }[] = [
  { value: "stdio", label: "Stdio" },
  { value: "http", label: "HTTP" },
  { value: "sse", label: "SSE" },
];

const serverSources: { value: ServerSource; label: string }[] = [
  { value: "official", label: "Official" },
  { value: "community", label: "Community" },
];

export function FilterBar({
  filters,
  onFiltersChange,
  categories,
  availableTags,
  resultCount,
  className,
}: FilterBarProps) {
  const activeFilterCount = [
    filters.category,
    filters.type,
    filters.source,
    filters.verified,
    filters.tags.length > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    onFiltersChange({
      ...filters,
      category: null,
      type: null,
      source: null,
      tags: [],
      verified: null,
    });
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    updateFilter("tags", newTags);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {/* Category Select */}
      <Select
        value={filters.category ?? "all"}
        onValueChange={(value) =>
          updateFilter("category", value === "all" ? null : value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
              {category.serverCount !== undefined && (
                <span className="ml-2 text-muted-foreground">
                  ({category.serverCount})
                </span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type Select */}
      <Select
        value={filters.type ?? "all"}
        onValueChange={(value) =>
          updateFilter("type", value === "all" ? null : (value as ServerType))
        }
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {serverTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Source Select */}
      <Select
        value={filters.source ?? "all"}
        onValueChange={(value) =>
          updateFilter("source", value === "all" ? null : (value as ServerSource))
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Sources" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {serverSources.map((source) => (
            <SelectItem key={source.value} value={source.value}>
              {source.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* More Filters (Sheet for mobile) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Servers</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Verified Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Verification</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={filters.verified === true}
                  onCheckedChange={(checked) =>
                    updateFilter("verified", checked ? true : null)
                  }
                />
                <Label htmlFor="verified" className="text-sm font-normal">
                  Verified servers only
                </Label>
              </div>
            </div>

            <Separator />

            {/* Tags Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.slice(0, 20).map((tag) => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Result Count */}
      <div className="ml-auto text-sm text-muted-foreground">
        {resultCount} server{resultCount !== 1 ? "s" : ""} found
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
          <X className="h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
