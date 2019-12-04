import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  description: string;
  lang: string;
  meta: (JSX.IntrinsicElements['meta'])[];
  title?: string;
}

function SEO({ description, lang, meta, title }: Props) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            author
          }
        }
        appleTouchIcon: file(relativePath: {eq: "images/meta/ridipaper/apple-touch-icon.png"}) {
          url: publicURL
        }
        favicon32: file(relativePath: {eq: "images/meta/ridipaper/favicon-32x32.png"}) {
          url: publicURL
        }
        favicon16: file(relativePath: {eq: "images/meta/ridipaper/favicon-16x16.png"}) {
          url: publicURL
        }
      }
    `,
  );
  const { site } = data;

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || site.siteMetadata.title}
      titleTemplate={title ? `%s | ${site.siteMetadata.title}` : undefined}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'keywords',
          content: site.siteMetadata.keywords.join(', '),
        },
        ...meta,
      ]}
      link={[
        {
          rel: 'apple-touch-icon',
          href: data.appleTouchIcon.url,
          sizes: '180x180',
        },
        {
          rel: 'icon',
          href: data.favicon32.url,
          sizes: '32x32',
          type: 'image/png',
        },
        {
          rel: 'icon',
          href: data.favicon16.url,
          sizes: '32x32',
          type: 'image/png',
        },
      ]}
    />
  );
}

SEO.defaultProps = {
  lang: 'ko',
  meta: [],
  description: '',
};

export default SEO;
