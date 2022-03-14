import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Slider, { Settings as SliderSettings } from 'react-slick';

import ArrowV from '@/svgs/ridipaper/arrow-v.inline.svg';

import './slick.css';

const Container = styled.section`
  overflow: hidden;
`;

const StaticSlider = styled<'div', { hidden?: boolean }>('div')`
  width: 100%;
  max-width: 1320px;
  margin: 100px auto 0;

  overflow-y: auto;

  &.hidden {
    display: none;
  }
`;

const StaticSliderInner = styled.div`
  display: flex;

`;

const Spacer = styled.div`
  flex: 0 0 auto;
  width: 60px;

  @media (max-width: 800px) {
    width: 20px;
  }
`;

const StaticImg = styled.div`
  flex: 0 0 auto;
  width: 300px;
  height: 300px;
  margin: 0 4px;
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 100px auto 0;

  display: flex;
  align-items: center;

  * {
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }
`;

const Arrow = styled<'button', { next?: boolean }>('button').attrs({
  type: 'button',
})`
  width: 40px;
  height: 40px;
  margin: 10px;

  border-radius: 20px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15), 0px 1px 5px rgba(0, 0, 0, 0.1);

  background-color: white;
  cursor: pointer;

  transition: opacity 0.1s;

  &:hover,
  &:active {
    opacity: 0.6;
  }

  > svg {
    width: 12px;
    height: 14px;
    margin: 13px 15px 13px 13px;
    fill: #808991;
  }

  &.next > svg {
    margin: 13px 13px 13px 15px;
    transform: scaleX(-1);
  }
`;

const ImgContainer = styled.div`
  padding: 0 4px;
`;

const styles = css`
  .slider {
    width: calc(100% - 120px);
    line-height: 0;
  }

  .img {
    background-color: #f0f5fa;
  }
`;

interface QueryData {
  details: {
    edges: {
      node: {
        name: string;
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    }[];
  };
}

export default function Details() {
  const data = useStaticQuery<QueryData>(graphql`
    {
      details: allFile(filter: {relativeDirectory: {eq: "images/ridipaper/details"}}, sort: {fields: name}) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  `);
  const [showSlider, setShowSlider] = React.useState(false);
  const slickRef = React.useRef<Slider>(null);

  const handleNextClick = React.useCallback(() => {
    slickRef.current?.slickNext();
  }, []);
  const handlePrevClick = React.useCallback(() => {
    slickRef.current?.slickPrev();
  }, []);

  React.useEffect(() => {
    function updateSlider() {
      if (window.innerWidth > 800) {
        setShowSlider(true);
      } else {
        setShowSlider(false);
      }
    }
    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => {
      window.removeEventListener('resize', updateSlider);
    };
  }, []);

  let slider = null;
  if (showSlider) {
    const sliderOptions: SliderSettings = {
      arrows: false,
      dots: false,
      infinite: false,
      draggable: false,
      easing: 'ease',
      slidesToShow: 3,
      slidesToScroll: 3,
      className: styles.slider,
    };
    slider = (
      <SliderContainer>
        <Arrow onClick={handlePrevClick}>
          <ArrowV />
        </Arrow>
        <Slider {...sliderOptions} ref={slickRef}>
          {data.details.edges.map(({ node }) => (
            <ImgContainer key={node.name}>
              <Img fluid={node.childImageSharp.fluid} className={styles.img} />
            </ImgContainer>
          ))}
        </Slider>
        <Arrow next onClick={handleNextClick}>
          <ArrowV />
        </Arrow>
      </SliderContainer>
    );
  }

  return (
    <Container>
      <h2>차원이 다른 디테일</h2>
      <StaticSlider hidden={showSlider}>
        <StaticSliderInner>
          <Spacer />
          {data.details.edges.map(({ node }) => (
            <StaticImg key={node.name}>
              <Img fluid={node.childImageSharp.fluid} className={styles.img} />
            </StaticImg>
          ))}
          <Spacer />
        </StaticSliderInner>
      </StaticSlider>
      {slider}
    </Container>
  );
}
