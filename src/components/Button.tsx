import styled from 'astroturf';
import React from 'react';

const Container = styled<'a', { size?: string, color?: string }>('a')`
  height: 50px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 2px solid transparent;
  border-radius: 3px;

  font-size: 19px;
  line-height: 1em;
  font-weight: bold;
  letter-spacing: -0.3px;

  &.size-small {
    height: 30px;
    border-width: 1px;
    font-size: 13px;
  }

  &.color-blue {
    border-color: #1f8ce6;
    color: #1f8ce6;
  }

  &.color-white {
    border-color: white;
    color: white;
  }
`;

interface Props {
  size?: string;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Button(props: Props) {
  const { size, color, className, children } = props;
  return <Container size={size} color={color} className={className}>{children}</Container>;
}
