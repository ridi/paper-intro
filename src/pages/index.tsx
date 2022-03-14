import { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Controller } from 'scrollmagic';

import Layout from '@/components/common/Layout';
import SEO from '@/components/common/SEO';
import { Hero } from '@/components/ridipaper4/Hero';
import { ScrollmagicProvider } from '@/components/common/ScrollMagicContext';
import { Specs } from '@/components/ridipaper4/Specs';

const styles = css`
  .main {
    font-family: 'Pretendard', sans-serif;
  }
`;

const RidiPaper4Page = () => {
  const [controller, setController] = React.useState<Controller>();
  const data = useStaticQuery(graphql`
    {
      banner: file(relativePath: { eq: "images/meta/ridipaper/og.jpg" }) {
        publicURL
      }
    }
  `);

  React.useEffect(() => {
    let controller: Controller;
    let destroyed = false;
    import('scrollmagic').then(({ Controller }) => {
      if (destroyed) {
        return;
      }
      controller = new Controller();
      setController(controller);
    });

    return () => {
      controller && controller.destroy();
      destroyed = true;
    };
  }, []);

  return (
    <Layout className={styles.main}>
      <ScrollmagicProvider value={controller}>
        <SEO
          meta={[{ property: 'og:image', content: data.banner.publicURL }]}
        />
        <Hero />
        <Specs />
      </ScrollmagicProvider>
    </Layout>
  );
};

export default RidiPaper4Page;
