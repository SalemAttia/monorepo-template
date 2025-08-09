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

## Step 8: Create Express Backend API

**Add Express plugin**:
```bash
npx nx add @nx/express
```

**Generate Express app**:
```bash
npx nx g @nx/express:app my-api --directory=apps/my-api --e2eTestRunner=none --linter=eslint
```

**Create app-specific package.json for API**:
```json
{
  "name": "my-api",
  "dependencies": {
    "express": "4.21.2"
  },
  "devDependencies": {
    "@types/express": "4.17.23"
  }
}
```

**Clean root package.json**: Remove Express dependencies from root

**Install and test**:
```bash
cd apps/my-api && pnpm install
npx nx serve my-api
curl http://localhost:3333/api
```

**Result**: ✅ API responds with `{"message":"Welcome to my-api!"}`

---

## Step 9: Current Architecture

```
learning-nx/
├── apps/
│   ├── my-website/          ← React app (port 4200)
│   │   └── package.json     ← React dependencies only
│   └── my-api/              ← Express API (port 3333)
│       └── package.json     ← Express dependencies only
└── package.json             ← Only Nx tools (clean!)
```

**Perfect isolation**: Each app has only the dependencies it needs!

---

## Step 10: Create Shared Library

**Generate shared library**:
```bash
npx nx g @nx/js:lib shared-utils --directory=libs/shared-utils --bundler=tsc
```

**Add useful shared functions** in `libs/shared-utils/src/lib/shared-utils.ts`:
```typescript
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
```

**Update pnpm-workspace.yaml** to include libs:
```yaml
packages: 
  - "apps/*"
  - "libs/*"
```

**Build the library**:
```bash
npx nx build shared-utils
```

---

## Step 11: Use Shared Library in Backend

**Add to API's package.json**:
```json
{
  "dependencies": {
    "express": "4.21.2",
    "@learning-nx/shared-utils": "workspace:*"
  }
}
```

**Use in API** (`apps/my-api/src/main.ts`):
```typescript
import { formatDate, generateId, capitalize } from '@learning-nx/shared-utils';

app.get('/api', (req, res) => {
  res.send({ 
    message: 'Welcome to my-api!',
    id: generateId(),
    date: formatDate(new Date()),
    greeting: capitalize('hello from shared utils!')
  });
});
```

**Install and test**:
```bash
cd apps/my-api && pnpm install
npx nx serve my-api
curl http://localhost:3333/api
```

---

## Step 12: Create UI Components Library

**Generate React UI library with Rollup**:
```bash
npx nx g @nx/react:lib ui-components --directory=libs/ui-components --bundler=rollup --unitTestRunner=jest --component=true
```

**Create reusable components** (Button, Card with variants and props):
- Button with primary/secondary variants and small/medium/large sizes
- Card component with title and content
- CSS modules for styling

**Build the library**:
```bash
npx nx build ui-components
```

---

## Step 13: Use UI Components in React App

**Add dependencies to React app**:
```json
{
  "dependencies": {
    "@learning-nx/ui-components": "workspace:*",
    "@learning-nx/shared-utils": "workspace:*"
  }
}
```

**Use in React app** (`apps/my-website/src/app/app.tsx`):
```tsx
import { Button, Card } from '@learning-nx/ui-components';
import { formatDate, generateId, capitalize } from '@learning-nx/shared-utils';

// Use components with props and variants
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>

<Card title="User Info">
  <p>ID: {generateId()}</p>
  <p>Date: {formatDate(new Date())}</p>
</Card>
```

**Result**: ✅ Fully functional React app using shared UI components and utilities!

---

## Step 14: Final Architecture

```
learning-nx/
├── apps/
│   ├── my-website/          ← React app using ui-components + shared-utils
│   └── my-api/              ← Express API using shared-utils
├── libs/
│   ├── shared-utils/        ← Utility functions (both apps)
│   └── ui-components/       ← React components (frontend apps)
└── package.json             ← Only Nx tools (clean!)
```

**Perfect Monorepo**: 
- ✅ Clean dependency separation per app
- ✅ Shared code reuse across apps  
- ✅ Different tech stacks (React + Express)
- ✅ Consistent UI components
- ✅ Type-safe imports
- ✅ Optimized builds (Rollup for libs, Vite for apps)

**Visit**: `http://localhost:4200` to see the React app with shared components!

---

## Step 15: Add Convenient npm Scripts

**Added to root package.json** for easier development:

### **Development Commands**:
```bash
pnpm run start:website     # Start React app (port 4200)
pnpm run start:api         # Start Express API (port 3333)
```

### **Build Commands**:
```bash
pnpm run build:website     # Build React app
pnpm run build:api         # Build Express API  
pnpm run build:libs        # Build all libraries
pnpm run build:all         # Build everything
```

### **Testing Commands**:
```bash
pnpm run test:website      # Test React app
pnpm run test:api          # Test Express API
pnpm run test:libs         # Test all libraries
pnpm run test:all          # Test everything
```

### **Smart CI/CD Commands**:
```bash
pnpm run affected:show     # Show what projects changed
pnpm run affected:build    # Build only changed projects
pnpm run affected:test     # Test only changed projects
pnpm run affected:lint     # Lint only changed projects
```

### **Utility Commands**:
```bash
pnpm run graph            # Open dependency graph visualization
pnpm run lint:all         # Lint all projects  
pnpm run lint:fix         # Lint and auto-fix all projects
pnpm run format           # Format all code
pnpm run clean            # Clean Nx cache
```

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
