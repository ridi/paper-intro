import styled from 'astroturf';
import React from 'react';

import Arrow from './Arrow';

const Header = styled.div`
  height: 80px;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 24px;
  line-height: 24px;
  font-weight: bold;

  cursor: pointer;
`;

const Body = styled<'div', { hidden?: boolean }>('div')`
  width: 100%;
  font-size: 17px;
  line-height: 26px;

  &.hidden {
    display: none;
  }
`;

export const SpecItem = styled.div`
  display: flex;
  margin: 24px 0;

  > :nth-child(1) {
    width: 120px;
  }

  > :nth-child(2) {
    flex: 1;
  }
`;

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function SpecSection(props: Props) {
  const [open, setOpen] = React.useState(true);

  const toggleOpen = React.useCallback(() => setOpen(value => !value), []);

  React.useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <Header onClick={toggleOpen}>
        {props.title}
        <Arrow flipped={open} />
      </Header>
      <Body hidden={!open}>
        {props.children}
      </Body>
    </div>
  );
}
