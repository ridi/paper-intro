import styled from 'astroturf';
import React from 'react';

import { FluidObject } from 'gatsby-image';
import Img from 'gatsby-image';

import LineBreakText from '../LineBreakText';

export interface DetailSection {
  type: 'detail';
  name: string;
  title: string;
  description: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const Container = styled.div`
  word-break: keep-all;

  p {
    width: 85%;
    margin-top: 30px;

    @media (max-width: 600px) {
      width: 100%;
      margin-top: 20px;
    }

    &:first-child {
      margin-top: 0;
      font-size: 16px;
      line-height: 1.5em;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.5);

      @media (max-width: 600px) {
        font-size: 14px;
      }
    }
  }

  h2 {
    margin-top: 20px;
    text-align: left;
  }
`;

const Padded = styled.div`
  padding: 0 40px;

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 50px auto 0;

  @media (max-width: 600px) {
    margin-top: 40px;
  }
`;

interface Props {
  data: DetailSection;
}

export default function AccessoryDetailSection(props: Props) {
  const description = props.data.description.replace(/ /g, '\xa0');
  return (
    <Container>
      <Padded>
        <p>{props.data.name}</p>
        <h2>{props.data.title}</h2>
        {Boolean(description) && <p>{description}</p>}
      </Padded>
      <ImgWrapper>
        <Img fluid={props.data.image.childImageSharp.fluid} backgroundColor="#f0f5fa" />
      </ImgWrapper>
    </Container>
  );
}
