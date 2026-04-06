# Coda MCP Server - Developer Guide

## Architecture

This server uses **bundling** to distribute a single-file executable to non-technical users.

### Source Files (what you edit):
- `server.js` - MCP server that proxies to Coda's remote MCP endpoint
- `auth.js` - Token setup script

### Bundled Files (what users run):
- `dist/server/index.js` - Bundled server (includes all npm dependencies)
- `dist/auth/index.js` - Bundled auth script

## How It Works

1. **User runs auth setup**: Prompts for Coda API token, saves to `~/.config/rf-coda-mcp/token.json`
2. **Claude Code starts server**: Launches `dist/server/index.js` via stdio transport
3. **Server proxies to Coda**: Reads token, forwards all MCP requests to `https://coda.io/apis/mcp` with Authorization header
4. **Coda responds**: Remote MCP server handles the actual tool execution

This approach gives us:
- Individual token per user (secure, auditable)
- Bundled distribution (no npm install needed)
- Transparent proxy (users get full Coda MCP capabilities)

## CRITICAL: Rebuild After Changes

**Whenever you edit `server.js` or `auth.js`, you MUST rebuild:**

```bash
cd coda-server
npm run build
```

This regenerates the `dist/` folder that users actually run.

### What to commit:
✅ Source files (`server.js`, `auth.js`)  
✅ Bundled files (`dist/` folder)  
❌ Dependencies (`node_modules/` - gitignored)

## Why Bundling?

This plugin is distributed to non-technical RainFocus team members who don't have npm installed. Bundling means:
- Users download and it "just works"
- No `npm install` required
- All dependencies embedded in single file

## Build Process

The build script (`npm run build`) uses `@vercel/ncc` to:
1. Bundle `server.js` + all dependencies → `dist/server/index.js`
2. Bundle `auth.js` + all dependencies → `dist/auth/index.js`
3. Create symlink `dist/server/auth.js` → `dist/auth/index.js` (for error messages)

## Testing Changes

After rebuilding, test the bundled server:

```bash
# Test bundled auth
node dist/auth/index.js

# Test bundled server (should show error if no token)
node dist/server/index.js

# Add to Claude Code and test
claude mcp add rf-coda-test node $(pwd)/dist/server/index.js
claude .
# Ask: "What Coda tools do you have access to?"
```

## Common Mistakes

❌ Editing source but forgetting to rebuild → users get stale code  
❌ Rebuilding but forgetting to commit `dist/` → users get old bundle  
❌ Committing `node_modules/` → unnecessary (gitignored)

## Token Security

- Token stored at `~/.config/rf-coda-mcp/token.json` with mode 0o600
- Each user has their own token (not shared)
- Server reads token on startup, caches for session
- If token is invalid, Coda's MCP server returns auth error
