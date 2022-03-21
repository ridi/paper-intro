import React from 'react';

import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import Layout from '@/components/common/Layout';
import LineBreakText from '@/components/common/LineBreakText';
import SEO from '@/components/common/SEO';

import AccessoryHero from '@/components/accessories/AccessoryHero';
import AccessorySection, { Section } from '@/components/accessories/AccessorySection';

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
        banner: {
          src: string;
        };
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
      <SEO
        title={data.detail.name.full.replace(/\n/g, ' ')}
        meta={[{ property: 'og:image', content: data.detail.bg.childImageSharp.banner.src }]}
      />
      <AccessoryHero renderBackground={renderBackground}>
        <p>{data.detail.name.en}</p>
        <h1>
          <LineBreakText text={data.detail.name.full} />
        </h1>
        <p>
          <LineBreakText text={data.detail.description} />
        </p>
      </AccessoryHero>
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
          fluid(maxHeight: 600, sizes: "1600px", quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
          banner: resize(width: 1200, height: 630, quality: 90) {
            src
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
            fluid(maxWidth: 1000, sizes: "(max-width: 1000px) 1000px, 100vw", quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        tableRows {
          head
          items
        }
        items {
          name
          desc
        }
        disclaimer
      }
    }
  }
`;
