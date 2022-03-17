import styled from 'astroturf';

export const LineBreakOnDesktop = styled('span')`
  display: block;
  @media (max-width: 600px) {
    display: inline-block;
  }
`;

export const LineBreakOnMobile = styled('span')`
  display: inline-block;
  @media (max-width: 600px) {
    display: block;
  }
`;
