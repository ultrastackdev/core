# App Mobile - Capacitor Integration

This is a Next.js mobile application integrated with CapacitorJS for cross-platform mobile development.

## Prerequisites
- Node.js and npm
- Android Studio (Android)
- Xcode (iOS, macOS only)

## Quick Start
```bash
# Build web assets
nx run app-mobile:build

# Sync Capacitor with native projects
nx run app-mobile:sync

# Run Android with live reload (emulator)
nx run app-mobile:android:run:live:emulator
```

## Key Commands
- `nx run app-mobile:serve` — Dev server on `0.0.0.0:4000` (depends on build).
- `nx run app-mobile:build` — Output to `apps/app-mobile/out`.
- `nx run app-mobile:clean` — Remove `apps/app-mobile/out`.
- `nx run app-mobile:sync` — Sync all platforms.
- `nx run app-mobile:android:sync` — Sync Android only.
- `nx run app-mobile:android:run:live:emulator` — Live reload on emulator (starts server).
- `nx run app-mobile:android:run:live:target --target <device-id>` — Live reload on specific device.
- `nx run app-mobile:android:add` / `nx run app-mobile:ios:add` — Add platforms.
- `nx run app-mobile:android:remove` / `nx run app-mobile:ios:remove` — Remove platforms.
- `nx run app-mobile:android:open` / `nx run app-mobile:ios:open` — Open native IDEs.
- `nx run app-mobile:android:doctor` / `nx run app-mobile:ios:doctor` — Environment checks.

## Troubleshooting
- Android check: `nx run app-mobile:android:doctor`.
- iOS check (macOS): `nx run app-mobile:ios:doctor`.
- Resync if stale: `nx run app-mobile:clean && nx run app-mobile:build && nx run app-mobile:sync`.