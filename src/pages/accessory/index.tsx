import { css } from 'astroturf';
import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

import Hero from '../../components/hero/Accessory';

css`
  h1 {
    font-size: 50px;
    line-height: 64px;

    @media (max-width: 800px) {
      font-size: 32px;
      line-height: 48px;
    }
  }

  h3 {
    font-size: 36px;
    line-height: 48px;
  }

  p {
    font-size: 20px;
    line-height: 28px;
    color: hsla(0, 0%, 0%, 0.6);

    @media (max-width: 800px) {
      font-size: 18px;
    }
  }
`;

export default function AccessoryIndexPage() {
  return (
    <Layout>
      <SEO title="Accesories" />
      <Hero>
        <h1>안심하고 책에만<br />집중하세요</h1>
        <p>견고한 전용 악세서리가<br />RIDIPAPER를 보호해드립니다.</p>
      </Hero>
    </Layout>
  );
}
