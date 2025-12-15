"use client";

import { Terminal, Copy, Settings, Rocket } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Terminal,
    title: "1. Find a Server",
    description:
      "Browse our curated collection of MCP servers by category or search for specific functionality.",
  },
  {
    icon: Copy,
    title: "2. Copy Configuration",
    description:
      "Click the install button to copy the Claude configuration JSON to your clipboard.",
  },
  {
    icon: Settings,
    title: "3. Add to Claude",
    description:
      "Paste the configuration into your Claude Code settings file at ~/.claude.json",
  },
  {
    icon: Rocket,
    title: "4. Start Using",
    description:
      "Restart Claude Code and start using your new MCP server capabilities immediately.",
  },
];

export function QuickStart() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold md:text-3xl mb-3">
            Quick Start Guide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get up and running with MCP servers in just a few simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="rounded-lg border bg-muted/50 overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 py-2 bg-muted">
              <span className="text-sm font-medium">~/.claude.json</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    }
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
