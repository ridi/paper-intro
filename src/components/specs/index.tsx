import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { FixedObject } from 'gatsby-image';

import Button from '../Button';
import SpecSection, { SpecItem } from './SpecSection';
import {trackCustomEvent} from 'gatsby-plugin-google-analytics';

const Container = styled.section`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`;

const Title = styled.h2`
  font-size: 35px;
  line-height: 35px;
  text-align: left;

  @media (max-width: 800px) {
    font-size: 28px;
    line-height: 41px;
    text-align: center;
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

const SpecsList = styled.div`
  width: 100%;
  margin: 80px auto 0;

  @media (max-width: 800px) {
    margin-top: 60px;
  }
`;

const UserGuideParagraph = styled.p`
  margin: 100px auto 0;
  text-align: center;
  font-size: 22px;
  line-height: 32px;

  @media (max-width: 800px) {
    width: 250px;
    margin-top: 80px;
    font-size: 16px;
    line-height: 23px;
  }
`;

const UserGuideButtonWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const styles = css`
  .device {
    width: 290px;
    height: 400px;

    @media (max-width: 800px) {
      width: 137.5px;
      height: 189px;
    }

    & + & {
      margin-left: 40px;

      @media (max-width: 800px) {
        margin-left: 20px;
      }
    }
  }
`;

interface SpecQueryData {
  front: {
    publicURL: string;
  };
  back: {
    publicURL: string;
  };
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
      front: file(relativePath: {eq: "images/specs/front.png"}) {
        publicURL
      }
      back: file(relativePath: {eq: "images/specs/back.png"}) {
        publicURL
      }
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

  const trackGuide = React.useCallback(() => {
    trackCustomEvent({
      category: 'home',
      action: 'click',
      label: 'guide',
    });
  }, []);

  return (
    <Container>
      <Title>상세 스펙</Title>
      <DeviceImages>
        <img src={data.front.publicURL} className={styles.device} />
        <img src={data.back.publicURL} className={styles.device} />
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
        <Button color="blue" href="https://paper.ridibooks.com/guide" onClick={trackGuide}>
          사용자 가이드 확인하기
        </Button>
      </UserGuideButtonWrapper>
    </Container>
  );
}
