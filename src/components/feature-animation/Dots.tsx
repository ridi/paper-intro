import styled from 'astroturf';
import React from 'react';

const Container = styled.div`
  margin: 0 40px;
  > * + * {
    margin-top: 14px;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const Dot = styled<'div', { active?: boolean }>('div')`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: #f0f5fa;
  transition: background-color 0.5s;
  line-height: 0;

  &.active {
    background-color: #ccd9e6;
  }
`;

interface Props {
  max: number;
  value: number;
}

export default function Dots(props: Props) {
  return (
    <Container>
      {Array.from({ length: props.max }, (_, idx) => <Dot active={idx === props.value} />)}
    </Container>
  );
}
