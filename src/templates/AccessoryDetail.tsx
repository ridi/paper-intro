import React from 'react';
import { css } from 'astroturf';

import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import PolyfillImg from 'gatsby-image/withIEPolyfill';

import Layout from '@/components/common/Layout';
import LineBreakText from '@/components/common/LineBreakText';
import SEO from '@/components/common/SEO';
import { useLocation } from '@reach/router';

import AccessoryHero from '@/components/accessories/AccessoryHero';
import AccessorySection, {
  Section,
} from '@/components/accessories/AccessorySection';

const styles = css`
  .titleImage {
    height: 100%;

    @media (max-width: 600px) {
      display: none;
    }
  }

  .bg {
    @media (max-width: 600px) {
      display: none;
    }
  }

  .bgMobile {
    display: none;

    @media (max-width: 600px) {
      display: block;
    }
  }
`;
interface AccessoryDetailQueryData {
  detail: {
    name: {
      en: string;
      full: string;
    };
    description: string;
    bg: {
      childImageSharp: {
        fluid: FluidObject;
        banner: {
          src: string;
        };
      };
    };
    bgMobile: {
      childImageSharp: {
        fluid: FluidObject;
        banner: {
          src: string;
        };
      };
    };
    titleImage: {
      src: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      width: number;
      height: number;
    };
    sections: Section[];
  };
}

interface Props {
  data: AccessoryDetailQueryData;
}

export default function AccessoryDetail(props: Props) {
  const { data } = props;
  const location = useLocation();
  const isRidiPaper4 = location.pathname.includes('ridipaper4');

  function renderBackground(props: { className: string }) {
    const hasBgMobile = Boolean(data.detail.bgMobile);
    const bgClasses = hasBgMobile
      ? `${props.className} ${styles.bg}`
      : props.className;
    const bgMobileClasses = hasBgMobile
      ? `${props.className} ${styles.bgMobile}`
      : props.className;
    return (
      <>
        <PolyfillImg
          className={bgClasses}
          fluid={data.detail.bg.childImageSharp.fluid}
        />
        {hasBgMobile && (
          <PolyfillImg
            className={bgMobileClasses}
            fluid={data.detail.bgMobile.childImageSharp.fluid}
          />
        )}
      </>
    );
  }

  const titleImage = data.detail.titleImage;

  return (
    <Layout>
      <SEO
        title={data.detail.name.full.replace(/\n/g, ' ')}
        meta={[
          {
            property: 'og:image',
            content: data.detail.bg.childImageSharp.banner.src,
          },
        ]}
      />
      <AccessoryHero
        renderBackground={renderBackground}
        noOverlay={isRidiPaper4}
      >
        {titleImage ? (
          <PolyfillImg
            className={styles.titleImage}
            fluid={titleImage.src.childImageSharp.fluid}
            objectFit="contain"
            objectPosition="0% 50%"
            style={{
              maxWidth: titleImage.width,
            }}
          />
        ) : (
          <>
            <p>{data.detail.name.en}</p>
            <h1>
              <LineBreakText text={data.detail.name.full} />
            </h1>
            <p>
              <LineBreakText text={data.detail.description} />
            </p>
          </>
        )}
      </AccessoryHero>
      {data.detail.sections.map((section, idx) => (
        <AccessorySection key={idx} data={section} />
      ))}
    </Layout>
  );
}

export const query = graphql`
  query AccessoryDetail($slug: String!) {
    detail: accessoriesYaml(slug: { eq: $slug }) {
      name {
        en
        full
      }
      description
      bg {
        childImageSharp {
          fluid(maxHeight: 600, sizes: "1600px", quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
          banner: resize(width: 1200, height: 630, quality: 90) {
            src
          }
        }
      }
      bgMobile {
        childImageSharp {
          fluid(maxHeight: 600, sizes: "1600px", quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      titleImage {
        src {
          childImageSharp {
            fluid(
              maxWidth: 1000
              sizes: "(max-width: 1000px) 1000px, 100vw"
              quality: 90
            ) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        width
        height
      }
      sections {
        type
        name
        title
        description
        image {
          childImageSharp {
            fluid(
              maxWidth: 1000
              sizes: "(max-width: 1000px) 1000px, 100vw"
              quality: 90
            ) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        tableRows {
          head
          items
        }
        items {
          name
          desc
        }
        disclaimer
      }
    }
  }
`;
