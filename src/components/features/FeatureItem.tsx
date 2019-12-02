import styled from 'astroturf';
import React from 'react';

const Container = styled.div`
  margin-top: 150px;
  display: flex;

  &:nth-child(2n) {
    flex-direction: row-reverse;
  }

  > * {
    /* Chrome flexbox bug: can't use flex: 1 */
    width: 50%;
  }

  @media(max-width: 800px) {
    margin-top: 80px;
    display: block;

    > * {
      width: 100%;
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

export default function FeatureItem(props: Props) {
  const { children } = props;
  return (
    <Container>
      {children}
    </Container>
  );
}
