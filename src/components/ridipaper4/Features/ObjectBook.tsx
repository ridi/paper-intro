import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { mergeRefs } from '@/utils/mergeRefs';
import Img from 'gatsby-image';
import React from 'react';
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
  width: 100%;
  height: 100%;
`;

export const ObjectBook = forwardRef<HTMLDivElement>((_props, ref): JSX.Element => {
  const objectBookImage = useStaticQuery<ImageQueryResponse>(objectBookImageQuery);
  const timeline = useContext(TimelineContext);
  const bookRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    timeline.subscribe('Book/Opacity', (value) => {
      bookRef.current!.style.opacity = String(value);
    });
    
    return () => timeline.unsubscribe('Book/Opacity');
  }, []);
  
  const mergedRef = useMemo(() => mergeRefs([ ref, bookRef ]), []);
  return (
    <ObjectBookContainer ref={mergedRef}>
      <Img fluid={objectBookImage.image.childImageSharp.fluid} />
    </ObjectBookContainer>
  );
});
