import Link from "next/link";
import {
  Server,
  Github,
  Heart,
  Code2,
  Users,
  Sparkles,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Zap,
  Shield,
  Globe,
  Terminal,
  Radio,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Server,
    title: "50+ MCP Servers",
    description: "Curated collection of official and community MCP servers across 12 categories",
  },
  {
    icon: Zap,
    title: "One-Click Install",
    description: "Copy configurations directly to your Claude settings with a single click",
  },
  {
    icon: Heart,
    title: "Save & Organize",
    description: "Bookmark your favorite servers and manage custom servers locally",
  },
  {
    icon: Code2,
    title: "Open Source",
    description: "Fully open source and customizable. Fork, modify, and make it your own",
  },
  {
    icon: Shield,
    title: "No Backend Required",
    description: "Everything runs client-side. Your data stays in your browser",
  },
  {
    icon: Globe,
    title: "Dark Mode",
    description: "Beautiful light and dark themes that respect your system preferences",
  },
];

const serverTypes = [
  {
    icon: Terminal,
    type: "stdio",
    name: "Standard I/O",
    description: "Runs as a subprocess communicating via JSON-RPC over stdin/stdout. Most common type.",
  },
  {
    icon: Globe,
    type: "http",
    name: "HTTP",
    description: "Exposes an HTTP API endpoint. Great for remote or shared servers.",
  },
  {
    icon: Radio,
    type: "sse",
    name: "Server-Sent Events",
    description: "Real-time streaming over HTTP. Ideal for long-running or streaming responses.",
  },
];

const contributing = [
  {
    title: "Add a Server",
    description: "Submit a PR to add your MCP server to the registry",
    link: "#add-server",
  },
  {
    title: "Report Issues",
    description: "Found a bug? Let us know on GitHub Issues",
    link: "#report-issues",
  },
  {
    title: "Improve Docs",
    description: "Help improve documentation and examples",
    link: "#improve-docs",
  },
  {
    title: "Share Ideas",
    description: "Suggest features or improvements via Discussions",
    link: "#share-ideas",
  },
];

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Server className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">About MCP Hub</h1>
        <p className="text-xl text-muted-foreground mb-6">
          The open-source registry for Model Context Protocol servers. Discover, explore,
          and install MCP servers to extend Claude&apos;s capabilities.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Server className="h-4 w-4 mr-2" />
              Browse Servers
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* What is MCP Section */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                What is MCP?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                <strong>Model Context Protocol (MCP)</strong> is an open protocol developed by Anthropic
                that enables seamless integration between AI assistants like Claude and external
                tools, data sources, and services.
              </p>
              <p>
                MCP servers extend Claude&apos;s capabilities by providing:
              </p>
              <ul>
                <li>
                  <strong>Tools</strong> - Functions Claude can call to perform actions
                  (e.g., query a database, send an email, create a file)
                </li>
                <li>
                  <strong>Resources</strong> - Data sources Claude can read from
                  (e.g., file contents, API responses, database records)
                </li>
                <li>
                  <strong>Prompts</strong> - Pre-defined prompt templates for common tasks
                </li>
              </ul>
              <p>
                With MCP, you can connect Claude to your databases, APIs, local files,
                cloud services, and more - all through a standardized protocol.
              </p>
              <div className="flex gap-4 mt-6 not-prose">
                <Button variant="outline" asChild>
                  <a
                    href="https://modelcontextprotocol.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    MCP Documentation
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/modelcontextprotocol"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    MCP on GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Server Types Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Server Types</h2>
          <p className="text-muted-foreground">
            MCP supports three transport types for server communication
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {serverTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card key={type.type}>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {type.name}
                    <Badge variant="outline" className="text-xs uppercase">
                      {type.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Features</h2>
          <p className="text-muted-foreground">
            Everything you need to discover and manage MCP servers
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="max-w-3xl mx-auto mb-16" />

      {/* Contributing Section */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Contributing</h2>
            <p className="text-muted-foreground">
              MCP Hub is open source and welcomes contributions from the community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {contributing.map((item) => (
              <Card key={item.title} className="hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Adding Your Server to MCP Hub
              </CardTitle>
              <CardDescription>
                Want to list your MCP server in the registry?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Fork the repository</p>
                    <p className="text-sm text-muted-foreground">
                      Fork MCP Hub on GitHub to get started
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Add your server to servers.json</p>
                    <p className="text-sm text-muted-foreground">
                      Follow the existing schema to add your server&apos;s details
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Submit a Pull Request</p>
                    <p className="text-sm text-muted-foreground">
                      Open a PR with your changes for review
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button asChild>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Contributing Guide
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/submit">
                    <Server className="h-4 w-4 mr-2" />
                    Add Custom Server
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Section */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with other MCP developers, share your servers, get help,
                    and stay updated on the latest developments.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                    <Button variant="outline" asChild>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        GitHub Discussions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Credits Section */}
      <section>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Built with{" "}
            <Heart className="h-4 w-4 inline text-red-500" />{" "}
            for the Claude Code community
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Next.js 14</Badge>
            <Badge variant="secondary">Shadcn UI</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">TypeScript</Badge>
          </div>
        </div>
      </section>
    </div>
  );
}
