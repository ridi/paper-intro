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
  transition: background-color 0.5s;
  line-height: 0;
  overflow: hidden;

  &.active {
    background-color: #ccd9e6;
  }

  &::after {
    display: block;
    content: '';
    width: 100%;
    height: 100%;

    background-color: #70808f;
    opacity: 0;
    transition: opacity 0.5s;
  }

  &.dark::after {
    opacity: 1;
    transition-delay: 0.5s;
  }

  &.dark.active::after {
    opacity: 0;
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
