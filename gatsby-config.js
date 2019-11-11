const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'RIDIPAPER - 리디페이퍼',
    description: '리디페이퍼, 세상이 나의 서재가 된다',
    author: 'RIDI',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-astroturf',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src/images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
};
