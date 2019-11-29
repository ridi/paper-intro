import styled from 'astroturf';
import React from 'react';

export interface TableSection {
  type: 'table';
  rows: {
    head: string;
    items: string[];
  }[];
}

const Container = styled.table`
  display: block;
  max-width: 1000px;
  margin: 0 auto;
  border-top: 1px solid #d1d5d9;
  color: #636c73;
`;

const Row = styled.tr`
  display: flex;
  margin: 0;
  font-size: 17px;
  line-height: 26px;

  @media (max-width: 600px) {
    font-size: 11px;
    line-height: 18px;
  }

  > th, td {
    display: flex;
    align-items: center;
    margin: 0;
  }
`;

const Head = styled.th`
  width: 200px;
  padding: 17px 20px 17px 0;
  justify-content: right;
  background-color: #f2f4f5;

  @media (max-width: 600px) {
    width: 100px;
    padding: 15px 12px 15px 0;
    font-size: 12px;
  }
`;

const Item = styled.td`
  flex: 1;
  padding: 17px 40px 17px 60px;
  word-break: break-word;

  @media (max-width: 600px) {
    padding: 17px 20px;
  }
`;

const Circle = styled<'div', { state?: string }>('div')`
  width: 16px;
  height: 16px;
  border: 1px solid #636c73;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 12px;
    height: 12px;
    border-radius: 6px;
  }

  &.state-filled {
    background-color: #636c73;
  }

  &.state-half::before {
    display: block;
    content: '';
    width: 50%;
    height: 100%;
    background-color: #636c73;
  }

  & + & {
    margin-left: 5px;

    @media (max-width: 600px) {
      margin-left: 4px;
    }
  }
`;

interface Props {
  data: TableSection;
}

export default function AccessoryTableSection(props: Props) {
  return (
    <Container>
      {props.data.rows.map(({ head, items }, idx) => (
        <Row key={idx}>
          <Head>{head}</Head>
          {items.map((item, idx) => {
            let node;
            if (Number.isNaN(Number(item))) {
              node = item;
            } else {
              const x = Number(item);
              const filled = Math.floor(x);
              const half = x !== filled ? 1 : 0;
              const empty = 5 - filled - half;
              const stateList = [];
              for (let i = 0; i < filled; i++) {
                stateList.push('filled');
              }
              for (let i = 0; i < half; i++) {
                stateList.push('half');
              }
              for (let i = 0; i < empty; i++) {
                stateList.push('empty');
              }
              node = stateList.map((state, idx) => <Circle key={idx} state={state} />);
            }
            return <Item key={idx}>{node}</Item>;
          })}
        </Row>
      ))}
    </Container>
  );
}
