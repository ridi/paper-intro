import React from 'react';

import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import Hero from '../components/hero/Accessory';
import Layout from '../components/layout';
import LineBreakText from '../components/LineBreakText';
import SEO from '../components/seo';

import AccessorySection, { Section } from '../components/accessories/AccessorySection';

interface AccessoryDetailQueryData {
  detail: {
    name: {
      en: string;
      full: string;
    };
    description: string;
    bg: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    sections: Section[];
  };
}

interface Props {
  data: AccessoryDetailQueryData;
}

export default function AccessoryDetail(props: Props) {
  const { data } = props;

  function renderBackground(props: { className: string }) {
    return <PolyfillImg className={props.className} fluid={data.detail.bg.childImageSharp.fluid} />;
  }

  return (
    <Layout>
      <SEO title={data.detail.name.full.replace(/\n/g, ' ')} />
      <Hero renderBackground={renderBackground}>
        <p>{data.detail.name.en}</p>
        <h1>
          <LineBreakText text={data.detail.name.full} />
        </h1>
        <p>
          <LineBreakText text={data.detail.description} />
        </p>
      </Hero>
      {data.detail.sections.map((section, idx) => <AccessorySection key={idx} data={section} />)}
    </Layout>
  );
}

export const query = graphql`
  query AccessoryDetail($slug: String!) {
    detail: accessoriesYaml(slug: {eq: $slug}) {
      name {
        en
        full
      }
      description
      bg {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      sections {
        type
        name
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1000, sizes: "(max-width: 1000px) 1000px, 100vw") {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        items {
          name
          desc
        }
      }
    }
  }
`;
