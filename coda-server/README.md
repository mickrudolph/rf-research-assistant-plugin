# RF Coda MCP Server

A bundled MCP server for Coda integration with Claude Code.

## For Users

This plugin works out of the box - no installation required! The server is pre-bundled in the `dist/` folder.

### Setup

1. **Get your Coda API token:**
   - Visit https://coda.io/account
   - Scroll to "API settings" section
   - Click "Generate API token"
   - Set restriction type to "MCP"
   - Choose access type (Read and write, or Read only)
   - Copy the token

2. **Run the auth setup:**
   ```bash
   node dist/auth/index.js
   ```
   Paste your token when prompted.

3. **Restart Claude Code:**
   The plugin's `.mcp.json` already includes the Coda server configuration.
   Just restart Claude Code to pick up the changes.

4. **Start using Coda!**
   Launch Claude Code and you'll have access to all Coda MCP tools.

### Available Tools

Once connected, you can:
- **Documents**: Create, read, and delete Coda documents
- **Pages**: Create, read, update, and delete pages
- **Tables**: Create tables, manage rows and columns
- **Formulas**: Create and manage Coda formulas
- **Content**: Modify page content, upload images
- **Search**: Search across documents, pages, and tables
- **Navigation**: Convert URLs, check user info

## For Developers

See [CLAUDE.md](CLAUDE.md) for developer documentation.
