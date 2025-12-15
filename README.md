# MCP Hub

> Discover, browse, and manage MCP servers for Claude Code

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)

MCP Hub is an open-source registry for Model Context Protocol (MCP) servers. Browse 50+ servers, save your favorites, and get instant Claude configuration snippets.

## Features

- **Browse & Search** - Find MCP servers by category, type, tags, or keyword
- **One-Click Install** - Copy Claude configuration with a single click
- **Save Favorites** - Bookmark servers to your personal collection
- **Add Custom Servers** - Register your own MCP servers
- **Dark/Light Mode** - Automatic theme detection with manual toggle
- **Fully Responsive** - Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Testing**: Vitest + Playwright

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-hub.git
cd mcp-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |

## Project Structure

```
mcp-hub/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx            # Home
│   │   ├── servers/[slug]/     # Server detail
│   │   ├── categories/         # Browse & filter
│   │   ├── my-servers/         # Saved servers
│   │   ├── submit/             # Add server form
│   │   └── about/              # About page
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   ├── layout/             # Header, footer
│   │   ├── servers/            # Server card, grid, filters
│   │   └── home/               # Hero, featured sections
│   ├── data/
│   │   ├── servers.json        # Server database
│   │   └── categories.ts       # Category definitions
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities
│   └── types/                  # TypeScript types
├── tests/
│   ├── unit/                   # Vitest tests
│   └── e2e/                    # Playwright tests
└── public/                     # Static assets
```

## Server Data

Servers are stored in `src/data/servers.json`. Each server has:

```typescript
interface MCPServer {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: "stdio" | "http" | "sse";
  command?: string;
  args?: string[];
  url?: string;
  env?: Record<string, EnvVariable>;
  category: string;
  tags: string[];
  source: "official" | "community" | "custom";
  verified: boolean;
  repository?: string;
  author?: string;
  version?: string;
  install: InstallCommands;
  claudeConfig: object;
  tools?: Tool[];
  featured?: boolean;
}
```

### Adding New Servers

1. Edit `src/data/servers.json`
2. Add your server following the schema above
3. Rebuild the app

Or use the **Submit Server** form in the app to add custom servers locally.

## Categories

| Category | Description |
|----------|-------------|
| Databases | PostgreSQL, MySQL, SQLite, MongoDB, Redis |
| AI & ML | Embeddings, vector DBs, LLM tools |
| Development | Git, GitHub, code analysis |
| Web & Browser | Puppeteer, Playwright, scraping |
| Cloud Services | AWS, GCP, Azure integrations |
| Productivity | Task management, notes, calendars |
| Communication | Slack, Discord, email |
| File Systems | Local files, cloud storage |
| Monitoring | Logs, metrics, observability |
| Security | Auth, secrets, scanning |

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
theme: {
  extend: {
    colors: {
      primary: { ... },
      accent: { ... },
    },
  },
}
```

### Adding Categories

Edit `src/data/categories.ts`:

```typescript
export const categories = [
  {
    id: "your-category",
    name: "Your Category",
    description: "Category description",
    icon: "IconName",
  },
  // ...
];
```

## Testing

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### E2E Tests

```bash
# Run Playwright tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mcp-hub)

### Other Platforms

```bash
# Build for production
npm run build

# The output is in .next/
# Deploy the .next folder to your hosting provider
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute

- Add new MCP servers to the database
- Improve documentation
- Report bugs
- Suggest features
- Submit pull requests

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) by Anthropic
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Framer Motion](https://www.framer.com/motion/) for animations
- All MCP server authors in the community

---

Built with care for the Claude Code community
