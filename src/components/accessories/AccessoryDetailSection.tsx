import styled from 'astroturf';
import React from 'react';

import { FluidObject } from 'gatsby-image';
import Img from 'gatsby-image';

import AccessoryTableSection from './AccessoryTableSection';
import LineBreakText from '@/components/common/LineBreakText';

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
  tableRows:
    | {
        head: string;
        items: string[];
      }[]
    | null;
}

const Container = styled.div`
  word-break: keep-all;

  p {
    margin-top: 30px;
    color: #525a61;

    @media (max-width: 600px) {
      margin-top: 20px;
    }

    &:first-child {
      margin-top: 0;
      font-size: 16px;
      line-height: 1.5em;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(99, 108, 115, 0.5);

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

const Description = styled<'p', { mobile?: boolean }>('p')`
  &.mobile {
    display: none;
  }

  @media (max-width: 600px) {
    display: none;

    &.mobile {
      display: block;
    }
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
  console.log(props.data.description);
  return (
    <Container>
      <Padded>
        {Boolean(props.data.name) && <p>{props.data.name}</p>}
        {Boolean(props.data.title) && <h2>{props.data.title}</h2>}
        {Boolean(props.data.description) && (
          <>
            <Description>
              <LineBreakText text={props.data.description} />
            </Description>
            <Description mobile>{props.data.description}</Description>
          </>
        )}
      </Padded>
      {props.data.image && (
        <ImgWrapper>
          <Img
            fluid={props.data.image.childImageSharp.fluid}
            backgroundColor="#f0f5fa"
          />
        </ImgWrapper>
      )}
      {props.data.tableRows && (
        <AccessoryTableSection rows={props.data.tableRows} />
      )}
    </Container>
  );
}
