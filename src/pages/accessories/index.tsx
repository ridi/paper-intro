import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { FixedObject } from 'gatsby-image';

import AccessoryTabPage from '../../components/accessories/AccessoryTabPage';
import Hero from '../../components/hero/Accessory';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

interface QueryData {
  accessories: {
    edges: {
      node: {
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

export default function AccessoryIndexPage() {
  const data = useStaticQuery<QueryData>(graphql`
    {
      accessories: allAccessoriesYaml(sort: {fields: order}) {
        edges {
          node {
            slug
            name {
              short
            }
            thumbnail {
              childImageSharp {
                fixed(width: 310, height: 310) {
                  srcSetWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Accesories" />
      <Hero>
        <h1>안심하고 책에만<br />집중하세요</h1>
        <p>견고한 전용 악세서리가<br />RIDIPAPER를 보호해드립니다.</p>
      </Hero>
      <AccessoryTabPage items={data.accessories.edges.map(({ node }) => ({ slug: node.slug, name: node.name.short, fixed: node.thumbnail.childImageSharp.fixed }))} />
    </Layout>
  );
}
