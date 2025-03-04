module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {},
        'preset-react': {},
        'preset-typescript': {},
      },
    ],
  ],
  // This tells Babel to use SWC for font optimization
  plugins: [],
}; 