import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { FixedObject } from 'gatsby-image';

import { LinkButton } from './Button';

const Container = styled.section`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f0f5fa;

  @media (max-width: 800px) {
    text-align: center;
  }
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 800px) {
    &::after {
      display: block;
      content: '';

      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  > picture {
    position: absolute;
    top: 0;
    right: calc(50% - 600px);
    width: 1200px;

    @media (max-width: 800px) {
      right: calc(50% - 400px);
      width: 800px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  width: 400px;
  padding: 120px 0 110px 100px;

  @media (max-width: 800px) {
    width: 300px;
    margin: 0 auto;
    padding: 120px 0;
  }

  > p {
    margin-top: 30px;
    font-size: 20px;

    @media (max-width: 800px) {
      font-size: 18px;
      color: white;
    }
  }
`;

const ContentTitle = styled<'h2', { small?: boolean }>('h2')`
  font-size: 40px;
  line-height: 50px;
  text-align: left;

  @media (max-width: 800px) {
    display: none;
    text-align: center;
    color: white;
  }

  &.small {
    display: none;
    font-size: 36px;
    line-height: 48px;

    @media (max-width: 800px) {
      display: block;
    }
  }
`;

const LinkWrapper = styled.div`
  margin-top: 50px;

  > a {
    width: 150px;
  }
`;

interface AccessoryBannerData {
  desktop: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
  tablet: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

export default function AccessoryBanner() {
  const data = useStaticQuery<AccessoryBannerData>(graphql`
    fragment AccessoryBannerBg on File {
      childImageSharp {
        fixed(width: 1200, quality: 80) {
          ...GatsbyImageSharpFixed_withWebp_noBase64
        }
      }
    }

    {
      desktop: file(relativePath: {eq: "images/accessories/banner/1200.png"}) {
        ...AccessoryBannerBg
      }
      tablet: file(relativePath: {eq: "images/accessories/banner/800.png"}) {
        ...AccessoryBannerBg
      }
    }
  `);

  return (
    <Container>
      <Background>
        <picture>
          <source srcSet={data.tablet.childImageSharp.fixed.srcSetWebp} type="image/webp" media="(max-width: 800px)" />
          <source srcSet={data.tablet.childImageSharp.fixed.srcSet} type="image/png" media="(max-width: 800px)" />
          <source srcSet={data.desktop.childImageSharp.fixed.srcSetWebp} type="image/webp" />
          <source srcSet={data.desktop.childImageSharp.fixed.srcSet} type="image/png" />
          <img src={data.tablet.childImageSharp.fixed.src} />
        </picture>
      </Background>
      <Content>
        <ContentTitle>안심하고 책에만 집중하세요</ContentTitle>
        <ContentTitle small>안심하고 책에만{'\xa0'}집중하세요</ContentTitle>
        <p>{'견고한\xa0전용\xa0악세서리가 RIDIPAPER를\xa0보호해드립니다.'}</p>
        <LinkWrapper>
          <LinkButton to="/accessories/" color="blue">전체보기</LinkButton>
        </LinkWrapper>
      </Content>
    </Container>
  );
}
