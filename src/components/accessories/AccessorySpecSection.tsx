import styled from 'astroturf';
import React from 'react';

export interface SpecSection {
  type: 'spec';
  items: {
    name: string;
    desc: string;
  }[];
  disclaimer: string | null;
}

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SpecList = styled.ul`
  padding: 40px;
  background-color: #f2f4f5;
  color: #636c73;

  @media (max-width: 600px) {
    padding: 20px;
  }
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

const Disclaimer = styled.p`
  margin-top: 10px;
  padding: 0 40px;
  font-size: 14px;
  line-height: 20px;
  color: #9ea7ad;

  @media (max-width: 600px) {
    padding: 0 20px;
    font-size: 12px;
    line-height: 17px;
  }
`;

interface Props {
  data: SpecSection;
}

export default function AccessorySpecSection(props: Props) {
  return (
    <Container>
      <SpecList>
        {props.data.items.map(({name, desc}, idx) => (
          <Item key={idx}>
            <Name>{name}</Name>
            <Desc>{desc}</Desc>
          </Item>
        ))}
      </SpecList>
      {props.data.disclaimer && <Disclaimer>{props.data.disclaimer}</Disclaimer>}
    </Container>
  );
}
