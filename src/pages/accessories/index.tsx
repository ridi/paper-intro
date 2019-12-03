import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import AccessoryTabPage from '../../components/accessories/AccessoryTabPage';
import Hero from '../../components/hero/Accessory';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Tabs, { Tab } from '../../components/Tabs';

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
    };
  };
  accessories: {
    edges: {
      node: {
        forTab: string;
        slug: string;
        name: { short: string };
        thumbnail: {
          childImageSharp: {
            fixed: FixedObject;
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
  {
    id: 'paper-pro',
    name: 'PAPER PRO',
  },
];

export default function AccessoryIndexPage() {
  const [currentTab, setCurrentTab] = React.useState('ridipaper');
  const data = useStaticQuery<QueryData>(graphql`
    {
      bg: file(relativePath: {eq: "images/accessories/bg.jpg"}) {
        childImageSharp {
          fluid(maxHeight: 600, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      accessories: allAccessoriesYaml(sort: {fields: order}) {
        edges {
          node {
            forTab: for
            slug
            name {
              short
            }
            thumbnail {
              childImageSharp {
                fixed(width: 310, height: 310, quality: 90) {
                  srcSetWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  function renderBackground(props: { className: string }) {
    return <PolyfillImg className={props.className} fluid={data.bg.childImageSharp.fluid} />;
  }

  const accessories = data.accessories.edges
    .filter(({ node }) => node.forTab === currentTab)
    .map(({ node }) => ({
      slug: node.slug,
      name: node.name.short,
      fixed: node.thumbnail.childImageSharp.fixed,
    }));

  return (
    <Layout>
      <SEO title="Accesories" />
      <Hero renderBackground={renderBackground}>
        <h1>안심하고 책에만<br />집중하세요</h1>
        <p>견고한 전용 악세서리가<br />RIDIPAPER를 보호해드립니다.</p>
      </Hero>
      <AccessoryTabWrapper>
        <Tabs>
          {tabs.map(({ id, name }) => (
            <Tab key={id} active={id === currentTab}>
              <a onClick={() => setCurrentTab(id)}>{name}</a>
            </Tab>
          ))}
        </Tabs>
      </AccessoryTabWrapper>
      <AccessoryTabPage items={accessories} />
    </Layout>
  );
}
