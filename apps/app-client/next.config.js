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

  return updatedConfig;
};
