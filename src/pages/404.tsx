import { css } from 'astroturf';
import React from 'react';

import Layout from '@/components/common/Layout';
import SEO from '@/components/common/SEO';

const styles = css`
  .NotFoundHero {
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    padding: 200px 40px 100px;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className={styles.NotFoundHero}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
  </Layout>
);

export default NotFoundPage;
