## Created Nx Workspace

> ❯ yarn create nx-workspace --allPrompts

```
✔ Workspace name (e.g., org name)     · Teilen
✔ What to create in the new workspace · apps
✔ Which package manager to use        · pnpm
✔ Main branch name                    · main
✔ Use Nx Cloud? (It's free and doesn't require registration.) · No
```

## Setup Husky

> ❯ pnpm add -D husky lint-staged

## Setup Svelte frontend project

> ❯ pnpm add -d @nrwl/express @nxext/svelte

> ❯ nx generate @nxext/svelte:application diviser

## Setup Express API project

> ❯ nx generate @nrwl/express:application vitrak --frontendProject=diviser

## Setup graphql-lib project

> ❯ nx generate @nrwl/node:library graphql-lib --directory=api

## Setup TS interface Library

> ❯ nx generate @nrwl/workspace:library generated-types --directory=api
