import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useContext, useEffect, useRef } from 'react';
import Img from 'gatsby-image';
import React from 'react';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';
import { ImageQueryResponse } from './types';
import { TimelineContext } from './TimelineContext';

const objectBookImageQuery = graphql`
  query ObjectBookImageQuery {
    image: file(relativePath: {eq: "images/ridipaper4/features/book.png"}) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const ObjectBookContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 76%;
  height: 76%;
  opacity: 0;
`;

const ObjectBookImage = styled(Img)`
  width: 100%;
  height: 100%;
` as ComponentType<{ fluid: FluidObject }>;

export const ObjectBook = (): JSX.Element => {
  const objectBookImage = useStaticQuery<ImageQueryResponse>(objectBookImageQuery);
  const timeline = useContext(TimelineContext);
  const bookRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    timeline.subscribe('Book/Opacity', (value) => {
      bookRef.current!.style.opacity = String(value);
    });
    
    return () => timeline.unsubscribe('Book/Opacity');
  }, [timeline]);
  
  return (
    <ObjectBookContainer ref={bookRef}>
      <ObjectBookImage fluid={objectBookImage.image.childImageSharp.fluid} />
    </ObjectBookContainer>
  );
};
