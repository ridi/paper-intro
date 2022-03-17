import styled from 'astroturf';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Ridipaper4Logo from '@/svgs/ridipaper4/ridipaper4.inline.svg';
import { ComponentType } from 'react';
import { FluidObject } from 'gatsby-image';
import { LinkButton } from '@/components/common/Button';

const purchaseBannerImageQuery = graphql`
  query PurchaseBannerImageQuery {
    banner: file(relativePath: {eq: "images/ridipaper4/purchase-banner/ridipaper-with-logo.png"}) {
      childImageSharp {
        fluid(maxWidth: 1500, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`;

const PurchaseBannerContainer = styled('section')`
  position: relative;
  margin: 135px 0;
  background: #f3f3f3;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 600px) {
    margin: 37px 0;
    height: 263px;
  }
`;

const PurchaseBannerLogo = styled(Ridipaper4Logo)`
  display: none;
  width: 154px;
  margin: 0 auto;
  margin-bottom: 25px;
  
  @media (max-width: 600px) {
    display: flex;
  }
`;

const PurchaseButton = styled(LinkButton)`
  cursor: pointer;
  
  position: absolute;
  top: 60%;
  left: 24%;
  
  min-width: 250px;
  min-height: 70px;
  padding: 6px 50px;
  border-radius: 35px;
  
  background: #000000;
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  line-height: 60px;
  
  @media (max-width: 800px) {
    min-width: 200px;
    min-height: 60px;
    padding: 4 28px;
    font-size: 18px;
    line-height: 30px;
  }
  
  @media (max-width: 600px) {
    position: static;
    top: unset;
    left: unset;
    min-width: 139px;
    min-height: 50px;
    margin: 0 auto;
    padding: 4px 28px;
    
    font-size: 12px;
    line-height: 24px;
  }
`;

const BannerImageContainer = styled('div')`
  margin-left: auto;
  width: 100%;
  
  @media (max-width: 600px) {
    display: none;
  }
`;

const BannerImage = styled(Img)`
  width: 100%;
  height: auto;
` as ComponentType<{ fluid: FluidObject }>;

export const PurchaseBanner = (): JSX.Element => {
  const { banner } = useStaticQuery<{
    banner: { childImageSharp: { fluid: FluidObject } }
  }>(purchaseBannerImageQuery);
  
  return (
    <PurchaseBannerContainer>
      <BannerImageContainer>
        <BannerImage fluid={banner.childImageSharp.fluid} />
      </BannerImageContainer>
      <PurchaseBannerLogo />
      
      <PurchaseButton to={'/stockists/ridipaper4'}>
        지금 구매하기
      </PurchaseButton>
    </PurchaseBannerContainer>
  );
}
