import styled from 'astroturf';
import React from 'react';

const Container = styled.section`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f0f5fa;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  @media (max-width: 600px) {
    &::after {
      display: block;
      content: '';

      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const Content = styled.div`
  position: relative;
  width: 400px;
  padding: 120px 0 110px 100px;

  @media (max-width: 600px) {
    width: 300px;
    margin: 0 auto;
    padding: 120px 0;
  }

  > p {
    margin-top: 30px;
    font-size: 20px;

    @media (max-width: 600px) {
      font-size: 18px;
      color: white;
    }
  }
`;

const ContentTitle = styled<'h3', { small?: boolean }>('h3')`
  font-size: 40px;
  line-height: 50px;
  text-align: left;

  @media (max-width: 600px) {
    display: none;
    text-align: center;
    color: white;
  }

  &.small {
    display: none;
    font-size: 36px;
    line-height: 48px;

    @media (max-width: 600px) {
      display: block;
    }
  }
`;

const LinkWrapper = styled.div`
  margin-top: 50px;

  > a {
    display: inline-block;
    width: 150px;
    padding: 17px 0;
    border: 2px solid #1f8ce6;
    border-radius: 3px;
    font-size: 19px;
    line-height: 16px;
    font-weight: bold;
    letter-spacing: -0.3px;
    text-align: center;
    color: #1f8ce6;
  }
`;

export default function AccessoryBanner() {
  return (
    <Container>
      <Background>
      </Background>
      <Content>
        <ContentTitle>안심하고 책에만 집중하세요</ContentTitle>
        <ContentTitle small>안심하고 책에만{'\xa0'}집중하세요</ContentTitle>
        <p>{'견고한\xa0전용\xa0악세서리가 RIDIPAPER를\xa0보호해드립니다.'}</p>
        <LinkWrapper>
          <a>전체보기</a>
        </LinkWrapper>
      </Content>
    </Container>
  );
}
