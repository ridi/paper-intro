import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import FeatureItem from './FeatureItem';
import { FeatureDescription } from './FeatureDescription';

const Head = styled.div`
  margin: 0 40px;
`;

const Title = styled.h3`
  width: 500px;
  margin: 0 auto;

  @media (max-width: 800px) {
    width: 100%;
    text-align: left;
  }
`;

const Description = styled.p`
  width: 520px;
  margin: 40px auto 0;
  font-size: 22px;
  line-height: 32px;
  text-align: center;

  @media (max-width: 800px) {
    width: 100%;
    margin-top: 30px;
    font-size: 18px;
    line-height: 28px;
    text-align: left;
  }
`;

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

export default function Features() {
  const query = useStaticQuery(graphql`
    fragment FeatureImage on File {
      childImageSharp {
        fluid(quality: 90, sizes: "(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 600px") {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }

    {
      three: file(relativePath: { eq: "images/3.jpg" }) {
        ...FeatureImage
      }
      four: file(relativePath: { eq: "images/4.jpg" }) {
        ...FeatureImage
      }
    }
  `);

  return (
    <section>
      <Head>
        <Title>{'가볍게,\xa0컴팩트하게 어디서나 독서에 빠지다'}</Title>
        <Description>
          출근길 지하철, 여행 떠나는 비행기 안, 잠들기 전 침대 위 어디서든 책을
          읽고 싶은 순간 <strong>RIDIPAPER</strong>를 꺼내보세요. 내가 있는 모든
          곳이 독서하기 가장 좋은 곳이 됩니다.
      </Description>
      </Head>
      <FeatureList>
        <FeatureItem>
          <Img className={styles.image} fluid={query.three.childImageSharp.fluid} />
          <FeatureDescription>
            <div />
            <h4>{'이제\xa0이야기를 들어보세요'}</h4>
            <p>
              일상에 지친 눈을 감고 온전히 이야기에만 빠져보세요.{' '}
              <strong>블루투스</strong>와{'\xa0'}<strong>듣기(TTS)</strong> 기능으로
              책을 보는 방법이 다양해집니다.
              </p>
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem>
          <Img className={styles.image} fluid={query.four.childImageSharp.fluid} />
          <FeatureDescription>
            <div />
            <h4>{'언제나\xa0책과 함께\xa0해야\xa0한다면'}</h4>
            <p>
              글라스 파이버 소재를 사용해 더욱 단단해진{' '}
              <strong>하드 플립 케이스</strong>가
              RIDIPAPER를 철벽 보호해드릴게요.
              </p>
          </FeatureDescription>
        </FeatureItem>
      </FeatureList>
    </section>
  );
}
