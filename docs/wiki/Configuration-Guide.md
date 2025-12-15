# Configuration Guide

This guide covers how to customize and configure MCP Hub for your needs.

## Environment Variables

When self-hosting, you can customize MCP Hub with environment variables:

```bash
# .env.local
NEXT_PUBLIC_SITE_NAME="My MCP Registry"
NEXT_PUBLIC_SITE_DESCRIPTION="Custom MCP Server Registry"
```

## Customizing Server Data

### Adding New Servers

Edit `src/data/servers.json` to add servers to the registry:

```json
{
  "id": "my-server",
  "slug": "my-server",
  "name": "My Server",
  "description": "Description of my server",
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "my-mcp-package"],
  "category": "development",
  "tags": ["utility", "custom"],
  "source": "community",
  "verified": false,
  "repository": "https://github.com/user/my-server",
  "author": "Your Name",
  "version": "1.0.0",
  "install": {
    "npm": "npm install my-mcp-package",
    "npx": "npx -y my-mcp-package"
  },
  "claudeConfig": {
    "mcpServers": {
      "my-server": {
        "command": "npx",
        "args": ["-y", "my-mcp-package"]
      }
    }
  },
  "tools": [
    {"name": "tool_name", "description": "What the tool does"}
  ]
}
```

### Server Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `slug` | string | Yes | URL-friendly identifier |
| `name` | string | Yes | Display name |
| `description` | string | Yes | Short description |
| `type` | string | Yes | `stdio`, `http`, or `sse` |
| `command` | string | For stdio | Command to run |
| `args` | string[] | No | Command arguments |
| `url` | string | For http/sse | Server URL |
| `env` | object | No | Environment variables |
| `category` | string | Yes | Category ID |
| `tags` | string[] | Yes | Searchable tags |
| `source` | string | Yes | `official`, `community`, `custom` |
| `verified` | boolean | Yes | Verification status |
| `tools` | object[] | No | Available tools |
| `resources` | object[] | No | Available resources |
| `featured` | boolean | No | Show on homepage |

## Customizing Categories

Edit `src/data/categories.json`:

```json
{
  "id": "my-category",
  "name": "My Category",
  "description": "Description of category",
  "icon": "Folder",
  "color": "blue"
}
```

## Theme Customization

### Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add custom colors
    },
  },
}
```

### CSS Variables

Edit `src/app/globals.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* Customize other variables */
}

.dark {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

## Deployment Configuration

### Vercel

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Nginx (Static Export)

```nginx
server {
    listen 80;
    server_name mcp-hub.example.com;
    root /var/www/mcp-hub/out;

    location / {
        try_files $uri $uri.html $uri/ /404.html;
    }
}
```

## Feature Flags

Control features via environment variables:

```bash
# Disable custom server submissions
NEXT_PUBLIC_ENABLE_CUSTOM_SERVERS=false

# Disable import/export
NEXT_PUBLIC_ENABLE_IMPORT_EXPORT=false
```

## Analytics (Optional)

Add analytics by editing `src/app/layout.tsx`:

```typescript
// Example: Plausible Analytics
<Script
  defer
  data-domain="your-domain.com"
  src="https://plausible.io/js/script.js"
/>
```

## SEO Configuration

Edit metadata in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "MCP Hub - MCP Server Registry",
  description: "Your custom description",
  openGraph: {
    title: "MCP Hub",
    description: "Your description",
    url: "https://your-domain.com",
    siteName: "MCP Hub",
  },
};
```
