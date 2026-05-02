module.exports = {
  '{apps,libs,tools}/**/*.{ts,tsx}': (files) => {
    return `nx affected -t typecheck --files=${files.join(',')} --skip-nx-cache`;
  },
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': [
    (files) => `nx affected -t lint --files=${files.join(',')}`,
    (files) => `nx format:write --files=${files.join(',')}`
  ]
};
