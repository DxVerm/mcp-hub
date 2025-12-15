// MCP Hub - Type Definitions

export type ServerType = "stdio" | "http" | "sse";
export type ServerSource = "official" | "community" | "custom";

export interface EnvVariable {
  name: string;
  description: string;
  required: boolean;
  default?: string;
  secret?: boolean;
}

export interface Tool {
  name: string;
  description: string;
  parameters?: Record<string, unknown>;
}

export interface Resource {
  name: string;
  description: string;
  uri?: string;
}

export interface InstallCommands {
  npm: string;
  npx: string;
  bunx?: string;
  docker?: string;
}

export interface MCPServer {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  type: ServerType;
  command?: string;
  args?: string[];
  url?: string;
  env?: Record<string, EnvVariable>;
  tools?: Tool[];
  resources?: Resource[];
  category: string;
  tags: string[];
  source: ServerSource;
  verified: boolean;
  repository?: string;
  documentation?: string;
  author?: string;
  version?: string;
  install: InstallCommands;
  claudeConfig: Record<string, unknown>;
  stats?: {
    stars?: number;
    downloads?: number;
    weeklyDownloads?: number;
  };
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  serverCount?: number;
}

export interface SavedServer {
  serverId: string;
  savedAt: string;
}

export interface CustomServer extends MCPServer {
  source: "custom";
  createdAt: string;
}

export interface FilterState {
  search: string;
  category: string | null;
  type: ServerType | null;
  source: ServerSource | null;
  tags: string[];
  verified: boolean | null;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    discord?: string;
  };
}
