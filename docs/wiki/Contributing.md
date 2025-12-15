# Contributing to MCP Hub

Thank you for your interest in contributing to MCP Hub! This guide will help you get started.

## Ways to Contribute

### 1. Report Bugs

Found a bug? [Open an issue](https://github.com/DxVerm/mcp-hub/issues/new?template=bug_report.md) with:
- Clear description
- Steps to reproduce
- Expected behavior
- Screenshots if applicable

### 2. Request Features

Have an idea? [Open a feature request](https://github.com/DxVerm/mcp-hub/issues/new?template=feature_request.md) describing:
- The problem you're solving
- Your proposed solution
- Any alternatives considered

### 3. Add MCP Servers

Want to add a server to the registry? [Submit a server request](https://github.com/DxVerm/mcp-hub/issues/new?template=server_request.md) or open a PR.

### 4. Submit Code

Fix bugs, add features, or improve documentation through pull requests.

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Getting Started

```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/mcp-hub.git
cd mcp-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

```
mcp-hub/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── data/            # Server and category data
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities
│   └── types/           # TypeScript types
├── tests/
│   ├── unit/            # Vitest unit tests
│   └── e2e/             # Playwright E2E tests
└── docs/                # Documentation
```

## Code Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes

### Components

```typescript
// Good component structure
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      {onAction && <button onClick={onAction}>Action</button>}
    </div>
  );
}
```

### Styling

- Use Tailwind CSS classes
- Follow existing patterns
- Keep components responsive

### Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

## Pull Request Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

- Write clean, readable code
- Add tests for new features
- Update documentation if needed

### 3. Test Your Changes

```bash
# Lint code
npm run lint

# Type check
npm run typecheck

# Run tests
npm run test

# Build to check for errors
npm run build
```

### 4. Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add server filtering by type"
git commit -m "fix: resolve search not finding partial matches"
git commit -m "docs: update installation instructions"
```

### 5. Submit PR

- Fill out the PR template
- Link related issues
- Request review

## Adding a New Server

### Option 1: Submit via Issue

Use the [Server Request template](https://github.com/DxVerm/mcp-hub/issues/new?template=server_request.md).

### Option 2: Direct PR

1. Add server to `src/data/servers.json`:

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "name": "Server Name",
  "description": "Brief description",
  "longDescription": "Detailed description",
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "package-name"],
  "category": "category-id",
  "tags": ["relevant", "tags"],
  "source": "community",
  "verified": false,
  "repository": "https://github.com/...",
  "author": "Author Name",
  "version": "1.0.0",
  "install": {
    "npm": "npm install package-name",
    "npx": "npx -y package-name"
  },
  "claudeConfig": {
    "mcpServers": {
      "server-name": {
        "command": "npx",
        "args": ["-y", "package-name"]
      }
    }
  },
  "tools": [
    {"name": "tool_name", "description": "What it does"}
  ]
}
```

2. Submit PR with description of the server

## Community Guidelines

### Be Respectful

- Treat others with respect
- Welcome newcomers
- Be patient with questions

### Be Constructive

- Provide helpful feedback
- Suggest improvements
- Focus on the code, not the person

### Be Collaborative

- Share knowledge
- Help others learn
- Celebrate contributions

## Recognition

Contributors are recognized in:
- README contributors section
- Release notes
- GitHub contributors page

## Questions?

- [GitHub Discussions](https://github.com/DxVerm/mcp-hub/discussions)
- [Open an Issue](https://github.com/DxVerm/mcp-hub/issues)

---

Thank you for contributing to MCP Hub!
