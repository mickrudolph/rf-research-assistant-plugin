# Coda MCP Server - Developer Guide

## Architecture

This server uses **bundling** to distribute a single-file executable to non-technical users.

### Source Files (what you edit):
- `launcher.js` - Wrapper that reads token and launches mcp-remote
- `auth.js` - Token setup script

### Bundled Files (what users run):
- `dist/launcher/index.js` - Bundled launcher
- `dist/auth/index.js` - Bundled auth script

## How It Works

1. **User runs auth setup**: Prompts for Coda API token, saves to `~/.config/rf-coda-mcp/token.json`
2. **Claude Code starts launcher**: Launches `dist/launcher/index.js` via stdio transport
3. **Launcher reads token**: Loads token from config file
4. **Launcher spawns mcp-remote**: Runs `npx mcp-remote https://coda.io/apis/mcp --header "Authorization: Bearer TOKEN"`
5. **mcp-remote bridges transports**: Converts between stdio (Claude) and HTTP/SSE (Coda)
6. **Coda responds**: Remote MCP server handles the actual tool execution

This approach gives us:
- Individual token per user (secure, auditable)
- Bundled distribution (no npm install needed for users, mcp-remote installed on-demand)
- Transparent bridge (users get full Coda MCP capabilities)
- Proper HTTP/SSE transport handling via mcp-remote

## CRITICAL: Rebuild After Changes

**Whenever you edit `launcher.js` or `auth.js`, you MUST rebuild:**

```bash
cd coda-server
npm run build
```

This regenerates the `dist/` folder that users actually run.

### What to commit:
✅ Source files (`launcher.js`, `auth.js`)  
✅ Bundled files (`dist/` folder)  
❌ Dependencies (`node_modules/` - gitignored)

## Why Bundling?

This plugin is distributed to non-technical RainFocus team members. Bundling means:
- Users download and it "just works"
- No `npm install` required for the launcher/auth scripts
- `mcp-remote` installed automatically on-demand via npx

## Build Process

The build script (`npm run build`) uses `@vercel/ncc` to:
1. Bundle `launcher.js` → `dist/launcher/index.js`
2. Bundle `auth.js` → `dist/auth/index.js`

## Testing Changes

After rebuilding, test the bundled components:

```bash
# Test bundled auth
node dist/auth/index.js

# Test bundled launcher (should start mcp-remote if token exists)
node dist/launcher/index.js
# Press Ctrl+C to stop

# Test in Claude Code
# Restart Claude Code, then ask: "What Coda tools do you have access to?"
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
