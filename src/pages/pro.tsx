import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import Layout from '@/components/common/Layout';
import SEO from '@/components/common/SEO';
import Hero from '@/components/pro/Hero';
import Feature from '@/components/pro/Feature';
import Display from '@/components/pro/Display';
import Detail from '@/components/pro/Detail';
import Hardware from '@/components/pro/Hardware';
import Providers from '@/components/pro/Providers';
import DesignedBy from '@/components/pro/DesignedBy';
import Compare from '@/components/pro/Compare';
import Spec from '@/components/pro/Spec';

import '@/components/pro/styles.css'
import '@/components/pro/animation.css'

const ProPage = () => {
  const data = useStaticQuery(graphql`
    {
      banner: file(relativePath: {eq: "images/meta/paper-pro/og.png"}) {
        publicURL
      }
    }
  `);

  React.useEffect(() => {
    import('@/components/pro/animation.js').then(({ play }) => play());
  }, []);

  return (
    <div id="ridi_shop">
      <Layout noFooterMargin>
        <SEO
          title="PAPER PRO"
          description="리디북스 페이퍼 프로, 국내 최초 7.8인치 전자책 단말기 PAPER PRO 공식 사이트"
          meta={[{ property: 'og:image', content: data.banner.publicURL }]}
        />
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
