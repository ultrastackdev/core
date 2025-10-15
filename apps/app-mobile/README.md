# App Mobile — Web and Android Emulator Guide (Clean Start)

This guide shows how to run the Next.js mobile app on the web and on the Android emulator, starting from a clean state with no `node_modules`, no `out/`, and no Android platform.

## Prerequisites
- Node.js 18+ (LTS) and npm 9+
- Android Studio (SDK, Platform Tools, and an AVD emulator)
- JDK 17+ (`JAVA_HOME` set)
- Windows Firewall allows inbound on the dev port (`3000`)

## Clean Start
- Ensure these folders do not exist. If they do, delete them:
  - `apps/app-mobile/out/`
  - `apps/app-mobile/android/`
  - Any `node_modules/` folders under the repo
- Keep only one `package-lock.json` in the workspace to avoid warnings.

## Install Dependencies
Run from the workspace root (`c:\wexcute\core`):

```
npm install
```

## Web (Dev)
- Start the dev server:

```
nx run app-mobile:serve
```

- Open: `http://localhost:3000/`
- Purpose: live development with hot reload.

## Web (Static Preview)
`next.config.js` is set to `output: 'export'`, so a build produces static assets in `out/`.

- Build static assets:

```
nx run app-mobile:build
```

- Preview static export:

```
nx run app-mobile:preview
```

- Opens: `http://localhost:3000/`

## Android Emulator — Live Edit
Use the Android emulator to load the app from your dev server.

1. Start the dev server:

```
nx run app-mobile:serve
```

2. Verify `apps/app-mobile/capacitor.config.ts` has the dev server for Android emulator:

```
server: {
  url: 'http://10.0.2.2:3000',
  cleartext: true,
}
```

3. Add Android platform if not present:

```
nx run app-mobile:add --configuration android
```

4. Sync native project:

```
nx run app-mobile:sync --configuration android
```

5. Open Android Studio:

```
nx run app-mobile:open --configuration android
```

6. In Android Studio, select an AVD (emulator) and click Run. The app loads from `http://10.0.2.2:3000` and reflects code changes instantly.

Notes:
- `10.0.2.2` is the Android emulator alias to the host machine (equivalent to `localhost`).
- If the emulator cannot reach `10.0.2.2`, use your LAN IP, e.g. `http://192.168.1.x:3000`, and set that in `capacitor.config.ts`.
- Ensure Windows Firewall allows inbound on port `3000`.

## Android Emulator — Bundled Static Assets
Run the app fully offline, bundled with the static build.

1. Disable live server by removing/commenting the `server` block in `apps/app-mobile/capacitor.config.ts`.
2. Build static assets:

```
nx run app-mobile:build
```

3. Sync native project:

```
nx run app-mobile:sync --configuration android
```

4. Open Android Studio and run:

```
nx run app-mobile:open --configuration android
```

The app will load from the bundled `out/` assets.