# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability within MCP Hub, please follow these steps:

### Do NOT

- Open a public GitHub issue for security vulnerabilities
- Disclose the vulnerability publicly before it has been addressed

### Do

1. **Email**: Send a detailed report to the repository maintainer via GitHub's private vulnerability reporting feature
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours of your report
- **Initial Assessment**: Within 7 days
- **Resolution Timeline**: Depends on severity, typically 30-90 days
- **Credit**: You will be credited in the security advisory (unless you prefer anonymity)

## Security Measures

### Data Storage

- MCP Hub stores all user data (custom servers, preferences) in **localStorage only**
- No data is sent to external servers
- No authentication or user accounts required
- No cookies or tracking

### Third-Party Dependencies

- We regularly audit dependencies for known vulnerabilities
- Dependabot alerts are enabled
- Critical security updates are prioritized

### Code Security

- TypeScript for type safety
- ESLint for code quality
- No server-side code execution
- All server configurations are client-side only

## Best Practices for Users

When adding custom MCP servers:

1. **Verify Sources**: Only add servers from trusted repositories
2. **Review Commands**: Check the command and arguments before adding
3. **Environment Variables**: Never store sensitive API keys in exported configurations
4. **Backup Data**: Export your server list regularly

## Scope

This security policy applies to:

- The MCP Hub web application
- Official documentation
- GitHub repository

Out of scope:

- Third-party MCP servers listed in the registry
- User-added custom servers
- Forked or modified versions

## Security Updates

Security updates will be announced via:

- GitHub Security Advisories
- Release notes
- README badges

---

Thank you for helping keep MCP Hub and its users safe!
