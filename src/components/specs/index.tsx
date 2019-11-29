import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Button from '../Button';
import SpecSection, { SpecItem } from './SpecSection';

const Title = styled.h2`
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
  margin: 80px auto 0;
  padding: 0 40px;

  @media (max-width: 800px) {
    margin-top: 60px;
    padding: 0 20px;
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
    width: 251px;

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
        openByDefault: boolean;
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
            openByDefault
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
          <SpecSection
            key={edge.node.title}
            title={edge.node.title}
            openByDefault={edge.node.openByDefault}
          >
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
        <Button color="blue">사용자 가이드 확인하기</Button>
      </UserGuideButtonWrapper>
    </section>
  );
}
