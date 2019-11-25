import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import SpecSection, { SpecItem } from './SpecSection';

const Title = styled.h3`
  font-size: 35px;
  line-height: 1em;

  @media (max-width: 800px) {
    font-size: 32px;
  }
`;

const DeviceImages = styled.div`
  height: 400px;
  margin-top: 60px;
  display: flex;
  align-items: stretch;
  justify-content: center;

  @media (max-width: 800px) {
    height: 189px;
    margin-top: 80px;
  }
`;

const Dummy = styled.div`
  display: inline-block;
  width: 290px;
  background-color: gray;

  @media (max-width: 800px) {
    width: 137.5px;
  }
`;

const SpecsList = styled.div`
  width: 100%;
  max-width: 1080px;
  margin-top: 80px;
  padding: 0 40px;

  @media (max-width: 800px) {
    margin-top: 60px;
  }
`;

const styles = css`
  .device {
    & + & {
      margin-left: 40px;

      @media (max-width: 800px) {
        margin-left: 20px;
      }
    }
  }
`;

interface SpecQueryData {
  specs: {
    edges: {
      node: {
        title: string;
        items: {
          name: string;
          desc: string;
        }[];
      };
    }[];
  };
}

export default function Specs() {
  const data = useStaticQuery<SpecQueryData>(graphql`
    {
      specs: allSpecsYaml {
        edges {
          node {
            title
            items {
              name
              desc
            }
          }
        }
      }
    }
  `);

  return (
    <section>
      <Title>상세 스펙</Title>
      <DeviceImages>
        <Dummy className={styles.device} />
        <Dummy className={styles.device} />
      </DeviceImages>
      <SpecsList>
        {data.specs.edges.map(edge => (
          <SpecSection key={edge.node.title} title={edge.node.title}>
            {edge.node.items.map((item, idx) => (
              <SpecItem key={idx}>
                <strong>{item.name}</strong>
                <div>{item.desc}</div>
              </SpecItem>
            ))}
          </SpecSection>
        ))}
      </SpecsList>
    </section>
  );
}
