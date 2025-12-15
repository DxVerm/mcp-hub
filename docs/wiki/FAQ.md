# Frequently Asked Questions

## General

### What is MCP Hub?

MCP Hub is an open-source registry for Model Context Protocol (MCP) servers. It helps you discover, configure, and manage MCP servers for Claude Code and other MCP-compatible clients.

### What is MCP?

Model Context Protocol (MCP) is a protocol that allows AI assistants to interact with external tools and data sources. MCP servers provide capabilities like file access, database queries, web scraping, and more.

### Is MCP Hub free?

Yes! MCP Hub is completely free and open-source under the MIT license. You can use it, modify it, and host your own instance.

### Do I need an account?

No. MCP Hub doesn't require any account or authentication. All your data is stored locally in your browser.

## Using MCP Hub

### How do I install an MCP server?

1. Find the server you want in MCP Hub
2. Click the "Install" button or copy icon
3. Paste the configuration into your Claude config file
4. Restart Claude Desktop

### Where is the Claude config file?

| Platform | Location |
|----------|----------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

### Can I add my own MCP servers?

Yes! Use the Submit page to add custom servers. They're stored in your browser's localStorage.

### How do I backup my custom servers?

Go to My Servers and click "Export" to download a JSON file with all your custom servers.

### What's the difference between Official and Community servers?

- **Official**: Created by Anthropic or the MCP team
- **Community**: Created by third-party developers
- **Custom**: Servers you've added yourself

## Technical

### What technologies is MCP Hub built with?

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion

### Does MCP Hub collect any data?

No. MCP Hub:
- Stores all data locally in your browser
- Makes no external API calls
- Has no analytics by default
- Doesn't track users

### Can I self-host MCP Hub?

Absolutely! Clone the repo and deploy it anywhere:

```bash
git clone https://github.com/DxVerm/mcp-hub.git
cd mcp-hub
npm install
npm run build
npm start
```

### How do I contribute?

See our [Contributing Guide](Contributing.md). We welcome:
- Bug reports
- Feature requests
- Pull requests
- Documentation improvements

## Troubleshooting

### MCP server not working after installation

1. Check the command path is correct
2. Verify required environment variables are set
3. Restart Claude Desktop
4. Check Claude's logs for errors

### Custom servers disappeared

Your browser's localStorage may have been cleared. To prevent data loss:
- Export your servers regularly
- Check browser privacy settings

### Search not finding servers

- Try different keywords
- Check spelling
- Use broader search terms
- Try filtering by category instead

### Page not loading

1. Clear browser cache
2. Try a different browser
3. Check console for errors
4. Try incognito/private mode

## Contributing

### How do I report a bug?

Open an issue on [GitHub](https://github.com/DxVerm/mcp-hub/issues) with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

### How do I request a new server be added?

1. Go to GitHub Issues
2. Use the "Add MCP Server" template
3. Fill in the server details
4. Submit the issue

### Can I add servers to the main registry?

Yes! Fork the repo, add your server to `src/data/servers.json`, and submit a pull request.

## Still Have Questions?

- [GitHub Discussions](https://github.com/DxVerm/mcp-hub/discussions)
- [Open an Issue](https://github.com/DxVerm/mcp-hub/issues)
