# my-better-t-app

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React Native, Expo, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **React Native** - Build mobile apps using React
- **Expo** - Tools for React Native development
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Use the Expo Go app to run the mobile application.

## Project Structure

```
my-better-t-app/
├── apps/
│   ├── native/      # Mobile application (React Native, Expo)
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run dev:native`: Start the React Native/Expo development server
- `pnpm run lint`: Run Biome linting across the workspace
- `pnpm run lint:fix`: Apply Biome lint fixes when safe
- `pnpm run format`: Format the workspace with Biome
- `pnpm run check:biome`: Run Biome checks across the workspace

## Mecenate Mobile Assignment

The Mecenate implementation lives in `apps/native` and is built as a feature-oriented Expo app on top of the existing monorepo.

### Run

```bash
pnpm install
cp apps/native/.env.example apps/native/.env
pnpm --filter @my-better-t-app/mecenate-api run generate
pnpm run dev:native
```

The backend base URL defaults to `https://k8s.mectest.ru/test-app`, so the env file is optional unless you want to override it.

### Where auth UUID is created and stored

- Session bootstrap happens in `apps/native/src/features/session/model/session-bootstrap.tsx`
- UUID generation is handled in `apps/native/src/shared/lib/uuid.ts`
- The token is persisted with Expo SecureStore in `apps/native/src/features/session/model/session-storage.ts`
- Storage key: `mecenate.session.uuid`

Each app install generates and reuses its own UUID bearer token, which is then used for both REST requests and the WebSocket query param.

### How WebSocket sync works

- Connection bootstrap lives in `apps/native/src/features/realtime/model/realtime-connection.tsx`
- The client connects to `<apiBaseUrl>/ws?token=<uuid>`
- It handles `ping`, `like_updated`, and `comment_added`
- Reconnects use exponential backoff between `1s` and `10s`
- Duplicate events are ignored with a short in-memory TTL map
- React Query caches are reconciled through shared helpers in `apps/native/src/features/realtime/lib/query-cache-sync.ts`

Comments are inserted immediately after a successful mutation, and later duplicate socket events are ignored by comment id. Likes are updated optimistically, then reconciled with the mutation response and delayed socket updates.

### Architecture decisions

Implemented folder structure:

```text
apps/native/src/
  core/
    providers/
    stores/
  features/
    session/
    feed/
    post-detail/
    comments/
    realtime/
  shared/
    api/
    config/
    lib/
    model/
    ui/
```

Pragmatic decisions:

- React Query owns all server state: feed, post detail, likes, comments
- MobX is limited to app/session concerns: UUID readiness and WebSocket connection status
- OpenAPI transport concerns live in the workspace package `packages/mecenate-api`
- Schema is vendored at `packages/mecenate-api/openapi/mecenate.openapi.json`
- Transport types are generated into `packages/mecenate-api/src/__generated__/mecenate-api.types.ts`
- Runtime requests are centralized in the package, while the app keeps explicit mappers from transport DTOs into domain models
- Expo Router remains the navigation layer, with feature screens mounted from route files
- Design tokens and shared UI primitives keep styling consistent without introducing a heavyweight design system
- Native imports use scoped aliases: `@core/*`, `@features/*`, `@shared/*`, `@components/*`, `@contexts/*`

### API contract workflow

- Source schema: `packages/mecenate-api/openapi/mecenate.openapi.json`
- Generator: `openapi-typescript`
- Regenerate command:

```bash
pnpm --filter @my-better-t-app/mecenate-api run generate
```

This keeps the backend contract versioned in the repo while preserving a small transport package and a clean app-level domain layer.

### Tradeoffs

- The API docs mention avatar URLs that may be `.webm`; React Native `Image` cannot render those reliably, so the app falls back to initials avatars in that case
- WebSocket event payloads do not include `isLiked`, only `likesCount`, so realtime reconciliation preserves local like state while syncing counts
- Comments are inserted on successful POST rather than with a fake optimistic placeholder to avoid duplicate/fake ids against the realtime stream
