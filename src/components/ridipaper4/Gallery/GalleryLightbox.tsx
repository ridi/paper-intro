import styled from 'astroturf';
import { useCallback, useEffect, useState } from 'react';
import { useGalleryImages } from './hooks';
import { useLocation, useNavigate } from '@reach/router';
import IconArrow from '@/svgs/ridipaper4/arrow.inline.svg';
import Img from 'gatsby-image/withIEPolyfill';
import React from 'react';
import { ComponentType, MouseEvent } from 'react';
import { FluidObject } from 'gatsby-image';
import { Lightbox } from '@/components/ridipaper4/Lightbox';

const GalleryImageContainer = styled('div')`
  width: 80vw;
  height: 80vh;
`;

const GalleryImage = styled(Img)`
  width: 100%;
  height: 100%;
  
  & img {
    @supports (object-fit: contain) {
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      width: auto !important;
      height: auto !important;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transform: translate(-50%, -50%);
      border-radius: 8px;
    }
  }
` as ComponentType<{ fluid: FluidObject, objectFit: 'cover' | 'contain' }>;

const ArrowLeftButton = styled('button')`
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translate(0, -50%);
  transition: opacity .4s ease;
  
  &[disabled] {
    opacity: .3;
  }
`;

const ArrowRightButton = styled(ArrowLeftButton)`
  left: unset;
  right: -40px;
`;

const ArrowLeftIcon = styled(IconArrow)`
  cursor: pointer;
  color: #ffffff;
  width: 30px;
  height: 30px;
  transform: rotate(180deg);
`;

const ArrowRightIcon = styled(ArrowLeftIcon)`
  color: #ffffff;
  transform: rotate(0deg);
`;

export const GalleryLightbox = () => {
  const location = useLocation();
  const hashMatch = location.hash.match(/^#gallery-(.*)$/);
  const isOpened = !!hashMatch;
  
  const navigate = useNavigate();
  const onClose = useCallback(() => navigate(-1), [navigate]);
  const galleryKeyFromURL = hashMatch?.[1];
  
  const galleryImages = useGalleryImages(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  useEffect(() => {
    const galleryIndexFromURL = galleryImages.findIndex(({ key }) => key === galleryKeyFromURL);
    if (galleryIndexFromURL > 0) {
      setGalleryIndex(galleryIndexFromURL);
    }
  }, [galleryKeyFromURL]);
  
  const onClick = (direction = 1 | -1) => (event: MouseEvent) => {
    event.stopPropagation();
    setGalleryIndex(Math.max(0, Math.min(galleryIndex + direction, galleryImages.length - 1)));
  };
  
  const isStart = galleryIndex === 0;
  const isEnd = galleryIndex === galleryImages.length - 1;
  
  return (
    <Lightbox isOpened={isOpened} onClose={onClose}>
      <GalleryImageContainer onClick={onClose}>
      { galleryImages.map((image, index) => (
          index === galleryIndex && (
            <GalleryImage key={image.key} fluid={galleryImages[galleryIndex].fluid} objectFit="contain" />
          )
        )) }
      </GalleryImageContainer>
      <ArrowLeftButton type="button" onClick={onClick(-1)} disabled={isStart}>
        <ArrowLeftIcon />
      </ArrowLeftButton>
      <ArrowRightButton type="button" onClick={onClick(1)} disabled={isEnd}>
        <ArrowRightIcon />
      </ArrowRightButton>
    </Lightbox>
  );
};
