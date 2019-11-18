import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Feature, { FeatureDescription } from '../components/feature';
import Hero from '../components/hero';
import Layout from '../components/layout';
import SEO from '../components/seo';

const FeatureList = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  > * + * {
    margin-top: 150px;

    @media(max-width: 800px) {
      margin-top: 100px;
    }
  }
`;

const styles = css`
  .image {
    border-radius: 10px;
    background-color: #636c73;

    @media(max-width: 800px) {
      border-radius: 0;
    }
  }
`;

const IndexPage = () => {
  const query = useStaticQuery(graphql`
    fragment FeatureImage on File {
      childImageSharp {
        fluid(quality: 90, sizes: "(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 600px") {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }

    {
      three: file(relativePath: { eq: "3.jpg" }) {
        ...FeatureImage
      }
      four: file(relativePath: { eq: "4.jpg" }) {
        ...FeatureImage
      }
    }
  `);
  return (
    <Layout>
      <SEO title="Home" />
      <Hero />
      <FeatureList>
        <Feature>
          <Img className={styles.image} fluid={query.three.childImageSharp.fluid} />
          <FeatureDescription>
            <div />
            <h3>{'이제\xa0이야기를 들어보세요'}</h3>
            <p>
              일상에 지친 눈을 감고 온전히 이야기에만 빠져보세요.{' '}
              <strong>블루투스</strong>와{'\xa0'}<strong>듣기(TTS)</strong> 기능으로
              책을 보는 방법이 다양해집니다.
            </p>
          </FeatureDescription>
        </Feature>
        <Feature>
          <Img className={styles.image} fluid={query.four.childImageSharp.fluid} />
          <FeatureDescription>
            <div />
            <h3>{'언제나\xa0책과 함께\xa0해야\xa0한다면'}</h3>
            <p>
              글라스 파이버 소재를 사용해 더욱 단단해진{' '}
              <strong>하드 플립 케이스</strong>가
              RIDIPAPER를 철벽 보호해드릴게요.
            </p>
          </FeatureDescription>
        </Feature>
      </FeatureList>
    </Layout>
  );
};

export default IndexPage;
