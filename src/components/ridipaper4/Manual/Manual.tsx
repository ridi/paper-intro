import styled from 'astroturf';
import Button from '@/components/common/Button';
import React from 'react';

const ManualContainer = styled('section')`
  max-width: 994px;
  padding-top: 107px;
  padding-bottom: 124px;
  margin: 0 auto;
`;

const ManualTitle = styled('h2')`
  color: #121212;
  text-align: start;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  margin: 0 15px;
  margin-bottom: 0px;
`;

const ManualButton = styled(Button)`
  min-width: 276px;
  min-height: 58px;
  height: initial;
  padding: 10px;
  margin-top: 40px;
  
  color: black;
  border: 1px solid black;
  border-radius: 30px;
  
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

export const Manual = (): JSX.Element => (
    <ManualContainer id="ridipaper4-manual">
      <ManualTitle>RIDI PAPER 4 사용방법</ManualTitle>
      <ManualButton>사용자 가이드 확인하기</ManualButton>
    </ManualContainer>
  );
