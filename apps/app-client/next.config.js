const { withNx } = require('@nx/next');

const nextConfig = {
  nx: {
    svgr: false,
  },
};

const plugins = [];

module.exports = async (phase, context) => {
  let updatedConfig = plugins.reduce((acc, fn) => fn(acc), nextConfig);

  // Apply the async function that `withNx` returns.
  updatedConfig = await withNx(updatedConfig)(phase, context);

  // If you have plugins that has to be added after Nx you can do that here.
  // For example, Sentry needs to be added last.
  const { withSentryConfig } = require('@sentry/nextjs');
  updatedConfig = withSentryConfig(updatedConfig);

  return updatedConfig;
};
