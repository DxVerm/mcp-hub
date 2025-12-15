# Getting Started with MCP Hub

This guide will help you get up and running with MCP Hub.

## Using the Hosted Version

Visit [MCP Hub](https://mcp-hub.vercel.app) to start browsing MCP servers immediately.

## Self-Hosting

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/DxVerm/mcp-hub.git
cd mcp-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Finding MCP Servers

### Browse by Category

1. Click on "Categories" in the navigation
2. Select a category (Database, AI, Development, etc.)
3. Browse servers in that category

### Search

1. Use the search bar on the home page
2. Search by server name, description, or tags
3. Results update in real-time

### Filters

- **Type**: stdio, http, sse
- **Source**: Official, Community
- **Tags**: Click any tag to filter

## Installing a Server

### Method 1: Copy Configuration

1. Find the server you want
2. Click "Install" or the copy button
3. Paste into your `claude_desktop_config.json`

### Method 2: Quick Commands

Each server page shows install commands:

```bash
# Using npx (no installation)
npx -y @modelcontextprotocol/server-filesystem /path/to/directory

# Using npm (global installation)
npm install -g @modelcontextprotocol/server-filesystem
```

## Configuration File Location

| Platform | Path |
|----------|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

## Example Configuration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

## Next Steps

- [Add Custom Servers](Adding-Custom-Servers.md)
- [Configure MCP Hub](Configuration-Guide.md)
- [Contribute to the Project](Contributing.md)
