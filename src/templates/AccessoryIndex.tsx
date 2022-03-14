import styled from 'astroturf';
import React from 'react';

import { graphql, Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import Layout from '@/components/common/Layout';
import SEO from '@/components/common/SEO';
import Tabs, { Tab } from '@/components/common/Tabs';

import AccessoryTabPage from '@/components/accessories/AccessoryTabPage';
import AccessoryHero from '@/components/accessories/AccessoryHero';

const AccessoryTabWrapper = styled.nav`
  width: 100%;
  max-width: 1200px;
  margin: 50px auto 0;
  padding: 0 100px;

  @media (max-width: 600px) {
    margin: 0;
    padding: 0;
  }
`;

interface QueryData {
  bg: {
    childImageSharp: {
      fluid: FluidObject;
      banner: {
        src: string;
      };
    };
  };
  accessories: {
    edges: {
      node: {
        slug: string;
        name: { short: string };
        thumbnail: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
    }[];
  };
}

const tabs = [
  {
    id: 'ridipaper',
    name: 'RIDIPAPER',
  },
];

interface Props {
  data: QueryData;
  pageContext: {
    forTab: string;
  };
}

export default function AccessoryIndexPage(props: Props) {
  const { data, pageContext } = props;

  function renderBackground(props: { className: string }) {
    return <PolyfillImg className={props.className} fluid={data.bg.childImageSharp.fluid} />;
  }

  const accessories = data.accessories.edges.map(({ node }) => ({
    slug: node.slug,
    name: node.name.short,
    fluid: node.thumbnail.childImageSharp.fluid,
  }));

  return (
    <Layout>
      <SEO
        title="Accesory"
        meta={[{ property: 'og:image', content: data.bg.childImageSharp.banner.src }]}
      />
      <AccessoryHero renderBackground={renderBackground}>
        <h1>안심하고 책에만<br />집중하세요</h1>
        <p>견고한 전용 악세서리가<br />RIDIPAPER를 보호해드립니다.</p>
      </AccessoryHero>
      <AccessoryTabWrapper>
        <Tabs>
          {tabs.map(({ id, name }) => (
            <Tab key={id} active={id === pageContext.forTab}>
              <Link to={`/accessories/${id}/`}>{name}</Link>
            </Tab>
          ))}
        </Tabs>
      </AccessoryTabWrapper>
      <AccessoryTabPage items={accessories} />
    </Layout>
  );
}

export const query = graphql`
  query AccessoryIndex($forTab: String!) {
    bg: file(relativePath: {eq: "images/accessories/bg.jpg"}) {
      childImageSharp {
        fluid(maxHeight: 600, sizes: "1600px" quality: 80) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
        banner: resize(width: 1200, height: 630, quality: 90) {
          src
        }
      }
    }
    accessories: allAccessoriesYaml(filter: {for: {eq: $forTab}}, sort: {fields: order}) {
      edges {
        node {
          slug
          name {
            short
          }
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 310, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
