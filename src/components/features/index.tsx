import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { Controller } from 'scrollmagic';

import Icon6Inch from '../../svgs/features/6inch.svg';
import IconRotate from '../../svgs/features/rotate.svg'
import IconBluetooth from '../../svgs/features/bluetooth.svg';
import IconFlipCover from '../../svgs/features/flipcover.svg';

import FeatureItem from './FeatureItem';
import FeatureDescription from './FeatureDescription';

const Head = styled<'div', { runAnimation?: boolean }>('div')`
  margin: 0 40px;

  @media (max-width: 600px) {
    margin: 0 20px;
  }

  > h2 {
    width: 500px;
    margin: 0 auto;

    @media (max-width: 800px) {
      width: 100%;
      text-align: left;
    }
  }

  > h2,
  > p {
    opacity: 0;
  }

  &.runAnimation {
    > h2,
    > p {
      animation: show 0.5s forwards;
    }

    > p {
      animation-delay: 0.2s;
    }
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Description = styled.p`
  width: 530px;
  margin: 40px auto 0;
  font-size: 22px;
  line-height: 32px;
  text-align: center;

  @media (max-width: 800px) {
    width: 100%;
    margin-top: 30px;
    font-size: 18px;
    line-height: 28px;
    text-align: left;
  }
`;

const FeatureList = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  > * + * {
    margin-top: 150px;

    @media(max-width: 800px) {
      margin-top: 100px;
    }
  }
`;

