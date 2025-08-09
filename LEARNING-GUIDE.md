# Nx Monorepo Learning Guide

Step-by-step guide to building an Nx monorepo from scratch.

## What We're Learning

- **Monorepo**: One repository containing multiple projects
- **Nx**: Tool to manage monorepos efficiently  
- **Package-based approach**: Each project has its own package.json

---

## Step 1: Install pnpm (Package Manager)

**Why**: pnpm is faster and more efficient than npm

```bash
npm install -g pnpm
```

---

## Step 2: Create Package-based Nx Workspace

**Why**: Package-based keeps each project's dependencies separate (not shared in root)

```bash
npx create-nx-workspace@latest learning-nx --preset=npm --packageManager=pnpm --ci=skip
cd learning-nx
```

**What we got**:
- `package.json` - Only Nx tools (clean!)
- `pnpm-workspace.yaml` - Tells pnpm where to find projects
- `apps/` folder - Where individual projects will live


---

## Step 4: Next Steps (To Do)

- [ ] Add React plugin
- [ ] Create first React app in apps/
- [ ] Verify app has its own package.json
- [ ] Create second app (backend API)
- [ ] Create shared library

---

## Key Files Explained

- **`pnpm-workspace.yaml`** - Tells pnpm where to find projects with package.json files
- **`nx.json`** - Nx configuration for the workspace
- **`apps/`** - Where your applications live (each with own package.json)

---

## Benefits of This Approach

✅ Clean separation - each app has only the dependencies it needs  
✅ No version conflicts - different apps can use different React versions  
✅ Smaller bundles - apps only include what they import  
✅ Team workflow - frontend devs don't see backend dependencies  
