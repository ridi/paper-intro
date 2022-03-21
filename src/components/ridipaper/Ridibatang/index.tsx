import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Button from '@/components/common/Button';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

css`
  @font-face {
    font-family: RIDIBatang;
    font-style: normal;
    font-weight: normal;
    src: url("./ridibatang-subset.woff") format("woff");
  }
`;

const Title = styled.h2`
  font-weight: normal;
  color: #f2f6fc;
`;

const SectionWithBg = styled.section`
  position: relative;
  padding: 120px 30px 0;
  background: #212b3b url('./bg.jpg') center/contain;
  font-family: RIDIBatang, serif;
  text-align: center;
  overflow: hidden;

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
      device: file(relativePath: {eq: "images/ridipaper/ridibatang/device.png"}) {
        childImageSharp {
          fluid(maxWidth: 830, sizes: "(max-width: 600px) 100vw, (max-width: 800px) 600px, 830px", quality: 90) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);

  const trackRidibatang = React.useCallback(() => {
    trackCustomEvent({
      category: 'home',
      action: 'click',
      label: 'ridibatang',
    });
  }, []);

  return (
    <SectionWithBg>
      <Title>리디페이퍼 전용서체, 리디바탕</Title>
      <p>
        전자잉크 디스플레이에서도 또렷하게.<br />더 선명하고, 긴 문장도 잘 읽을
        수 있는<br />전자책 전용 글꼴 리디바탕
      </p>
      <Button href="https://www.ridicorp.com/branding/fonts/ridibatang/" color="blue" onClick={trackRidibatang}>
        더 알아보기
      </Button>
      <DeviceWrapper>
        <Img fluid={data.device.childImageSharp.fluid} className={styles.device} />
      </DeviceWrapper>
    </SectionWithBg>
  );
}
