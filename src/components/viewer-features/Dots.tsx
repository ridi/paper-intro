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

const Dot = styled<'div', { active?: boolean, dark?: boolean }>('div')`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: #f0f5fa;
  transition: background-color 0.5s, opacity 0.5s;
  line-height: 0;

  &.dark {
    opacity: 0.4;
  }

  &.active {
    background-color: #ccd9e6;
    opacity: 1;
  }
`;

interface Props {
  max: number;
  value: number;
  dark?: boolean;
}

export default function Dots(props: Props) {
  return (
    <Container>
      {Array.from({ length: props.max }, (_, idx) => <Dot active={idx === props.value} dark={props.dark} />)}
    </Container>
  );
}
