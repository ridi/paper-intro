import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import { useContext, useEffect, useRef, useState } from 'react';
import Img from 'gatsby-image';
import React from 'react';
import { ImageQueryResponse } from './types';
import { TimelineContext } from './TimelineContext';

const objectSizeUIImageQuery = graphql`
  query ObjectSizeUIImageQuery {
    image: file(
      relativePath: { eq: "images/ridipaper4/features/size-ui.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 804, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const ObjectSizeUIContainer = styled('div')`
  position: absolute;
  bottom: 22%;
  left: 45.5%;
  transform: translate(-50%, 0);
  width: 38%;
  opacity: 0;
`;

const ObjectSizeUITextSvg = styled('svg')`
  position: absolute;
  top: 43.7%;
  left: 75.2%;
  width: 4%;
  height: 4%;
  fill: #828282;
  font-size: 14px;
`;

export const ObjectSizeUI = (): JSX.Element => {
  const objectSizeUIImage = useStaticQuery<ImageQueryResponse>(
    objectSizeUIImageQuery,
  );
  const timeline = useContext(TimelineContext);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState('5');

  useEffect(() => {
    timeline.subscribe('SizeUI/Opacity', value => {
      imageRef.current!.style.opacity = value.toFixed(2);
    });

    timeline.subscribe('SizeUI/Size', value => {
      setSize(value);
    });

    return () => {
      timeline.unsubscribe('SizeUI/Opacity');
      timeline.unsubscribe('SizeUI/Size');
    };
  }, []);

  return (
    <ObjectSizeUIContainer ref={imageRef}>
      <Img fluid={objectSizeUIImage.image.childImageSharp.fluid} />
      <ObjectSizeUITextSvg
        viewBox="0 0 14 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="7" y="10">
          {size}
        </text>
      </ObjectSizeUITextSvg>
    </ObjectSizeUIContainer>
  );
};
