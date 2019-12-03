module.exports = {
  modules: true,
  plugins: {
    autoprefixer: {},
    'postcss-nested': {
      unwrap: ['-webkit-keyframes'],
    },
  },
};