const styles = css`
  .image {
    border-radius: 10px;
    overflow: hidden;
    opacity: 0;

    @media(max-width: 800px) {
      border-radius: 0;
    }

    > video {
      width: 100%;
    }

    &.runAnimation {
      animation: show 0.5s forwards;
    }

    @keyframes show {
      from {
        opacity: 0;
        transform: translateY(60px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

export default function Features() {
  const [ioAvailable, setIoAvailable] = React.useState(false);
  const headRef = React.useRef<HTMLDivElement>(null);
  const featureRefs = Array.from({ length: 4 }, () => ({
    ref: React.useRef<HTMLDivElement>(null),
    state: React.useState(false),
  }));
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [headRunAnimation, setHeadRunAnimation] = React.useState(false);

  const query = useStaticQuery(graphql`
    fragment FeatureImage on File {
      childImageSharp {
        fluid(sizes: "(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 600px", quality: 80) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }

    {
      one: file(relativePath: { eq: "images/features/1.jpg" }) {
        ...FeatureImage
      }
      twoPoster: file(relativePath: { eq: "images/features/2.jpg" }) {
        publicURL
      }
      twoWebm: file(relativePath: { eq: "images/features/2.webm" }) {
        publicURL
      }
      twoMp4: file(relativePath: { eq: "images/features/2.mp4" }) {
        publicURL
      }
      three: file(relativePath: { eq: "images/features/3.jpg" }) {
        ...FeatureImage
      }
      four: file(relativePath: { eq: "images/features/4.jpg" }) {
        ...FeatureImage
      }
    }
  `);

  React.useEffect(() => {
    if (window.IntersectionObserver == null) {
      return;
    }
    setIoAvailable(true);
    const io = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === videoRef.current) {
            const isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0;
            if (isIntersecting) {
              videoRef.current!.play();
            } else {
              videoRef.current!.pause();
              videoRef.current!.currentTime = 0;
            }
          }
        });
      },
      {
        rootMargin: '200px',
      },
    );
    io.observe(videoRef.current!);
  }, []);

  React.useEffect(() => {
    let controller: Controller;
    let destroyed = false;
    import('scrollmagic').then(({ Controller, Scene }) => {
      if (destroyed) {
        return;
      }
      controller = new Controller();

      new Scene({
        triggerElement: headRef.current!,
        triggerHook: 'onEnter',
        reverse: false,
        offset: 40,
      })
        .on('enter', () => {
          setHeadRunAnimation(true);
        })
        .addTo(controller);
      for (const { ref, state: [, setRunAnimation] } of featureRefs) {
        new Scene({
          triggerElement: ref.current!,
          triggerHook: 'onEnter',
          reverse: false,
          offset: 30,
        })
          .on('enter', () => {
            setRunAnimation(true);
          })
          .addTo(controller);
      }
    });

    return () => {
      controller && controller.destroy();
      destroyed = true;
    };
  }, []);

  function combineAnimation(base: string, runAnimation?: boolean) {
    const list = [base];
    if (runAnimation) {
      list.push(styles.runAnimation);
    }
    return list.join(' ');
  }

  return (
    <section>
      <Head ref={headRef} runAnimation={headRunAnimation}>
        <h2>{'가볍게,\xa0컴팩트하게 어디서나 독서에 빠지다'}</h2>
        <Description>
          출근길 지하철, 여행 떠나는 비행기 안, 잠들기 전 침대 위 어디서든 책을
          읽고 싶은 순간 <strong>RIDIPAPER</strong>를 꺼내보세요. 내가 있는 모든
          곳이 독서하기 가장 좋은 곳이 됩니다.
        </Description>
      </Head>
      <FeatureList>
        <FeatureItem>
          <Img
            className={combineAnimation(styles.image, featureRefs[0].state[0])}
            fluid={query.one.childImageSharp.fluid}
            backgroundColor="#f7fafc"
          />
          <FeatureDescription innerRef={featureRefs[0].ref} runAnimation={featureRefs[0].state[0]}>
            <img src={Icon6Inch} alt="6인치 기기 아이콘" />
            <h3>{'천\xa0페이지가\xa0넘는 책도\xa0얇고\xa0가볍게'}</h3>
            <p>
              <strong>{'한\xa0손에\xa0쏙'}</strong> 들어오는 사이즈.{' '}
              <strong>{'타월\xa0한\xa0장'}</strong>만큼 가벼운 무게.<br />
              덕분에 부담 없이 휴대하고 어디서든 가볍게 책을 읽을 수 있어요.
            </p>
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem>
          <div className={combineAnimation(styles.image, featureRefs[1].state[0])}>
            <video
              autoPlay={!ioAvailable}
              loop
              muted
              poster={query.twoPoster.publicURL}
              ref={videoRef}
            >
              <source src={query.twoWebm.publicURL} type="video/webm" />
              <source src={query.twoMp4.publicURL} type="video/mp4" />
            </video>
          </div>
          <FeatureDescription innerRef={featureRefs[1].ref} runAnimation={featureRefs[1].state[0]}>
            <img src={IconRotate} alt="왼손으로 기기를 잡은 모습 아이콘" />
            <h3>{'어느\xa0손이든 한\xa0손으로\xa0편하게'}</h3>
            <p>
              들고 있는 손에 맞춰 알아서 <strong>화면이 회전</strong>하고
              버튼만 누르면 책장이 넘어가니까 한결 편하게 읽을 수 있답니다.
            </p>
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem>
          <Img
            className={combineAnimation(styles.image, featureRefs[2].state[0])}
            fluid={query.three.childImageSharp.fluid}
            backgroundColor="#f7fafc"
          />
          <FeatureDescription innerRef={featureRefs[2].ref} runAnimation={featureRefs[2].state[0]}>
            <img src={IconBluetooth} alt="Bluetooth 아이콘" />
            <h3>{'이제\xa0이야기를 들어보세요'}</h3>
            <p>
              일상에 지친 눈을 감고 온전히 이야기에만 빠져보세요.{' '}
              <strong>블루투스</strong>와{'\xa0'}<strong>듣기(TTS)</strong> 기능으로
              책을 보는 방법이 다양해집니다.
            </p>
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem>
          <Img
            className={combineAnimation(styles.image, featureRefs[3].state[0])}
            fluid={query.four.childImageSharp.fluid}
            backgroundColor="#f7fafc"
          />
          <FeatureDescription innerRef={featureRefs[3].ref} runAnimation={featureRefs[3].state[0]}>
            <img src={IconFlipCover} alt="하드 플립 케이스 아이콘" />
            <h3>{'언제나\xa0책과 함께\xa0해야\xa0한다면'}</h3>
            <p>
              글라스 파이버 소재를 사용해 더욱 단단해진{' '}
              <strong>하드 플립 케이스</strong>가
              RIDIPAPER를 철벽 보호해드릴게요.
            </p>
          </FeatureDescription>
        </FeatureItem>
      </FeatureList>
    </section>
  );
}
