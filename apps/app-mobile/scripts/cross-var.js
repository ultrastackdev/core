#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const os = require('os');

/**
 * Normalizes command arguments by replacing environment variable placeholders
 * Supports both Unix-style ($VAR) and Windows-style (%VAR%)
 */
function normalize(args) {
  return args.map((arg) => {
    // Get all environment variables sorted by descending length
    // This prevents partial replacement (e.g., $VAR should match before $V)
    const envKeys = Object.keys(process.env).sort((a, b) => b.length - a.length);

    envKeys.forEach((key) => {
      const value = process.env[key];

      if (value === undefined) return;

      // Replace $VAR (Unix) and %VAR% (Windows) patterns
      // Using word boundaries to avoid partial matches
      const unixPattern = new RegExp(`\\$${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\w)`, 'g');
      const winPattern = new RegExp(`%${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}%`, 'g');

      arg = arg.replace(unixPattern, value);
      arg = arg.replace(winPattern, value);
    });

    return arg;
  });
}

/**
 * Main execution logic
 */
function main() {
  let args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Error: No command provided');
    process.exit(1);
  }

  // If only one argument, treat it as a full command string
  if (args.length === 1) {
    const [command] = normalize(args);

    exec(
      command,
      {
        stdio: 'inherit',
        shell: true
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          process.exit(error.code || 1);

          return;
        }

        if (stdout) process.stdout.write(stdout);

        if (stderr) process.stderr.write(stderr);

        process.exit(0);
      }
    );
  } else {
    // Multiple arguments: first is command, rest are arguments
    args = normalize(args);
    const command = args.shift();
    const commandArgs = args;

    // Use spawn for better control and cross-platform support
    const isWindows = os.platform() === 'win32';
    const proc = spawn(command, commandArgs, {
      stdio: 'inherit',
      shell: isWindows, // Use shell on Windows for better compatibility
      env: process.env
    });

    proc.on('error', (error) => {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    });

    proc.on('exit', (code) => {
      process.exit(code || 0);
    });
  }
}

main();
