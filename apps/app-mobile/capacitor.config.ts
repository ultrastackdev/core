import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: '@new-ultrastack/app-mobile',
  webDir: 'dist/.next',

  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#000000'
    }
  }
};

export default config;
