import { FluidObject } from 'gatsby-image';

export type GalleryImage = {
  key: string;
  fluid: FluidObject;
};

export type GalleryControllerProps = {
  images: GalleryImage[];
};

export type GalleryController = (props: GalleryControllerProps) => JSX.Element;
