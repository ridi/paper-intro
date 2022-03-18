import styled from 'astroturf';
import { css } from 'astroturf';
import { useCallback } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import React from 'react';
import { Lightbox } from '@/components/ridipaper4/Lightbox';

const styles = css`
  .close {
    right: -15px;
  }
`;

const VideoEmbed = styled('iframe')`
  width: 80vw;
  height: 50vw;
  border: none;
`;

export const VideoLightbox = (): JSX.Element => {
  const location = useLocation();
  const hashMatch = location.hash.startsWith('#video');
  const isOpened = !!hashMatch;
  
  const navigate = useNavigate();
  const onClose = useCallback(() => navigate(-1), [navigate]);
  
  return (
    <Lightbox isOpened={isOpened} onClose={onClose} closeClassName={styles.close}>
      <VideoEmbed src="https://player.vimeo.com/video/683593494?h=a7c74fa644" allowFullScreen>
        <a href="https://player.vimeo.com/video/683593494?h=a7c74fa644">
          영상보기
        </a>
      </VideoEmbed>
    </Lightbox>
  );
}
