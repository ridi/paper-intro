import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { FixedObject } from 'gatsby-image';

import AccessoryTabPage from '../../components/accessories/AccessoryTabPage';
import Hero from '../../components/hero/Accessory';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

const AccessoryTabWrapper = styled.nav`
  width: 100%;
  max-width: 1200px;
  margin: 50px auto 0;
  padding: 0 100px;

  @media (max-width: 600px) {
    margin: 0;
    padding: 0;
  }

  > ul {
    display: flex;
    border-bottom: 1px solid #d1d5d9;
  }
`;

const AccessoryTab = styled<'li', { active?: boolean }>('li')`
  list-style: none;
  margin-bottom: -1px;

  @media (max-width: 600px) {
    flex: 1;
  }

  > a {
    display: block;
    width: 88px;
    padding: 12px 0 9px;

    border-bottom: 4px solid transparent;
    font-size: 15px;
    line-height: 20px;
    text-align: center;
    color: #636c73;

    cursor: pointer;

    @media (max-width: 600px) {
      width: auto;
    }
  }

  &.active > a {
    border-bottom-color: #9ea7ad;
    font-weight: bold;
    color: #303538;
  }

  & + & {
    margin-left: 30px;

    @media (max-width: 600px) {
      margin-left: 0;
    }
  }
`;

interface QueryData {
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
      <Hero>
        <h1>안심하고 책에만<br />집중하세요</h1>
        <p>견고한 전용 악세서리가<br />RIDIPAPER를 보호해드립니다.</p>
      </Hero>
      <AccessoryTabWrapper>
        <ul>
          {tabs.map(({ id, name }) => (
            <AccessoryTab key={id} active={id === currentTab}>
              <a onClick={() => setCurrentTab(id)}>{name}</a>
            </AccessoryTab>
          ))}
        </ul>
      </AccessoryTabWrapper>
      <AccessoryTabPage items={accessories} />
    </Layout>
  );
}
