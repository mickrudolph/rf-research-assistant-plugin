# RF Google Drive MCP Server

A bundled MCP server for Google Drive integration with Claude Code.

## For Users

This plugin works out of the box - no installation required! The server is pre-bundled in the `dist/` folder.

To authenticate:
```bash
node dist/auth/index.js
```

## For Developers

### Building from source

If you make changes to `server.js` or `auth.js`, rebuild the bundles:

```bash
npm install
npm run build
```

This creates:
- `dist/server/index.js` - Bundled MCP server (all dependencies included)
- `dist/auth/index.js` - Bundled auth script (all dependencies included)

### Why bundling?

The bundled files include all npm dependencies in a single file, so:
- ✅ Users don't need to run `npm install`
- ✅ No `node_modules` in git (smaller repo)
- ✅ Faster startup time
- ✅ Version consistency across all users

### Project structure

```
google-drive-server/
├── server.js          # Source: MCP server
├── auth.js            # Source: OAuth setup script
├── package.json       # Dependencies
├── dist/              # Bundled outputs (commit these!)
│   ├── server/
│   │   └── index.js   # Bundled server
│   └── auth/
│       └── index.js   # Bundled auth
└── node_modules/      # Dev dependencies (gitignored)
```

**Important:** Always commit the `dist/` folder after rebuilding!
