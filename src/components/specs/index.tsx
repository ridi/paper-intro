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

const UserGuideParagraph = styled.p`
  margin: 100px auto 0;
  text-align: center;

  @media (max-width: 800px) {
    margin-top: 80px;
    width: 260px;
  }
`;

const UserGuideButtonWrapper = styled.div`
  margin-top: 30px;
  text-align: center;

  > a {
    display: inline-block;
    width: 251px;
    padding: 17px 0;
    border: 2px solid #1f8ce6;
    border-radius: 3px;
    font-size: 19px;
    line-height: 16px;
    font-weight: bold;
    letter-spacing: -0.3px;
    text-align: center;
    color: #1f8ce6;

    @media (max-width: 800px) {
      width: 246px;
    }
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
      <UserGuideParagraph>
        RIDIPAPER의 자세한 사용 방법은 사용자 가이드를 참조해주세요.
      </UserGuideParagraph>
      <UserGuideButtonWrapper>
        <a>사용자 가이드 확인하기</a>
      </UserGuideButtonWrapper>
    </section>
  );
}
