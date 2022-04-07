import styled from 'astroturf';
import { useState } from 'react';
import React from 'react';
import { ReactNode } from 'react';

import ArrowDown from '@/svgs/arrow-down.inline.svg';
import RidiLogo from '@/svgs/ridi.inline.svg';
import RidiselectLogo from '@/svgs/ridiselect.inline.svg';
import InstagramIcon from '@/svgs/instagram.inline.svg';
import FacebookIcon from '@/svgs/facebook.inline.svg';

const Container = styled<'div', { noMarginTop?: boolean }>('div')`
  margin-top: 100px;
  background-color: #f3f3f3;
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;

  @media (max-width: 800px) {
    margin-top: 80px;
  }

  &.noMarginTop {
    margin-top: 0;
  }
`;

const FooterWrapper = styled('footer')`
  display: block;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px;
  padding-top: 60px;
  padding-bottom: 150px;

  @media (max-width: 800px) {
    padding: 40px 20px;
    padding-bottom: 120px;
  }
`;

const LogoRow = styled('div')`
  margin-bottom: 75px;

  @media (max-width: 800px) {
    margin-bottom: 45px;
  }
`;

const LogoLinks = styled('div')`
  display: flex;
  align-items: center;
`;

const LogoLink = styled('a')`
  display: inline-flex;
  font-size: 19px;

  @media (max-width: 800px) {
    font-size: 16px;
  }
`;

const LogoDivider = styled('div')`
  width: 1px;
  height: 14px;
  margin: 0 15px;
  background-color: #616161;

  @media (max-width: 800px) {
    height: 16px;
  }
`;

const SocialLinks = styled('div')`
  display: flex;
  align-items: center;
`;

const SocialLink = styled('a')`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 40px;
  width: 1em;
  height: 1em;
  border-radius: 1em;
  background: #6c6c6c;
  opacity: 0.6;

  & + & {
    margin-left: 15px;
  }
`;

const BottomRow = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: flex-start;

    & > * + * {
      margin-bottom: 32px;
    }
  }
`;

const MenuRow = styled('div')`
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    align-items: flex-start;
    flex-direction: column;

    & > * + * {
      margin-top: 15px;
    }
  }
`;

const MenuLinks = styled('div')`
  display: flex;
  align-items: center;
`;

const MenuLink = styled('a')`
  color: #121212;
  font-size: 14px;
  opacity: 0.6;
  text-decoration: none;
`;

const MenuLinkDivider = styled('hr')`
  width: 1px;
  height: 8px;
  margin: 0 10px;
  background-color: rgba(0, 0, 0, 0.15);
`;

const MenuLinkDesktopDivider = styled(MenuLinkDivider)`
  @media (max-width: 800px) {
    display: none;
  }
`;

const Copyright = styled('div')`
  margin-top: 20px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: #aaaaaa;
`;

const IconExpand = styled<typeof ArrowDown, { isExpanded?: boolean }>(
  ArrowDown,
)`
  color: #707070;
  font-size: 10px;
  margin-left: 7px;
  transform: translate(0, 1px) rotate(0deg);

  &.isExpanded {
    transform: translate(0, 1px) rotate(180deg);
  }
`;

const CollapsibleButton = styled('button')`
  cursor: pointer;
  display: block;
  color: #707070;
  font-size: 14px;
  font-weight: 700;
  line-height: 27px;

  @media (max-width: 800px) {
    font-size: 12px;
  }
`;

const CollapsibleContent = styled<'div', { isHidden?: boolean }>('div')`
  opacity: 1;
  transition: opacity 0.4s ease;

  &.isHidden {
    opacity: 0;
  }
`;

const Collapsible = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}): JSX.Element => {
  const [isHidden, setIsHidden] = useState(true);
  const onToggle = () => setIsHidden(previousValue => !previousValue);

  return (
    <>
      <CollapsibleButton aria-controls={id} onClick={onToggle}>
        {title}
        <IconExpand isExpanded={!isHidden} />
      </CollapsibleButton>
      <CollapsibleContent id={id} isHidden={isHidden}>
        {children}
      </CollapsibleContent>
    </>
  );
};

const BusinessInfoWrapper = styled('div')`
  margin-top: 42px;

  @media (max-width: 800) {
    margin-top: 27px;
  }
`;

const BusinessInfoItems = styled('dl')`
  margin-top: 14px;
