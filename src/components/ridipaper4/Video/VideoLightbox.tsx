import styled from 'astroturf';
import { css } from 'astroturf';
import { useCallback } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import React from 'react';
import { Lightbox } from '@/components/ridipaper4/Lightbox';
import Ridipaper4TeaserH264 from '@/assets/videos/ridipaper4-teaser/ridipaper4-teaser.h264.mp4';

const styles = css`
  .close {
    right: -15px;

    @media (max-width: 600px) {
      right: 0;
    }
  }
`;

const VideoEmbed = styled('video')`
  width: 80vw;
  max-width: 150vh;
  border: none;

  @media (max-width: 600px) {
    width: 95vw;
  }
`;

export const VideoLightbox = (): JSX.Element => {
  const location = useLocation();
  const hashMatch = location.hash.startsWith('#video');
  const isOpened = !!hashMatch;

  const navigate = useNavigate();
  const onClose = useCallback(() => navigate(-1), [navigate]);

  return (
    <Lightbox
      isOpened={isOpened}
      onClose={onClose}
      closeClassName={styles.close}
    >
      <VideoEmbed muted controls>
        <source src={Ridipaper4TeaserH264} type="video/mp4"></source>
      </VideoEmbed>
    </Lightbox>
  );
};
