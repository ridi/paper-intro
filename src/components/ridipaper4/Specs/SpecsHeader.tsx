import styled from 'astroturf';
import React from 'react';

const SpecsHeaderContainer = styled('div')`
  position: relative;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 10px;
  margin: 0 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SpecsHeaderIndicator = styled('span')`
  position: absolute;
  top: 30px;
  left: 7px;
  width: 94px;
  height: 38px;
  border-radius: 20px;
  
  background: #ebebec;
  transition: all .5s cubic-bezier(.76, .01, .27, 1.2);
  pointer-events: none;
`;

const ITEM_WIDTH = 94;
const ITEM_MARGIN = 7;
const ITEM_BOX = ITEM_WIDTH + ITEM_MARGIN * 2;
const SpecsHeaderItem = styled('button')`
  position: relative;
  width: ${ITEM_WIDTH}px;
  height: 38px;
  margin: 10px ${ITEM_MARGIN}px;
  padding: 0 10px;
  
  cursor: pointer;
  color: #bdbdbd;
  font-size: 14px;
  line-height: 39px;
  font-weight: 700;
  text-align: center;
  transition: color .5s ease;
  
  &[data-is-selected="true"] {
    color: #121212;
  }
`;

type SpecsHeaderProps = {
  items: { key: string, text: string, panelId: string }[];
  selectedItemKey: string;
  setSelectedItemKey: (newItem: string) => void;
};

export const SpecsHeader = ({ items, selectedItemKey, setSelectedItemKey }: SpecsHeaderProps): JSX.Element => {
  const selectedItemIndex = Math.max(0, items.findIndex((item) => item.key === selectedItemKey));
  
  return (
    <SpecsHeaderContainer role="tablist">
      <SpecsHeaderIndicator
        role="presentation"
        style={{ transform: `translate(${ITEM_BOX * selectedItemIndex}px)` }}
      />
    
      { items.map(item => (
          <SpecsHeaderItem
            id={`${item.panelId}-control`}
            key={item.key}
            role="tab"
            aria-selected={selectedItemKey === item.key}
            aria-controls={item.panelId}
            data-is-selected={selectedItemKey === item.key}
            onClick={() => setSelectedItemKey(item.key)}
          >
            {item.text}
          </SpecsHeaderItem>
      )) }
    </SpecsHeaderContainer>
  );
};
