import styled, { css } from 'astroturf';
import React from 'react';

import RidibooksLogo from '../svgs/ridibooks.svg';
import RidiselectLogo from '../svgs/ridiselect.svg';
import InstagramIcon from '../svgs/ig.svg';
import FacebookIcon from '../svgs/fb.svg';

const Container = styled.div`
  margin-top: 100px;
  background-color: #f7fafc;
  color: #70808f;

  @media (max-width: 800px) {
    margin-top: 80px;
  }
`;

const FooterWrapper = styled.footer`
  display: block;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px;

  @media (max-width: 800px) {
    padding: 40px 20px;
  }
`;

const Links = styled<'div', { narrow?: boolean }>('div')`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.3px;

  @media (max-width: 800px) {
    display: block;

    > div + div {
      margin-top: 40px;
    }

    &.narrow > div + div {
      margin-top: 10px;
    }
  }

  > div {
    display: flex;
    align-items: center;
  }

  & + & {
    margin-top: 50px;

    @media (max-width: 800px) {
      margin-top: 40px;
    }
  }

  svg {
    fill: #9ea7ad;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 10px;
  margin: 0 10px;
  background-color: #c4d1de;
`;

const LogoLink = styled.a`
  line-height: 0;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;

  & + & {
    margin-left: 30px;
  }

  > svg {
    fill: #8c9a9d;
  }

  > span {
    margin-bottom: 2px;
  }
`;

const Copyright = styled.div`
  margin-top: 20px;
  line-height: 14px;
  color: #9eafbf;
`;

const styles = css`
  .ridibooks {
    width: 94.92px;
    height: 14px;
  }

  .ridiselect {
    width: 89.63px;
    height: 14px;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .spaceBetween {
    justify-content: space-between;
  }

  .hideOnMobile {
    @media (max-width: 800px) {
      display: none;
    }
  }
`;

export default function Footer() {
  return (
    <Container>
      <FooterWrapper>
        <Links className={styles.spaceBetween}>
          <div>
            <LogoLink>
              <RidibooksLogo className={styles.ridibooks} />
            </LogoLink>
            <Divider />
            <LogoLink>
              <RidiselectLogo className={styles.ridiselect} />
            </LogoLink>
          </div>
          <div>
            <SocialLink>
              <InstagramIcon className={styles.icon} />
              <span>인스타그램</span>
            </SocialLink>
            <SocialLink>
              <FacebookIcon className={styles.icon} />
              <span>페이스북</span>
            </SocialLink>
          </div>
        </Links>
        <Links narrow>
          <div>
            <a>고객센터</a>
            <Divider />
            <a>페이퍼 대량 구매 안내</a>
            <Divider />
            <a>이용약관</a>
            <Divider className={styles.hideOnMobile} />
          </div>
          <div>
            <a><strong>개인 정보 취급 방침</strong></a>
            <Divider />
            <a>사업자 정보 확인</a>
          </div>
        </Links>
        <Copyright>© RIDI Corp.</Copyright>
      </FooterWrapper>
    </Container>
  );
}
