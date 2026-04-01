# Google Drive MCP Server - Developer Guide

## Architecture

This server uses **bundling** to distribute a single-file executable to non-technical users.

### Source Files (what you edit):
- `server.js` - MCP server implementation
- `auth.js` - OAuth authentication flow

### Bundled Files (what users run):
- `dist/server/index.js` - Bundled server (31MB, includes all npm dependencies)
- `dist/auth/index.js` - Bundled auth script (930KB)

## CRITICAL: Rebuild After Changes

**Whenever you edit `server.js` or `auth.js`, you MUST rebuild:**

```bash
cd google-drive-server
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
# Start bundled server (should start without errors)
node dist/server/index.js

# Test bundled auth
node dist/auth/index.js
```

## Common Mistakes

❌ Editing source but forgetting to rebuild → users get stale code  
❌ Rebuilding but forgetting to commit `dist/` → users get old bundle  
❌ Committing `node_modules/` → unnecessary (gitignored)
