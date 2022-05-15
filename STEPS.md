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
