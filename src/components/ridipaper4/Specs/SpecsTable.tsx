import styled from 'astroturf';
import React from 'react';

const SpecsTableContainer = styled('dl')`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  margin-left: 27px;
`;

const SpecsTableItemContainer = styled('div')`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  min-height: 47px;
`;

const SpecsTableItemName = styled('dt')`
  width: 7.5em;
  line-height: 47px;
`;

const SpecsTableItemValue = styled('dd')`
  flex: 1;
  white-space: pre-line;
  line-height: 47px;
`;

type SpecsTableProps = {
  rows: { name: string, value: string, key: string }[];
};

export const SpecsTable = ({ rows }: SpecsTableProps) => (
  <SpecsTableContainer>
    { rows.map(row => (
      <SpecsTableItemContainer key={row.key}>
        <SpecsTableItemName>{row.name}</SpecsTableItemName>
        <SpecsTableItemValue>{row.value}</SpecsTableItemValue>
      </SpecsTableItemContainer>
    )) }
  </SpecsTableContainer>
);
