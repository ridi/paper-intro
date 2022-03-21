import styled from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const Container = styled<'div', { runAnimation?: boolean }>('div')`
  position: relative;
  width: 100%;

  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: 67%;
  }

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;

    transition: padding-top 1s 0.5s cubic-bezier(0.25, 0, 0, 1);

    &:nth-child(7) {
      opacity: 1;
    }

    &:nth-child(6),
    &:nth-child(5),
    &:nth-child(3) {
      mix-blend-mode: multiply;
    }
  }

  &.runAnimation > div {
    &:nth-child(7) {
      animation:
        dim 0.3s 2s linear forwards;
    }
    &:nth-child(6) {
      padding-top: 11.40625%;

      animation:
        fadein 1s 0.5s cubic-bezier(0.25, 0, 0, 1) forwards,
        scale-up 0.3s 2s linear forwards,
        zoom-out 0.65s 3s linear 2 alternate forwards;
    }
    &:nth-child(5) {
      padding-top: 19.375%;

      animation:
        fadein 1s 0.5s cubic-bezier(0.25, 0, 0, 1) forwards,
        scale-up 0.3s 2s linear forwards,
        zoom-out 0.65s 3s linear 2 alternate forwards;
    }
    &:nth-child(4) {
      padding-top: 29.0625%;

      animation:
        fadein 1s 0.5s cubic-bezier(0.25, 0, 0, 1) forwards,
        scale-up 0.3s 2s linear forwards,
        zoom-out 0.65s 3s linear 2 alternate forwards;
    }
    &:nth-child(3) {
      padding-top: 29.0625%;

      animation:
        fadein 1s 0.5s cubic-bezier(0.25, 0, 0, 1) forwards,
        scale-up 0.3s 2s linear forwards,
        zoom-out 0.65s 3s linear 2 alternate forwards;
    }
    &:nth-child(2) {
      padding-top: 36.40625%;

      animation:
        fadein 1s 0.5s cubic-bezier(0.25, 0, 0, 1) forwards,
        dim 0.3s 2s linear forwards,
        zoom-out 0.65s 2.65s linear reverse forwards;
    }
    &:nth-child(1) {
      padding-top: 49.84375%;

      animation:
        fadein 1s 0.5s cubic-bezier(0.25, 0, 0, 1) forwards,
        dim 0.3s 2s linear forwards;
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes dim {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.1;
    }
  }

  @keyframes scale-up {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.0625);
    }
  }

  @keyframes zoom-out {
    0% {
      transform: scale(1.0625);
      opacity: 1;
    }
    46% {
      transform: scale(1);
      opacity: 0.1;
    }
    100% {
      transform: scale(1);
      opacity: 0.1;
    }
  }
`;

interface Props {
  runAnimation?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function PanelAnimation(props: Props) {
  const query = useStaticQuery(graphql`
    fragment PanelImage on File {
      childImageSharp {
        fluid(maxWidth: 640, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }

    {
      _1: file(relativePath: { eq: "images/ridipaper/panel/1.png" }) {
        ...PanelImage
      }
      _2: file(relativePath: { eq: "images/ridipaper/panel/2.png" }) {
        ...PanelImage
      }
      _3: file(relativePath: { eq: "images/ridipaper/panel/3.png" }) {
        ...PanelImage
      }
      _4a: file(relativePath: { eq: "images/ridipaper/panel/4-1.png" }) {
        ...PanelImage
      }
      _4b: file(relativePath: { eq: "images/ridipaper/panel/4-2.png" }) {
        ...PanelImage
      }
      _5: file(relativePath: { eq: "images/ridipaper/panel/5.png" }) {
        ...PanelImage
      }
      _6: file(relativePath: { eq: "images/ridipaper/panel/6.png" }) {
        ...PanelImage
      }
    }
  `);

  return (
    <Container runAnimation={props.runAnimation} ref={props.innerRef}>
      <div>
        <Img fluid={query._6.childImageSharp.fluid} loading="eager" />
      </div>
      <div>
        <Img fluid={query._5.childImageSharp.fluid} loading="eager" />
      </div>
      <div>
        <Img fluid={query._4b.childImageSharp.fluid} loading="eager" />
      </div>
      <div>
        <Img fluid={query._4a.childImageSharp.fluid} loading="eager" />
      </div>
      <div>
        <Img fluid={query._3.childImageSharp.fluid} loading="eager" />
      </div>
      <div>
        <Img fluid={query._2.childImageSharp.fluid} loading="eager" />
      </div>
      <div>
        <Img fluid={query._1.childImageSharp.fluid} loading="eager" />
      </div>
    </Container>
  );
}
