import styled from 'astroturf';
import React from 'react';

const Tabs = styled.ul`
  display: flex;
  border-bottom: 1px solid #d1d5d9;
`;

const TabWrapper = styled<'li', { active?: boolean }>('li')`
  list-style: none;
  margin-bottom: -1px;

  @media (max-width: 600px) {
    flex: 1;
  }

  > a {
    display: block;
    width: 88px;
    padding: 12px 0 9px;

    border-bottom: 4px solid transparent;
    font-size: 15px;
    line-height: 20px;
    text-align: center;
    color: #636c73;

    cursor: pointer;

    @media (max-width: 600px) {
      width: auto;
    }
  }

  &.active > a {
    border-bottom-color: #9ea7ad;
    font-weight: bold;
    color: #303538;
  }

  & + & {
    margin-left: 30px;

    @media (max-width: 600px) {
      margin-left: 0;
    }
  }
`;

interface TabProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  children?: React.ReactNode;
}

function Tab(props: TabProps) {
  const { active, ...anchorProps } = props;
  return <TabWrapper active={active}><a {...anchorProps} /></TabWrapper>;
}

export { Tab };
export default Tabs;
