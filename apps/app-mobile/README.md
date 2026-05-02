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

## Commands

### Build & Clean

- `nx run app-mobile:clean` — Remove `apps/app-mobile/out` directory.
- `nx run app-mobile:build` — Build web assets (outputs to `apps/app-mobile/out`).

### Development Server

- `nx run app-mobile:serve` — Start dev server on `0.0.0.0:4000`.

### Sync

- `nx run app-mobile:sync` — Sync all Capacitor platforms.
- `nx run app-mobile:android:sync` — Sync Android platform only.
- `nx run app-mobile:ios:sync` — Sync iOS platform only.

### Android

#### Running

- `nx run app-mobile:android:run:live:emulator` — Run with live reload on Android emulator (starts server, uses host `10.0.2.2`).
- `nx run app-mobile:android:run:live:target <device-id>` — Run with live reload on specific Android device (requires HOST env var).
- `nx run app-mobile:android:run` — Run Android app with live reload (requires HOST env var).

#### Platform Management

- `nx run app-mobile:android:add` — Add Android platform (depends on build).
- `nx run app-mobile:android:init` — Starts Android dev (depends on builds, adds android, sync).
- `nx run app-mobile:android:remove` — Remove Android platform.
- `nx run app-mobile:android:open` — Open Android Studio.

#### Build & Diagnostics

- `nx run app-mobile:build:debug:android` — Build debug APK (outputs to `android/app/build/outputs/apk/debug/`, depends on android:start).
- `nx run app-mobile:android:doctor` — Check Android development environment.

#### Get SHA1 for live reload build

run `./gradlew signingReport` inside android folder

### iOS

#### Running

- `nx run app-mobile:ios:run:live:emulator` — Run with live reload on iOS simulator (starts server).
- `nx run app-mobile:ios:run:live:target <device-id>` — Run with live reload on specific iOS device.

#### Platform Management

- `nx run app-mobile:ios:add` — Add iOS platform.
- `nx run app-mobile:ios:remove` — Remove iOS platform.
- `nx run app-mobile:ios:open` — Open Xcode.

#### Diagnostics

- `nx run app-mobile:ios:doctor` — Check iOS development environment (macOS only).

## Environment Configuration

### Setup

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Configure your environment:

   ```bash
   # For production builds (APK)
   BUILD_ENV=production
   HOST=<Local IP>
   ```

### How It Works

- **`BUILD_ENV=development`**: App connects to dev server (`http://0.0.0.0:4000`) for live reload
- **`BUILD_ENV=production`** or empty: App uses bundled assets (for APK builds)
- **`HOST=<Local IP>`** for running live reload apps on Android
