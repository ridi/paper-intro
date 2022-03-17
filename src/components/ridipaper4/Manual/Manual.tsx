import styled from 'astroturf';
import React from 'react';

const ManualContainer = styled('section')`
  max-width: 994px;
  padding-top: 107px;
  padding-bottom: 124px;
  margin: 0 auto;
  
  @media (max-width: 600px) {
    padding-top: 85px;
    padding-bottom: 94px;
    text-align: center;
  }
`;

const ManualTitle = styled('h2')`
  color: #121212;
  text-align: start;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  margin: 0 15px;
  margin-bottom: 0px;
  
  @media (max-width: 600px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const ManualButton = styled('a')`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  
  min-width: 276px;
  min-height: 58px;
  height: initial;
  padding: 10px;
  margin-top: 40px;
  
  color: #000000;
  border: 1px solid #000000;
  border-radius: 30px;
  
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-decoration: none;
`;

export const Manual = (): JSX.Element => (
    <ManualContainer id="ridipaper4-manual">
      <ManualTitle>RIDI PAPER 4 사용방법</ManualTitle>
      <ManualButton href="https://www.notion.so/ridi/498562a80c8c45e88bab7f7caa49deaa">
        사용자 가이드 확인하기
      </ManualButton>
    </ManualContainer>
  );
