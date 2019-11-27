import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import Button from '../Button';

css`
  @font-face {
    font-family: RIDIBatang;
    font-style: normal;
    font-weight: normal;
    src: url("./ridibatang-subset.woff") format("woff");
  }
`;

const SectionWithBg = styled.section`
  position: relative;
  overflow: hidden;
  font-family: RIDIBatang, serif;
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const Title = styled.h2`
  font-weight: normal;
  color: #f2f6fc;
`;

const Content = styled.div`
  position: relative;
  padding: 120px 30px 0;
  text-align: center;

  > * {
    margin: 0 auto;
  }

  > p {
    margin-top: 40px;
    font-size: 22px;
    line-height: 32px;
    color: #94a2b8;

    @media (max-width: 800px) {
      margin-top: 30px;
      font-size: 18px;
      line-height: 28px;
    }
  }

  > a {
    width: 166px;
    margin-top: 60px;
    font-family: 'Noto Sans KR', sans-serif;

    @media (max-width: 800px) {
      margin-top: 50px;
    }
  }

  @media (max-width: 800px) {
    padding-top: 80px;
  }
`;

const DeviceWrapper = styled.div`
  width: 100%;
  max-width: 1070px;
  margin-top: 60px;
  padding: 0 120px;

  @media (max-width: 800px) {
    max-width: 600px;
    margin-top: 50px;
    padding: 0;
  }
`;

const styles = css`
  .background {
    width: 100%;
    height: 100%;
  }

  .device {
    width: 100%;
  }
`;

export default function Ridibatang() {
  const data = useStaticQuery(graphql`
    {
      bg: file(relativePath: {eq: "images/ridibatang-bg.jpg"}) {
        childImageSharp {
          fluid(sizes: "100vw") {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      device: file(relativePath: {eq: "images/ridibatang-device.png"}) {
        childImageSharp {
          fluid(maxWidth: 830, sizes: "(max-width: 600px) 100vw, (max-width: 800px) 600px, 830px") {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);
  return (
    <SectionWithBg>
      <Background>
        <PolyfillImg
          fluid={data.bg.childImageSharp.fluid}
          backgroundColor="#212b3b"
          className={styles.background}
        />
      </Background>
      <Content>
        <Title>리디페이퍼 전용서체, 리디바탕</Title>
        <p>
          e-ink 디스플레이에서도 또렷하게.<br />더 선명하고, 긴 문장도 잘 읽을
          수 있는<br />전자책 전용 글꼴 리디바탕
        </p>
        <Button color="blue">더 알아보기</Button>
        <DeviceWrapper>
          <Img fluid={data.device.childImageSharp.fluid} className={styles.device} />
        </DeviceWrapper>
      </Content>
    </SectionWithBg>
  );
}