`;

const BusinessInfoItemWrapper = styled('div')`
  color: #707070;
  font-size: 14px;
  line-height: 27px;

  @media (max-width: 800) {
    font-size: 12px;
    line-heigth: 24px;
  }
`;

const BusinessInfoItemTitle = styled<'dt', { isBold?: boolean }>('dt')`
  display: inline-block;
  font-weight: 400;

  &.isBold {
    font-weight: 700;
  }
`;

const BusinessInfoItemContent = styled('dd')`
  display: inline;
  margin: 0;
  font-weight: 400;
`;

const LineBreakOnMobile = styled('span')`
  display: inline-block;

  @media (max-width: 800px) {
    display: block;
  }
`;

type BusinessInfoItemProps = {
  title: string;
  isTitleBold?: boolean;
  children: ReactNode;
};
const BusinessInfoItem = ({
  title,
  isTitleBold = true,
  children,
}: BusinessInfoItemProps) => (
  <BusinessInfoItemWrapper>
    <BusinessInfoItemTitle isBold={isTitleBold}>{title}</BusinessInfoItemTitle>{' '}
    <BusinessInfoItemContent>{children}</BusinessInfoItemContent>
  </BusinessInfoItemWrapper>
);

const BusinessInfo = (): JSX.Element => (
  <BusinessInfoWrapper>
    <Collapsible id="footer__businessInfo" title="리디(주) 사업자 정보">
      <BusinessInfoItems>
        <BusinessInfoItem title="대표자">배기식</BusinessInfoItem>
        <BusinessInfoItem title="사업자 등록번호">
          120-87-27435
        </BusinessInfoItem>
        <BusinessInfoItem title="통신판매업 신고번호">
          제 2009-서울강남 35-02139호
        </BusinessInfoItem>
        <BusinessInfoItem title="이메일">help@ridi.com</BusinessInfoItem>
        <BusinessInfoItem title="대표전화">1644-0331</BusinessInfoItem>
        <BusinessInfoItem title="주소" isTitleBold={false}>
          서울시 강남구 역삼동 702-28 <LineBreakOnMobile />
          어반벤치빌딩 10층(테헤란로 325)
        </BusinessInfoItem>
      </BusinessInfoItems>
    </Collapsible>
  </BusinessInfoWrapper>
);

const Footer = ({ noMarginTop }: { noMarginTop?: boolean }): JSX.Element => (
  <Container noMarginTop={noMarginTop}>
    <FooterWrapper>
      <LogoRow>
        <LogoLinks>
          <LogoLink href="https://ridibooks.com/">
            <RidiLogo aria-label="리디로 이동" />
          </LogoLink>
          <LogoDivider />
          <LogoLink href="https://select.ridibooks.com/home">
            <RidiselectLogo aria-label="리디셀렉트로 이동" />
          </LogoLink>
        </LogoLinks>
      </LogoRow>

      <BottomRow>
        <MenuRow>
          <MenuLinks>
            <MenuLink href="https://help.ridibooks.com/hc/ko">
              고객센터
            </MenuLink>
            <MenuLinkDivider />
            <MenuLink href="https://help.ridibooks.com/hc/ko/articles/360026484174">
              페이퍼 대량 구매 안내
            </MenuLink>
            <MenuLinkDivider />
            <MenuLink href="https://ridibooks.com/legal/terms">
              이용약관
            </MenuLink>
            <MenuLinkDesktopDivider />
          </MenuLinks>

          <MenuLinks>
            <MenuLink href="https://policy.ridi.com/legal/privacy">
              <strong>개인 정보 처리 방침</strong>
            </MenuLink>
            <MenuLinkDivider />
            <MenuLink href="http://ftc.go.kr/www/bizCommView.do?key=232&apv_perm_no=2009322012730202139">
              사업자 정보 확인
            </MenuLink>
          </MenuLinks>
        </MenuRow>

        <SocialLinks>
          <SocialLink href="https://www.instagram.com/ridipaper/?hl=en">
            <InstagramIcon />
          </SocialLink>
          <SocialLink href="https://www.facebook.com/official.ridi">
            <FacebookIcon />
          </SocialLink>
        </SocialLinks>
      </BottomRow>

      <Copyright>© RIDI Corporation</Copyright>
      <BusinessInfo />
    </FooterWrapper>
  </Container>
);

export default Footer;
