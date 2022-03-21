import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useContext, useEffect, useRef } from 'react';
import Img from 'gatsby-image';
import React from 'react';
import { ImageQueryResponse } from './types';
import { ReactNode } from 'react';
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
  opacity: 0;
`;

export const ObjectRidiPaper = ({ children }: { children?: ReactNode }): JSX.Element => {
  const objectRidiPaperImage = useStaticQuery<ImageQueryResponse>(objectRidiPaperImageQuery);
  const timeline = useContext(TimelineContext);
  const paperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    timeline.subscribe('RidiPaper/Opacity', (value) => {
      paperRef.current!.style.opacity = value.toFixed(2);
    });
    
    timeline.subscribe('RidiPaper/Rotation', (value) => {
      paperRef.current!.style.transform = `translate(-50%, -50%) rotate(${value.toFixed(2)}deg)`;
    });
    
    return () => {
      timeline.unsubscribe('RidiPaper/Opacity');
      timeline.unsubscribe('RidiPaper/Rotation');
    };
  }, [timeline]);
  
  return (
    <ObjectRidiPaperContainer ref={paperRef}>
      <Img fluid={objectRidiPaperImage.image.childImageSharp.fluid} />
      { children }
    </ObjectRidiPaperContainer>
  );
};
