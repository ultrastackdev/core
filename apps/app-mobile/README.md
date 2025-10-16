# App Mobile - Capacitor Integration

This is a Next.js mobile application integrated with CapacitorJS for cross-platform mobile development.

## 🚀 Quick Start

### Prerequisites
- Node.js and npm installed
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Initial Setup
```bash
# Build the web app and sync with mobile platforms
nx mobile:build app-mobile
```

## 📱 Available Commands

### 🔄 Sync Commands
Sync web assets and Capacitor configuration with native platforms:

```bash
# Sync all platforms
nx cap:sync app-mobile

# Sync specific platforms
nx cap:sync:android app-mobile      # sync Android
nx cap:sync:ios app-mobile          # sync iOS
nx cap:sync:web app-mobile          # sync Web
```

### 📋 Copy Commands
Copy web assets to native platforms without updating native dependencies:

```bash
# Copy to all platforms
nx cap:copy app-mobile

# Copy to specific platforms
nx cap:copy:android app-mobile
nx cap:copy:ios app-mobile
nx cap:copy:web app-mobile
```

### ➕ Platform Management
Add or remove native platforms:

```bash
# Add platforms
nx cap:add:android app-mobile       # add Android
nx cap:add:ios app-mobile           # add iOS

# Remove platforms
nx cap:remove:android app-mobile    # remove Android
nx cap:remove:ios app-mobile        # remove iOS

# List available platforms
nx cap:list app-mobile
```

### 🚀 Development & Serving

#### Web Development
```bash
# Serve web app (default)
nx serve app-mobile

# Serve web app (explicit)
nx cap:run:web app-mobile
```

#### Mobile Development
```bash
# Run on Android device/emulator
nx cap:run:android app-mobile

# Run on iOS simulator/device
nx cap:run:ios app-mobile
```

#### Open Native IDEs
```bash
# Open Android Studio
nx cap:open:android app-mobile

# Open Xcode
nx cap:open:ios app-mobile
```

### 🔧 Diagnostics & Maintenance

#### Environment Diagnostics
```bash
# Check Capacitor environment
nx cap:doctor app-mobile

# Check Android-specific environment
nx cap:doctor:android app-mobile

# Check iOS-specific environment
nx cap:doctor:ios app-mobile
```

#### Configuration & Cleanup
```bash
# Open Capacitor configuration
nx cap:config app-mobile

# Clean build outputs and native syncs
nx cap:clean app-mobile
nx cap:clean:android app-mobile
nx cap:clean:ios app-mobile
```

### 🏗️ Build Pipeline
```bash
# Combined build and sync (recommended for deployment)
nx mobile:build app-mobile
```

## 📁 Project Structure

```
apps/app-mobile/
├── src/                    # Next.js source code
├── public/                 # Static assets
├── out/                    # Build output (generated)
├── android/                # Android native project (generated)
├── ios/                    # iOS native project (generated)
├── capacitor.config.ts     # Capacitor configuration
├── next.config.js          # Next.js configuration
└── project.json           # Nx project configuration
```

## ⚙️ Configuration Files

### Capacitor Configuration
- **File**: `capacitor.config.ts`
- **Purpose**: Defines app ID, name, and web directory
- **Web Directory**: `out/.next` (Next.js static export output)

### Next.js Configuration
- **File**: `next.config.js`
- **Key Settings**:
  - `output: 'export'` - Enables static export for Capacitor
  - `images.unoptimized: true` - Disables image optimization for static export

## 🔄 Development Workflow

1. **Start Development**:
   ```bash
   nx serve app-mobile
   ```

2. **Build and Test Mobile**:
   ```bash
   nx mobile:build app-mobile
   ```

3. **Open Native IDE**:
   ```bash
   # For Android
   nx cap:open:android app-mobile
   
   # For iOS
   nx cap:open:ios app-mobile
   ```

4. **Run on Device**:
   ```bash
   # Android
   nx mobile:run:android app-mobile
   
   # iOS
   nx cap:run:ios app-mobile
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all API routes have `export const dynamic = 'force-static';` for static export compatibility.

2. **Sync Issues**: Run `nx cap:clean app-mobile` followed by `nx mobile:build app-mobile`.

3. **Platform Issues**: Use `nx cap:doctor app-mobile` to check environment setup.

### Environment Setup

- **Android**: Ensure Android Studio and Android SDK are properly installed
- **iOS**: Ensure Xcode and iOS SDK are installed (macOS only)
- **CocoaPods**: Install for iOS development: `sudo gem install cocoapods`

## 📚 Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Nx Documentation](https://nx.dev)

## 🎯 Key Features

- ✅ Cross-platform mobile development (iOS & Android)
- ✅ Next.js with static export for Capacitor compatibility
- ✅ Comprehensive Nx command integration
- ✅ Hot reload development workflow
- ✅ Native IDE integration
- ✅ Automated build and sync pipeline