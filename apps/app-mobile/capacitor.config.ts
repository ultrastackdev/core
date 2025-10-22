import type { CapacitorConfig } from '@capacitor/cli';
import { networkInterfaces } from 'os';

// Function to get the local IP address
function getLocalIpAddress(): string {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  // Prefer WiFi/Ethernet interfaces
  const preferredInterfaces = ['Wi-Fi', 'Ethernet', 'en0', 'eth0', 'wlan0'];

  for (const interfaceName of preferredInterfaces) {
    if (results[interfaceName] && results[interfaceName].length > 0) {
      return results[interfaceName][0];
    }
  }

  // Fallback to any available interface
  const allAddresses = Object.values(results).flat() as string[];
  return allAddresses.length > 0 ? allAddresses[0] : 'localhost';
}

const localIp = getLocalIpAddress();
const serverUrl = `http://0.0.0.0:4000`;

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'App Mobile',
  webDir: 'out/.next',
  server: {
    url: serverUrl,
    cleartext: true,
  },
};

console.log(`Capacitor server URL: ${serverUrl}`);

export default config;
