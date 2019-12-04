import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/pro/Hero';
import Feature from '../components/pro/Feature';
import Display from '../components/pro/Display';
import Detail from '../components/pro/Detail';
import Hardware from '../components/pro/Hardware';
import Providers from '../components/pro/Providers';
import DesignedBy from '../components/pro/DesignedBy';
import Compare from '../components/pro/Compare';
import Spec from '../components/pro/Spec';

import '../components/pro/styles.css'
import '../components/pro/animation.css'

const ProPage = () => {
  React.useEffect(() => {
    import('../components/pro/animation.js').then(({ play }) => play());
  }, []);

  return (
    <div id="ridi_shop">
      <Layout noFooterMargin>
        <SEO title="PAPER PRO" />
        <section id="shop_contents">
          <div className="js_trigger" id="page_intro">
            <Hero />
            <Feature />
            <Display />
            <Detail />
            <Hardware />
            <Providers />
            <DesignedBy />
            <Compare />
            <Spec />
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default ProPage;
