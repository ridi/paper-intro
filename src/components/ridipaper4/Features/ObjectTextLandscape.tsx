import '@/fonts/RidiBatang';

import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useContext, useEffect, useRef } from 'react';

import Img from 'gatsby-image';
import React from 'react';
import { ImageQueryResponse } from './types';
import { TimelineContext } from './TimelineContext';

const objectTextLandscapeImageQuery = graphql`
  query ObjectTextLandscapeImageQuery {
    image: file(relativePath: {eq: "images/ridipaper4/features/text-landscape.png"}) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const ObjectTextLandscapeContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%) rotate(-90deg);
  opacity: 0;
`;

export const ObjectTextLandscape = (): JSX.Element => {
  const timeline = useContext(TimelineContext);
  const textRef = useRef<HTMLDivElement | null>(null);
  const { image } = useStaticQuery<ImageQueryResponse>(objectTextLandscapeImageQuery);

  useEffect(() => {
    timeline.subscribe('TextLandscape/Opacity', value => {
      textRef.current!.style.opacity = String(value);
    });

    return () => {
      timeline.unsubscribe('TextLandscape/Opacity');
    };
  }, [timeline]);

  return (
    <ObjectTextLandscapeContainer ref={textRef}>
      <Img fluid={image.childImageSharp.fluid} />
    </ObjectTextLandscapeContainer>
  );
};
