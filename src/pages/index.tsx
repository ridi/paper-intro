import { css } from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';

import React from 'react';

import Layout from '@/components/common/Layout';
import SEO from '@/components/common/SEO';
import { ScrollmagicProvider } from '@/components/ridipaper4/RidiPaper4ScrollmagicContext';

import { Gallery } from '@/components/ridipaper4/Gallery';
import { Hero } from '@/components/ridipaper4/Hero';
import { Manual } from '@/components/ridipaper4/Manual';
import { Specs } from '@/components/ridipaper4/Specs';

const styles = css`
  .main {
    font-family: 'Pretendard', sans-serif;
  }
`;

const RidiPaper4Page = () => {
  const data = useStaticQuery(graphql`
    {
      banner: file(relativePath: { eq: "images/meta/ridipaper/og.jpg" }) {
        publicURL
      }
    }
  `);

  return (
    <Layout className={styles.main}>
      <ScrollmagicProvider>
        <SEO
          meta={[{ property: 'og:image', content: data.banner.publicURL }]}
        />
        <Hero />
        <Gallery />
        <Specs />
        <Manual />
      </ScrollmagicProvider>
    </Layout>
  );
};

export default RidiPaper4Page;
