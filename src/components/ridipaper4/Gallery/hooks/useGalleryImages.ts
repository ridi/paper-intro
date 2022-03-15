import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { GalleryImage } from '../types';

type GalleryImagesQueryResponse = {
  images: {
    edges: {
      node: {
        name: string;
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }[]
  }
};

const galleryImagesQuery = graphql`
  query GalleryImages {
    images: allFile(filter: { relativePath: {glob: "images/ridipaper/details/*"} }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(sizes: "(max-width: 600px) 128px, 271px", quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }  
      }
    }
  }
`;

export const useGalleryImages = () => {
  const data = useStaticQuery<GalleryImagesQueryResponse>(galleryImagesQuery);
  return data
    .images
    .edges
    .map<GalleryImage>(({ node }) => ({ key: node.name, fluid: node.childImageSharp.fluid }));
};
