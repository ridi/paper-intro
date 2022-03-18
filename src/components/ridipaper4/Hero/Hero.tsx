import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import HeroBase from '@/components/common/Hero';
import Img from 'gatsby-image/withIEPolyfill';
import React from 'react';
import Ridipaper4Logo from '@/svgs/ridipaper4/ridipaper4.inline.svg';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';
import { LinkButton } from '@/components/common/Button';

const TRANSITION = 1000;
const Background = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: opacity ${TRANSITION}ms ease;
`;

const BackgroundImage = styled(Img)`
  width: 100%;
  height: 100%;
` as ComponentType<{ fluid: FluidObject; objectFit: 'cover' | 'contain' }>;

const HeroContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 0 108px;

  @media (max-width: 600px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;

    padding: 54px 18px;
    padding-top: 0;
  }
`;

const HeroHeader = styled('div')`
  & > * {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.5s ease;

    &:nth-child(2) {
      transition-delay: 0.2s;
    }
  }

  &[data-is-animated='true'] > * {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroLogo = styled(Ridipaper4Logo)`
  width: 100%;
`;

const HeroPhrase = styled('p')`
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: #000000;

  padding-bottom: 22px;
`;

const HeroTitle = styled('h1')`
  width: 90%;
  max-width: 355px;
  height: 41px;
  color: #000000;

  @media (max-width: 600px) {
    margin: 0 auto;
  }
`;

const HeroLinkWrapper = styled<'div', { runAnimation?: boolean }>('div')`
  padding-top: 52px;

  opacity: 0;
  transform: translateY(50px);
  transition: all 0.5s ease;
  transition-delay: 0.4s;

  &[data-is-animated='true'] {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroLinkButton = styled(LinkButton)`
  min-width: 130px;
  min-height: 40px;
  height: initial;
  padding: 10px;

  color: #000000;
  border: 1px solid #000000;
  border-radius: 20px;

  font-weight: 700;
  font-size: 14px;
  line-height: 24px;

  @media (max-width: 600px) {
    min-width: 40vw;
  }
`;

const images = graphql`
  query Images {
    desktopImages: allFile(
      filter: { relativePath: { glob: "images/ridipaper4/hero/*" } }
      sort: { fields: name }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }

    mobileImages: allFile(
      filter: { relativePath: { glob: "images/ridipaper4/hero/mobile/*" } }
      sort: { fields: name }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;

const CHANGE_INTERVAL = 5000;
export const Hero = (): JSX.Element => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsAnimated(true), 300);
    return () => clearTimeout(timeoutId);
  }, []);

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { mobileImages, desktopImages } = useStaticQuery<{
    mobileImages: {
      edges: {
        node: { name: string; childImageSharp: { fluid: FluidObject } };
      }[];
    };
    desktopImages: {
      edges: {
        node: { name: string; childImageSharp: { fluid: FluidObject } };
      }[];
    };
  }>(images);

  const usingImages = useMemo(
    () =>
      (isDesktop ? desktopImages : mobileImages).edges.map(({ node }) => ({
        key: node.name,
        fluid: node.childImageSharp.fluid,
      })),

    [isDesktop, desktopImages, mobileImages],
  );

  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const onChange = () => {
      setCurrentImage(currentImage => (currentImage + 1) % usingImages.length);
      timeoutId = setTimeout(() => onChange(), CHANGE_INTERVAL);
    };

    timeoutId = setTimeout(() => onChange(), CHANGE_INTERVAL);
    return () => clearTimeout(timeoutId);
  }, [usingImages]);

  const activeImage = useRef<HTMLDivElement>(null);
  const alternativeImage = useRef<HTMLDivElement>(null);
  const [flushedImage, setFlushedImage] = useState(0);
  const nextImage = (flushedImage + 1) % usingImages.length;

  useEffect(() => {
    if (!activeImage.current || !alternativeImage.current) {
      return;
    }

    activeImage.current.style.opacity = '0';
    alternativeImage.current.style.opacity = '1';

    const timeoutId = setTimeout(
      () => setFlushedImage(currentImage),
      TRANSITION,
    );
    return () => clearTimeout(timeoutId);
  }, [currentImage]);

  const renderBackground = useCallback(
    () => (
      <>
        {usingImages.map((image, index) => {
          let ref = undefined;
          let opacity = 0;
          if (index === flushedImage) {
            ref = activeImage;
            opacity = 1;
          } else if (index === nextImage) {
            ref = alternativeImage;
          }

          return (
            <Background key={image.key} ref={ref} style={{ opacity }}>
              <BackgroundImage fluid={image.fluid} objectFit="cover" />
            </Background>
          );
        })}
      </>
    ),
    [usingImages, flushedImage],
  );

  return (
    <HeroBase bright renderBackground={renderBackground} noOverlay>
      <HeroContainer>
        <HeroHeader data-is-animated={isAnimated}>
          <HeroPhrase>Simple Reading, Simple Living</HeroPhrase>
          <HeroTitle>
            <HeroLogo aria-label="RIDIPAPER 4" />
          </HeroTitle>
        </HeroHeader>
        <HeroLinkWrapper data-is-animated={isAnimated}>
          <HeroLinkButton noOpacity to="/stockists/">
            구매하기
          </HeroLinkButton>
        </HeroLinkWrapper>
      </HeroContainer>
    </HeroBase>
  );
};
