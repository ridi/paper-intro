import '@/fonts/RidiBatang';

import styled from 'astroturf';
import { css } from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useContext, useEffect, useRef, useState } from 'react';

import Img from 'gatsby-image';
import React from 'react';
import { FluidObject } from 'gatsby-image';
import { TimelineContext } from './TimelineContext';

const objectTextImageQuery = graphql`
  query ObjectTextImageQuery {
    size5: file(relativePath: {eq: "images/ridipaper4/features/text.png"}) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    size6: file(relativePath: {eq: "images/ridipaper4/features/text-size6.png"}) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    size7: file(relativePath: {eq: "images/ridipaper4/features/text-size7.png"}) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    
    size8: file(relativePath: {eq: "images/ridipaper4/features/text-size8.png"}) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;


const ObjectTextContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const styles = css`
  .visible {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  
  .hidden {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

type Sizes = 'size5' | 'size6' | 'size7' | 'size8';
export const ObjectText = (): JSX.Element => {
  const timeline = useContext(TimelineContext);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [textSize, setTextSize] = useState<Sizes>('size5');
  const images = useStaticQuery<{
    [K in Sizes]: { childImageSharp: { fluid: FluidObject } }
  }>(objectTextImageQuery);

  useEffect(() => {
    timeline.subscribe('Text/Opacity', value => {
      textRef.current!.style.opacity = String(value);
    });

    timeline.subscribe('Text/Size', value => {
      setTextSize(value as Sizes);
    });

    timeline.subscribe('Text/Rotation', value => {
      textRef.current!.style.transform = `translate(-50%, -50%) rotate(${value}deg)`;
    });

    return () => {
      timeline.unsubscribe('Text/Opacity');
      timeline.unsubscribe('Text/Size');
      timeline.unsubscribe('Text/Rotation');
    };
  }, [timeline]);

  return (
    <ObjectTextContainer ref={textRef} data-size={textSize}>
      { Object.entries(images).map(([ size, img ]) => (
        <Img
          key={size}
          className={size === textSize ? styles.visible : styles.hidden}
          fluid={img.childImageSharp.fluid}
        />
      )) }
    </ObjectTextContainer>
  );
};
