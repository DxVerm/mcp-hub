"use client";

import * as React from "react";
import Link from "next/link";
import {
  Server,
  Terminal,
  Globe,
  Radio,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";
import { useCustomServers } from "@/hooks";
import type { ServerType, Tool, Resource, EnvVariable, CustomServer } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const typeIcons = {
  stdio: Terminal,
  http: Globe,
  sse: Radio,
};

const typeDescriptions = {
  stdio: "Standard I/O - runs as a subprocess with JSON-RPC over stdin/stdout",
  http: "HTTP - exposes an HTTP API endpoint",
  sse: "Server-Sent Events - real-time streaming over HTTP",
};

interface FormData {
  name: string;
  description: string;
  longDescription: string;
  type: ServerType;
  command: string;
  args: string[];
  url: string;
  category: string;
  tags: string[];
  repository: string;
  documentation: string;
  author: string;
  version: string;
  tools: Tool[];
  resources: Resource[];
  env: Record<string, EnvVariable>;
  installNpm: string;
  installNpx: string;
  installBunx: string;
  installDocker: string;
}

const initialFormData: FormData = {
  name: "",
  description: "",
  longDescription: "",
  type: "stdio",
  command: "",
  args: [],
  url: "",
  category: "",
  tags: [],
  repository: "",
  documentation: "",
  author: "",
  version: "",
  tools: [],
  resources: [],
  env: {},
  installNpm: "",
  installNpx: "",
  installBunx: "",
  installDocker: "",
};

export default function SubmitPage() {
  const { addCustomServer } = useCustomServers();
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [currentTag, setCurrentTag] = React.useState("");
  const [currentArg, setCurrentArg] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [copiedConfig, setCopiedConfig] = React.useState(false);

  // Environment variable form state
  const [newEnvKey, setNewEnvKey] = React.useState("");
  const [newEnvName, setNewEnvName] = React.useState("");
  const [newEnvDesc, setNewEnvDesc] = React.useState("");
  const [newEnvRequired, setNewEnvRequired] = React.useState(false);
  const [newEnvSecret, setNewEnvSecret] = React.useState(false);
  const [newEnvDefault, setNewEnvDefault] = React.useState("");

  // Tool form state
  const [newToolName, setNewToolName] = React.useState("");
  const [newToolDesc, setNewToolDesc] = React.useState("");

  // Resource form state
  const [newResourceName, setNewResourceName] = React.useState("");
  const [newResourceDesc, setNewResourceDesc] = React.useState("");
  const [newResourceUri, setNewResourceUri] = React.useState("");

  const TypeIcon = typeIcons[formData.type];

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const generateClaudeConfig = () => {
    const config: Record<string, unknown> = {};
    const serverKey = generateSlug(formData.name) || "my-server";

    if (formData.type === "stdio") {
      config[serverKey] = {
        command: formData.command || "npx",
        args: formData.args.length > 0 ? formData.args : ["-y", "my-mcp-server"],
        ...(Object.keys(formData.env).length > 0 && {
          env: Object.fromEntries(
            Object.entries(formData.env).map(([key, val]) => [key, val.default || `<${key}>`])
          ),
        }),
      };
    } else {
      config[serverKey] = {
        url: formData.url || "http://localhost:3000/mcp",
        ...(Object.keys(formData.env).length > 0 && {
          env: Object.fromEntries(
            Object.entries(formData.env).map(([key, val]) => [key, val.default || `<${key}>`])
          ),
        }),
      };
    }

    return config;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTypeChange = (type: ServerType) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: "" }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const addArg = () => {
    if (currentArg.trim()) {
      setFormData((prev) => ({
        ...prev,
        args: [...prev.args, currentArg.trim()],
      }));
      setCurrentArg("");
    }
  };

  const removeArg = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      args: prev.args.filter((_, i) => i !== index),
    }));
  };

  const addEnvVariable = () => {
    if (newEnvKey.trim()) {
      setFormData((prev) => ({
        ...prev,
        env: {
          ...prev.env,
          [newEnvKey.trim()]: {
            name: newEnvName || newEnvKey.trim(),
            description: newEnvDesc,
            required: newEnvRequired,
            secret: newEnvSecret,
            default: newEnvDefault || undefined,
          },
        },
      }));
      setNewEnvKey("");
      setNewEnvName("");
      setNewEnvDesc("");
      setNewEnvRequired(false);
      setNewEnvSecret(false);
      setNewEnvDefault("");
    }
  };

  const removeEnvVariable = (key: string) => {
    setFormData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev.env;
      return { ...prev, env: rest };
    });
  };

  const addTool = () => {
    if (newToolName.trim()) {
      setFormData((prev) => ({
        ...prev,
        tools: [...prev.tools, { name: newToolName.trim(), description: newToolDesc }],
      }));
      setNewToolName("");
      setNewToolDesc("");
    }
  };

  const removeTool = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index),
    }));
  };

  const addResource = () => {
    if (newResourceName.trim()) {
      setFormData((prev) => ({
        ...prev,
        resources: [
          ...prev.resources,
          {
            name: newResourceName.trim(),
            description: newResourceDesc,
            uri: newResourceUri || undefined,
          },
        ],
      }));
      setNewResourceName("");
      setNewResourceDesc("");
      setNewResourceUri("");
    }
  };

  const removeResource = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Server name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.type === "stdio" && !formData.command.trim()) {
      newErrors.command = "Command is required for stdio servers";
    }

    if ((formData.type === "http" || formData.type === "sse") && !formData.url.trim()) {
      newErrors.url = "URL is required for HTTP/SSE servers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const slug = generateSlug(formData.name);
    const now = new Date().toISOString();

    const customServer: CustomServer = {
      id: `custom-${Date.now()}`,
      slug,
      name: formData.name,
      description: formData.description,
      longDescription: formData.longDescription || undefined,
      type: formData.type,
      command: formData.type === "stdio" ? formData.command : undefined,
      args: formData.type === "stdio" && formData.args.length > 0 ? formData.args : undefined,
      url: formData.type !== "stdio" ? formData.url : undefined,
      env: Object.keys(formData.env).length > 0 ? formData.env : undefined,
      tools: formData.tools.length > 0 ? formData.tools : undefined,
      resources: formData.resources.length > 0 ? formData.resources : undefined,
      category: formData.category,
      tags: formData.tags,
      source: "custom",
      verified: false,
      repository: formData.repository || undefined,
      documentation: formData.documentation || undefined,
      author: formData.author || undefined,
      version: formData.version || undefined,
      install: {
        npm: formData.installNpm || `npm install ${slug}`,
        npx: formData.installNpx || `npx ${slug}`,
        bunx: formData.installBunx || undefined,
        docker: formData.installDocker || undefined,
      },
      claudeConfig: generateClaudeConfig(),
      createdAt: now,
      updatedAt: now,
    };

    addCustomServer(customServer);
    setIsSubmitted(true);
  };

  const copyConfig = async () => {
    const config = generateClaudeConfig();
    await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Server Added Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Your custom MCP server has been added to your collection. You can find it in
            the &quot;My Servers&quot; section.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/my-servers">View My Servers</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setFormData(initialFormData);
                setIsSubmitted(false);
              }}
            >
              Add Another Server
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Add Custom MCP Server</h1>
          <p className="text-muted-foreground">
            Add your own MCP server to your personal collection. Custom servers are stored
            locally in your browser.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="features">Tools & Resources</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Information</CardTitle>
                  <CardDescription>
                    Basic details about your MCP server
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Server Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="My MCP Server"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="version">Version</Label>
                      <Input
                        id="version"
                        name="version"
                        placeholder="1.0.0"
                        value={formData.version}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Short Description <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="A brief description of what this server does"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Detailed Description</Label>
                    <Textarea
                      id="longDescription"
                      name="longDescription"
                      placeholder="A more detailed description of your server's features and capabilities..."
                      value={formData.longDescription}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        name="author"
                        placeholder="Your name or organization"
                        value={formData.author}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            {tag}
                            <Minus className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="repository">Repository URL</Label>
                      <Input
                        id="repository"
                        name="repository"
                        placeholder="https://github.com/..."
                        value={formData.repository}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documentation">Documentation URL</Label>
                      <Input
                        id="documentation"
                        name="documentation"
                        placeholder="https://docs.example.com"
                        value={formData.documentation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuration Tab */}
            <TabsContent value="config" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Type</CardTitle>
                  <CardDescription>
                    Choose how your MCP server communicates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {(["stdio", "http", "sse"] as ServerType[]).map((type) => {
                      const Icon = typeIcons[type];
                      return (
                        <TooltipProvider key={type}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Card
                                className={cn(
                                  "cursor-pointer transition-all hover:border-primary/50",
                                  formData.type === type && "border-primary bg-primary/5"
                                )}
                                onClick={() => handleTypeChange(type)}
                              >
                                <CardContent className="flex flex-col items-center p-4 text-center">
                                  <Icon className="h-8 w-8 mb-2" />
                                  <span className="font-medium uppercase">{type}</span>
                                </CardContent>
                              </Card>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>{typeDescriptions[type]}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {formData.type === "stdio" ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Command Configuration</CardTitle>
                    <CardDescription>
                      Configure the command to start your MCP server
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="command">
                        Command <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="command"
                        name="command"
                        placeholder="npx"
                        value={formData.command}
                        onChange={handleInputChange}
                        className={errors.command ? "border-red-500" : ""}
                      />
                      {errors.command && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.command}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Arguments</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add an argument"
                          value={currentArg}
                          onChange={(e) => setCurrentArg(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addArg();
                            }
                          }}
                        />
                        <Button type="button" variant="outline" onClick={addArg}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {formData.args.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.args.map((arg, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer font-mono"
                              onClick={() => removeArg(index)}
                            >
                              {arg}
                              <Minus className="h-3 w-3 ml-1" />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>URL Configuration</CardTitle>
                    <CardDescription>
                      Configure the endpoint URL for your MCP server
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">
                        Server URL <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="url"
                        name="url"
                        placeholder="http://localhost:3000/mcp"
                        value={formData.url}
                        onChange={handleInputChange}
                        className={errors.url ? "border-red-500" : ""}
                      />
                      {errors.url && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.url}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Environment Variables</CardTitle>
                  <CardDescription>
                    Define environment variables required by your server
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Variable Key</Label>
                      <Input
                        placeholder="API_KEY"
                        value={newEnvKey}
                        onChange={(e) => setNewEnvKey(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Display Name</Label>
                      <Input
                        placeholder="API Key"
                        value={newEnvName}
                        onChange={(e) => setNewEnvName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      placeholder="Your API key for authentication"
                      value={newEnvDesc}
                      onChange={(e) => setNewEnvDesc(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Default Value</Label>
                      <Input
                        placeholder="Optional default"
                        value={newEnvDefault}
                        onChange={(e) => setNewEnvDefault(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-6 pt-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={newEnvRequired}
                          onCheckedChange={setNewEnvRequired}
                        />
                        <Label>Required</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={newEnvSecret}
                          onCheckedChange={setNewEnvSecret}
                        />
                        <Label>Secret</Label>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addEnvVariable}
                    disabled={!newEnvKey.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Variable
                  </Button>

                  {Object.entries(formData.env).length > 0 && (
                    <div className="space-y-2 mt-4">
                      {Object.entries(formData.env).map(([key, val]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div>
                            <code className="font-semibold">{key}</code>
                            {val.description && (
                              <p className="text-sm text-muted-foreground">
                                {val.description}
                              </p>
                            )}
                            <div className="flex gap-2 mt-1">
                              {val.required && (
                                <Badge variant="outline" className="text-xs">
                                  Required
                                </Badge>
                              )}
                              {val.secret && (
                                <Badge variant="outline" className="text-xs">
                                  Secret
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEnvVariable(key)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Install Commands</CardTitle>
                  <CardDescription>
                    How users can install your server (optional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="installNpm">npm</Label>
                      <Input
                        id="installNpm"
                        name="installNpm"
                        placeholder="npm install my-server"
                        value={formData.installNpm}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="installNpx">npx</Label>
                      <Input
                        id="installNpx"
                        name="installNpx"
                        placeholder="npx my-server"
                        value={formData.installNpx}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="installBunx">bunx</Label>
                      <Input
                        id="installBunx"
                        name="installBunx"
                        placeholder="bunx my-server"
                        value={formData.installBunx}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="installDocker">Docker</Label>
                      <Input
                        id="installDocker"
                        name="installDocker"
                        placeholder="docker run my-server"
                        value={formData.installDocker}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tools & Resources Tab */}
            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tools</CardTitle>
                  <CardDescription>
                    Define the tools your MCP server provides
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Tool Name</Label>
                      <Input
                        placeholder="get_weather"
                        value={newToolName}
                        onChange={(e) => setNewToolName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="Get current weather for a location"
                        value={newToolDesc}
                        onChange={(e) => setNewToolDesc(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTool}
                    disabled={!newToolName.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tool
                  </Button>

                  {formData.tools.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {formData.tools.map((tool, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div>
                            <code className="font-semibold">{tool.name}</code>
                            {tool.description && (
                              <p className="text-sm text-muted-foreground">
                                {tool.description}
                              </p>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTool(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>
                    Define the resources your MCP server exposes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Resource Name</Label>
                      <Input
                        placeholder="user_profile"
                        value={newResourceName}
                        onChange={(e) => setNewResourceName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="User profile information"
                        value={newResourceDesc}
                        onChange={(e) => setNewResourceDesc(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URI (optional)</Label>
                      <Input
                        placeholder="mcp://user/profile"
                        value={newResourceUri}
                        onChange={(e) => setNewResourceUri(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addResource}
                    disabled={!newResourceName.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>

                  {formData.resources.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {formData.resources.map((resource, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div>
                            <code className="font-semibold">{resource.name}</code>
                            {resource.uri && (
                              <code className="text-xs ml-2 text-muted-foreground">
                                {resource.uri}
                              </code>
                            )}
                            {resource.description && (
                              <p className="text-sm text-muted-foreground">
                                {resource.description}
                              </p>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeResource(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Preview</CardTitle>
                  <CardDescription>
                    Preview how your server will appear in the registry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Server className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">
                            {formData.name || "Server Name"}
                          </h3>
                          <Badge variant="outline">
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {formData.type}
                          </Badge>
                          <Badge variant="secondary">custom</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">
                          {formData.description || "Server description will appear here"}
                        </p>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {formData.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Claude Config</CardTitle>
                  <CardDescription>
                    This is the configuration that will be added to your Claude settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{JSON.stringify(generateClaudeConfig(), null, 2)}</code>
                    </pre>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={copyConfig}
                    >
                      {copiedConfig ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Server
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
}
