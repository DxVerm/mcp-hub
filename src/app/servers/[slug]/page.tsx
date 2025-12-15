import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Server,
  Terminal,
  Globe,
  Radio,
  Star,
  Download,
  CheckCircle2,
  Github,
  Book,
  ArrowLeft,
  Package,
  Settings,
  FileCode,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { servers, getServerBySlug, getCategoryById, generateClaudeConfig } from "@/lib/data";
import { serverTypeColors, sourceColors } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/servers/code-block";

interface ServerPageProps {
  params: { slug: string };
}

const typeIcons = {
  stdio: Terminal,
  http: Globe,
  sse: Radio,
};

export function generateStaticParams() {
  return servers.map((server) => ({
    slug: server.slug,
  }));
}

export function generateMetadata({ params }: ServerPageProps) {
  const server = getServerBySlug(params.slug);
  if (!server) return { title: "Server Not Found" };

  return {
    title: server.name,
    description: server.description,
  };
}

export default function ServerPage({ params }: ServerPageProps) {
  const server = getServerBySlug(params.slug);

  if (!server) {
    notFound();
  }

  const TypeIcon = typeIcons[server.type];
  const category = getCategoryById(server.category);
  const claudeConfig = generateClaudeConfig(server);

  return (
    <div className="container py-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/categories">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Servers
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Server className="h-8 w-8 text-primary" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{server.name}</h1>
            {server.featured && (
              <Badge className="bg-yellow-500 text-yellow-950 hover:bg-yellow-500">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Featured
              </Badge>
            )}
            {server.verified && (
              <Badge variant="outline" className="text-green-500 border-green-500/50">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-4">
            {server.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className={cn("text-sm", serverTypeColors[server.type])}
            >
              <TypeIcon className="h-3 w-3 mr-1" />
              {server.type}
            </Badge>
            {category && (
              <Badge variant="secondary">{category.name}</Badge>
            )}
            <Badge
              variant="outline"
              className={cn("text-sm", sourceColors[server.source])}
            >
              {server.source}
            </Badge>
            {server.version && (
              <Badge variant="outline">v{server.version}</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {server.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          {server.repository && (
            <Button variant="outline" asChild>
              <a
                href={server.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Repository
              </a>
            </Button>
          )}
          {server.documentation && (
            <Button variant="outline" asChild>
              <a
                href={server.documentation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Book className="mr-2 h-4 w-4" />
                Documentation
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      {(server.stats?.stars || server.stats?.downloads) && (
        <div className="flex gap-6 mb-8">
          {server.stats?.stars !== undefined && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span className="font-medium">{server.stats.stars.toLocaleString()}</span>
              <span>stars</span>
            </div>
          )}
          {server.stats?.downloads !== undefined && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Download className="h-4 w-4" />
              <span className="font-medium">{server.stats.downloads.toLocaleString()}</span>
              <span>downloads</span>
            </div>
          )}
        </div>
      )}

      <Separator className="mb-8" />

      {/* Tabs */}
      <Tabs defaultValue="install" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-xl">
          <TabsTrigger value="install">
            <Settings className="h-4 w-4 mr-2" />
            Install
          </TabsTrigger>
          <TabsTrigger value="tools">
            <Package className="h-4 w-4 mr-2" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileCode className="h-4 w-4 mr-2" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="config">
            <Terminal className="h-4 w-4 mr-2" />
            Config
          </TabsTrigger>
        </TabsList>

        {/* Install Tab */}
        <TabsContent value="install" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Installation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {server.longDescription && (
                <p className="text-muted-foreground">{server.longDescription}</p>
              )}

              <div className="space-y-4">
                <h4 className="font-medium">Install via npm</h4>
                <CodeBlock code={server.install.npm} language="bash" />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Or run directly with npx</h4>
                <CodeBlock code={server.install.npx} language="bash" />
              </div>

              {server.install.bunx && (
                <div className="space-y-4">
                  <h4 className="font-medium">Or with bunx</h4>
                  <CodeBlock code={server.install.bunx} language="bash" />
                </div>
              )}

              {server.install.docker && (
                <div className="space-y-4">
                  <h4 className="font-medium">Docker</h4>
                  <CodeBlock code={server.install.docker} language="bash" />
                </div>
              )}

              {server.env && Object.keys(server.env).length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Environment Variables</h4>
                  <div className="space-y-3">
                    {Object.entries(server.env).map(([key, env]) => (
                      <div
                        key={key}
                        className="rounded-lg border p-4 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono font-medium">
                            {env.name}
                          </code>
                          {env.required && (
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          )}
                          {env.secret && (
                            <Badge variant="outline" className="text-xs">
                              Secret
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {env.description}
                        </p>
                        {env.default && (
                          <p className="text-xs text-muted-foreground">
                            Default: <code>{env.default}</code>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tools Tab */}
        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>Available Tools</CardTitle>
            </CardHeader>
            <CardContent>
              {server.tools && server.tools.length > 0 ? (
                <div className="space-y-4">
                  {server.tools.map((tool, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <h4 className="font-medium font-mono text-sm mb-2">
                        {tool.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No tools documented for this server.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Available Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {server.resources && server.resources.length > 0 ? (
                <div className="space-y-4">
                  {server.resources.map((resource, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <h4 className="font-medium font-mono text-sm mb-2">
                        {resource.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {resource.description}
                      </p>
                      {resource.uri && (
                        <code className="text-xs text-muted-foreground">
                          {resource.uri}
                        </code>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No resources documented for this server.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Config Tab */}
        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>Claude Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Add this configuration to your <code className="text-sm">~/.claude.json</code> file
                to enable this MCP server in Claude Code.
              </p>
              <CodeBlock
                code={claudeConfig}
                language="json"
                title="~/.claude.json"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
