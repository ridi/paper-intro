import styled, { css } from 'astroturf';
import React from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';

const Container = styled.ul`
  width: 100%;
  max-width: 1200px;
  margin: 30px auto 0;
  padding: 0 100px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 600px) {
    display: block;
    margin: 0;
    padding: 0 20px;
  }

  > li {
    width: calc(50% - 5px);
    margin-top: 10px;
    list-style: none;

    @media (max-width: 600px) {
      width: 100%;
      height: 400px;
      margin-top: 20px;
    }

    > a {
      display: block;
      width: 100%;
      height: 100%;
      padding-bottom: 50px;
      background-color: #f7fafc;
      text-align: center;
      text-decoration: none;
    }
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  max-width: 330px;
  margin: 0 auto;
  padding: 10px;
  line-height: 0;

  @media (max-width: 600px) {
    width: 280px;
    max-width: 280px;
    padding: 30px 0 20px;
  }
`;

const Name = styled.p`
  font-size: 20px;
  line-height: 1em;
`;

const styles = css`
  .thumbnail {
    width: 100%;
    padding-top: 100%;
  }
`;

interface Props {
  items: {
    slug: string;
    name: string;
    fixed: FixedObject;
  }[];
}

export default function AccessoryTabPage(props: Props) {
  return (
    <Container>
      {props.items.map(({ slug, name, fixed }) => (
        <li key={slug}>
          <Link to={`/accessories/${slug}/`}>
            <ThumbnailWrapper>
              <Img fixed={fixed} className={styles.thumbnail} />
            </ThumbnailWrapper>
            <Name>{name}</Name>
          </Link>
        </li>
      ))}
    </Container>
  );
}
