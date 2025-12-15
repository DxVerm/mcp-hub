# Adding Custom Servers

MCP Hub allows you to add and manage your own custom MCP servers. All custom servers are stored locally in your browser.

## Adding a Custom Server

### Via the Submit Form

1. Navigate to **Submit** in the navigation
2. Fill in the server details:
   - **Name**: Display name for your server
   - **Description**: Brief description of functionality
   - **Type**: Select stdio, http, or sse
   - **Command**: The command to run (e.g., `npx`, `node`)
   - **Arguments**: Command arguments as JSON array
   - **Category**: Select the most appropriate category
   - **Tags**: Add relevant tags for searchability

3. Click **Submit Server**

### Server Types

| Type | Description | Example |
|------|-------------|---------|
| `stdio` | Standard input/output communication | Most npm packages |
| `http` | HTTP-based server | REST API servers |
| `sse` | Server-Sent Events | Real-time streaming servers |

## Configuration Examples

### Basic stdio Server

```json
{
  "name": "My Custom Server",
  "type": "stdio",
  "command": "node",
  "args": ["/path/to/server.js"],
  "category": "development",
  "tags": ["custom", "utility"]
}
```

### Server with Environment Variables

```json
{
  "name": "API Server",
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "my-mcp-server"],
  "env": {
    "API_KEY": {
      "description": "Your API key",
      "required": true
    }
  }
}
```

### HTTP Server

```json
{
  "name": "Remote Server",
  "type": "http",
  "url": "http://localhost:8080/mcp",
  "category": "web"
}
```

## Managing Custom Servers

### View Custom Servers

1. Go to **My Servers**
2. Click the **Custom** tab
3. View all your added servers

### Edit a Server

1. Find the server in My Servers
2. Click the **Edit** button
3. Modify the configuration
4. Save changes

### Delete a Server

1. Find the server in My Servers
2. Click the **Delete** button
3. Confirm deletion

## Import/Export

### Export Your Servers

1. Go to **My Servers**
2. Click **Export**
3. Save the JSON file

### Import Servers

1. Go to **My Servers**
2. Click **Import**
3. Select your JSON file
4. Servers are merged with existing ones

### Export Format

```json
{
  "servers": [
    {
      "id": "custom-server-1",
      "name": "My Server",
      "type": "stdio",
      "command": "node",
      "args": ["server.js"],
      "category": "custom",
      "tags": ["utility"],
      "source": "custom"
    }
  ],
  "exported": "2024-01-15T10:30:00Z"
}
```

## Best Practices

1. **Unique Names**: Give each server a clear, unique name
2. **Good Descriptions**: Write helpful descriptions for future reference
3. **Appropriate Tags**: Use relevant tags for easy searching
4. **Regular Backups**: Export your servers periodically
5. **Security**: Never include actual API keys in exported configurations

## Troubleshooting

### Server Not Appearing

- Refresh the page
- Check browser console for errors
- Verify localStorage is not full

### Import Failing

- Ensure JSON is valid
- Check for duplicate IDs
- Verify required fields are present

### Data Lost

- Check if localStorage was cleared
- Import from your backup file
- Check for browser privacy settings blocking localStorage
