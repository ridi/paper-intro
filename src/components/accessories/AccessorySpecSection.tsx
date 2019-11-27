import styled from 'astroturf';
import React from 'react';

export interface SpecSection {
  type: 'spec';
  items: {
    name: string;
    desc: string;
  }[];
}

const Container = styled.ul`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f4f5;
  color: hsla(0, 0%, 0%, 0.6);
`;

const Item = styled.li`
  display: flex;
  list-style: none;
  font-size: 16px;
  line-height: 24px;

  @media (max-width: 600px) {
    font-size: 14px;
  }

  & + & {
    margin-top: 10px;
  }
`;

const Name = styled.div`;
  width: 95px;
  font-weight: bold;

  @media (max-width: 600px) {
    width: 60px;
  }
`;

const Desc = styled.div`;
  flex: 1;
`;

interface Props {
  data: SpecSection;
}

export default function AccessorySpecSection(props: Props) {
  return (
    <Container>
      {props.data.items.map(({ name, desc }, idx) => (
        <Item key={idx}>
          <Name>{name}</Name>
          <Desc>{desc}</Desc>
        </Item>
      ))}
    </Container>
  );
}
