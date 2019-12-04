const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'RIDIPAPER - 리디북스 전자책 단말기, 리디페이퍼',
    description: '리디북스 전용 전자책 단말기 리디페이퍼. 최고의 전자책 서비스 리디셀렉트와 리디북스를 이용할 수 있는 외출 필수품.',
    keywords: [
      '페이퍼',
      '페이퍼 프로',
      '리디페이퍼',
      '리디북스 페이퍼',
      '리디북스 페이퍼 프로',
      '리디북스 리디페이퍼',
      'PAPER',
      'PAPER PRO',
      'RIDIPAPER',
      '7.8인치 전자책 단말기',
      '6인치 전자책 단말기',
      '전자책 단말기',
      '전자책 리더',
      '전자책 리더기',
      '이북리더',
      '이북리더기',
      'E-Book Reader',
      'E-Reader',
      '페이퍼 쇼핑몰',
      '페이퍼샵',
      '리디샵',
      '리페',
      '리페프',
      '외출필수품',
      '전자책',
      '이북',
      '리디북스',
      'EBOOK',
      'E북',
      '오디오북',
      '베스트셀러',
      '만화',
      '웹소설',
      '책추천',
      '추천책',
      '서점',
      '추천도서',
      '도서추천',
      '책대여',
      '책',
      '도서',
      '자기계발',
      '자기개발',
      '면접',
      '독서',
      '글쓰기',
      '이직',
    ],
    author: 'RIDI',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        generateMatchPathRewrites: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'RIDIPAPER',
        short_name: 'PAPER',
        icon: 'src/assets/images/meta/ridipaper/android-chrome-384x384.png',
        icons: [
          {
            src: '/favicons/48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/favicons/96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/favicons/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/384.png',
            sizes: '384x384',
            type: 'image/png',
          },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'browser',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-10567409-11',
      },
    },
    'gatsby-plugin-force-trailing-slashes',
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-astroturf',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline.svg$/,
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: path.resolve(__dirname, 'src/assets'),
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Sans KR:300,400,700:latin,korean'],
        },
        custom: {
          families: ['RIDIBatang'],
        }
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
};
