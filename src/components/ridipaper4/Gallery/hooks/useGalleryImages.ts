import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { GalleryImage } from '../types';

type GalleryImagesQueryEdges = {
  edges: {
    node: {
      name: string;
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }[]
};

type GalleryImagesQueryResponse = {
  images: GalleryImagesQueryEdges,
  fullImages: GalleryImagesQueryEdges,
};

const galleryImagesQuery = graphql`
  query GalleryImages {
    images: allFile(filter: { relativePath: {glob: "images/ridipaper4/gallery/*"} }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(sizes: "(max-width: 601px) 128px, 271px", quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }  
      }
    }
    
    fullImages: allFile(filter: { relativePath: {glob: "images/ridipaper4/gallery/full/*"} }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(sizes: "(max-width: 601px) 1500px, 600px", quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }  
      }
    }
  }
`;


export const useGalleryImages = (isFull = false) => {
  const data = useStaticQuery<GalleryImagesQueryResponse>(galleryImagesQuery);
  const images = isFull ? data.fullImages : data.images;
  
  return images
    .edges
    .map<GalleryImage>(({ node }, index) => ({ key: node.name, index, fluid: node.childImageSharp.fluid }));
};
