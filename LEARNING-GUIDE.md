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

## Step 4: Add React Plugin

**Why**: Enables React app generation with Nx

```bash
npx nx add @nx/react
```

**Note**: This adds React dependencies to root package.json (we'll fix this next)

---

## Step 5: Create React App with Routing

**Command**:
```bash
npx nx g @nx/react:app my-website --directory=apps/my-website --routing=true --style=css --bundler=vite --e2eTestRunner=none --unitTestRunner=jest --linter=eslint
```

**Problem**: Nx adds React dependencies to root package.json instead of app-specific package.json

---

## Step 6: Fix Dependency Isolation

**Create app-specific package.json**:
```bash
# Create apps/my-website/package.json with only React dependencies
```

**Clean root package.json**:
```bash
# Remove React dependencies from root, keep only Nx tools
```

**Install app dependencies**:
```bash
cd apps/my-website && pnpm install
```

**Result**: ✅ Clean separation - React only in app, Nx tools only in root

---

## Step 7: Test the App

```bash
npx nx serve my-website
```

**Success**: App runs on http://localhost:4200/ with proper dependency isolation!

---

## Step 8: Next Steps (To Do)

- [ ] Add Hello World page with routing
- [ ] Create second app (backend API)
- [ ] Create shared library
- [ ] Test cross-app code sharing

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
