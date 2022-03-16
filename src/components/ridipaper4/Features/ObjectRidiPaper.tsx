import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { mergeRefs } from '@/utils/mergeRefs';
import Img from 'gatsby-image';
import React from 'react';
import { ImageQueryResponse } from './types';
import { TimelineContext } from './TimelineContext';

const objectRidiPaperImageQuery = graphql`
  query ObjectRidiPaperImageQuery {
    image: file(relativePath: {eq: "images/ridipaper4/features/ridipaper4-white.png"}) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const ObjectRidiPaperContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

export const ObjectRidiPaper = forwardRef<HTMLDivElement>((_props, ref): JSX.Element => {
  const objectRidiPaperImage = useStaticQuery<ImageQueryResponse>(objectRidiPaperImageQuery);
  const timeline = useContext(TimelineContext);
  const paperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    timeline.subscribe('RidiPaper/Opacity', (value) => {
      paperRef.current!.style.opacity = value.toFixed(2);
    });
    
    timeline.subscribe('RidiPaper/Rotation', (value) => {
      paperRef.current!.style.transform = `rotate(${value.toFixed(2)}deg)`;
    });
    
    return () => {
      timeline.unsubscribe('RidiPaper/Opacity');
      timeline.unsubscribe('RidiPaper/Rotation');
    };
  }, []);
  
  const mergedRef = useMemo(() => mergeRefs([ ref, paperRef ]), []);
  return (
    <ObjectRidiPaperContainer ref={mergedRef}>
      <Img fluid={objectRidiPaperImage.image.childImageSharp.fluid} />
    </ObjectRidiPaperContainer>
  );
});
