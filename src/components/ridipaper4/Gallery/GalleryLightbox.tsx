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
  border-radius: 8px;
` as ComponentType<{ fluid: FluidObject, objectFit: 'cover' | 'contain' }>;

const ArrowLeftButton = styled('button')`
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translate(0, -50%);
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
  const hashMatch = location.hash.match(/^#gallery-(\d+)/);
  const isOpened = !!hashMatch;
  
  const navigate = useNavigate();
  const onClose = useCallback(() => navigate(-1), [navigate]);
  const galleryIndexStrFromURL = hashMatch?.[1];
  const galleryIndexFromURL = typeof galleryIndexStrFromURL === 'string' && parseInt(galleryIndexStrFromURL, 10);
  
  const [galleryIndex, setGalleryIndex] = useState(0);
  useEffect(() => {
    if (typeof galleryIndexFromURL === 'number' && isFinite(galleryIndexFromURL)) {
      setGalleryIndex(galleryIndexFromURL);
    }
  }, [galleryIndexFromURL]);
  
  const galleryImages = useGalleryImages(true);
  const onClick = (direction = 1 | -1) => (event: MouseEvent) => {
    event.stopPropagation();
    setGalleryIndex((galleryIndex + direction) % galleryImages.length);
  };
  
  return (
    <Lightbox isOpened={isOpened} onClose={onClose}>
      <GalleryImageContainer>
        <GalleryImage fluid={galleryImages[galleryIndex].fluid} objectFit="contain" />
      </GalleryImageContainer>
      <ArrowLeftButton type="button" onClick={onClick(-1)}>
        <ArrowLeftIcon />
      </ArrowLeftButton>
      <ArrowRightButton type="button" onClick={onClick(1)}>
        <ArrowRightIcon />
      </ArrowRightButton>
    </Lightbox>
  );
};
