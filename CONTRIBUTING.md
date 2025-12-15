# Contributing to MCP Hub

Thank you for your interest in contributing to MCP Hub! This document provides guidelines and information for contributors.

## Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributors of all skill levels and backgrounds.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/mcp-hub/issues)
2. If not, create a new issue with:
   - Clear title describing the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

### Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use case / why it would be useful
   - Possible implementation approach (optional)

### Adding MCP Servers

The easiest way to contribute is adding new MCP servers to the registry.

1. Fork the repository
2. Edit `src/data/servers.json`
3. Add your server following this schema:

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "name": "Server Name",
  "description": "Brief description (under 100 chars)",
  "longDescription": "Detailed description of the server...",
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@scope/package-name"],
  "category": "development",
  "tags": ["tag1", "tag2"],
  "source": "community",
  "verified": false,
  "repository": "https://github.com/...",
  "author": "Author Name",
  "version": "1.0.0",
  "install": {
    "npm": "npm install @scope/package-name",
    "npx": "npx -y @scope/package-name"
  },
  "claudeConfig": {
    "mcpServers": {
      "server-name": {
        "command": "npx",
        "args": ["-y", "@scope/package-name"]
      }
    }
  },
  "tools": [
    {"name": "tool_name", "description": "What the tool does"}
  ]
}
```

4. Submit a pull request

### Code Contributions

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm run test && npm run test:e2e`
5. Run linting: `npm run lint`
6. Commit with a clear message
7. Push and create a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/mcp-hub.git
cd mcp-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test
npm run test:e2e
```

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Use meaningful variable/function names
- Add comments for complex logic
- Keep components small and focused

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add new MCP server for X
fix: resolve search filter issue
docs: update README with deployment info
style: format code with prettier
test: add unit tests for hooks
```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Keep PRs focused on a single change
4. Request review from maintainers
5. Address any feedback

## Server Verification

For a server to be marked as `verified: true`:

- Must be from an official source (Anthropic, major organizations)
- OR must have significant community usage
- AND must have no known security issues

Community servers should use `verified: false` initially.

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for helping make MCP Hub better!
