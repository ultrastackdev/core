//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},
  images: {
    unoptimized: true
  },
  output: 'export',
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  trailingSlash: true,
  allowedDevOrigins: ['10.0.2.2']
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx
];

module.exports = composePlugins(...plugins)(nextConfig);
