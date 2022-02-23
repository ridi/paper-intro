import { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Controller } from 'scrollmagic';

import { ScrollmagicProvider } from '../components/ScrollmagicContext';

import AccessoryBanner from '../components/AccessoryBanner';
import Details from '../components/details';
import Features from '../components/features';
import Hero from '../components/hero/IndexPage';
import Layout from '../components/layout';
import Panel from '../components/panel';
import Ridibatang from '../components/ridibatang';
import SEO from '../components/seo';
import Specs from '../components/specs';
import ViewerFeatures from '../components/viewer-features';

const styles = css`
  .main {
    > section {
      display: block;

      &:first-of-type {
        margin-top: 200px;

        @media (max-width: 800px) {
          margin-top: 80px;
        }
      }

      & + section {
        margin-top: 200px;

        @media (max-width: 800px) {
          margin-top: 120px;
        }
      }
    }
  }
`;

const RidiPaperPage = () => {
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
        <Features />
        <ViewerFeatures />
        <Panel />
        <Details />
        <Ridibatang />
        <AccessoryBanner />
        <Specs />
      </ScrollmagicProvider>
    </Layout>
  );
};

export default RidiPaperPage;
