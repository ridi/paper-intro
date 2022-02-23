import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { Controller } from 'scrollmagic';

import { ScrollmagicProvider } from '../components/ScrollmagicContext';

import BlankLayout from '../components/teaserLayout';
import SEO from '../components/seo';
import Body from '../components/teaser/Body';
import MobileBody from '../components/teaser/MobileBody';

const IndexPage = () => {
  const [controller, setController] = React.useState<Controller>();
  const data = useStaticQuery(graphql`
    {
      banner: file(relativePath: { eq: "images/meta/paper4/og.png" }) {
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
    <BlankLayout
      desktop={
        <ScrollmagicProvider value={controller}>
          <Body />
        </ScrollmagicProvider>
      }
      mobile={<MobileBody />}
    >
      <SEO meta={[{ property: 'og:image', content: data.banner.publicURL }]} />
    </BlankLayout>
  );
};

export default IndexPage;
