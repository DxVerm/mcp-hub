"use client";

import Link from "next/link";
import {
  Database,
  Brain,
  Code,
  CheckSquare,
  MessageSquare,
  FolderOpen,
  Globe,
  Cloud,
  Activity,
  Shield,
  Workflow,
  Package,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { categoryColors } from "@/lib/config";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CategoryGridProps {
  categories: Category[];
}

const iconMap: Record<string, React.ElementType> = {
  Database,
  Brain,
  Code,
  CheckSquare,
  MessageSquare,
  FolderOpen,
  Globe,
  Cloud,
  Activity,
  Shield,
  Workflow,
  Package,
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold md:text-3xl mb-3">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore MCP servers organized by their primary function and use case
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Package;
            return (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-6">
                    <div
                      className={cn(
                        "inline-flex items-center justify-center rounded-lg p-3 mb-4",
                        categoryColors[category.color] || categoryColors.gray
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                    {category.serverCount !== undefined && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {category.serverCount} server
                        {category.serverCount !== 1 ? "s" : ""}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/categories">
              View all categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
