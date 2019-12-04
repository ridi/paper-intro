import { css } from 'astroturf';
import React from 'react';

import { Link, GatsbyLinkProps } from 'gatsby';

const styles = css`
  .button {
    height: 50px;
    padding: 0 40px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border: 2px solid transparent;
    border-radius: 3px;

    font-size: 16px;
    line-height: 1em;
    font-weight: bold;
    letter-spacing: -0.3px;
    text-decoration: none;

    transition: opacity 0.3s;

    &:hover,
    &:active {
      opacity: 0.7;

      &.noOpacity {
        opacity: 1;
      }
    }

    &.sizeSmall {
      height: 30px;
      padding: 0 10px;
      border-width: 1px;
      font-size: 13px;
    }

    &.colorBlue {
      border-color: #1f8ce6;
      color: #1f8ce6;
    }

    &.colorWhite {
      border-color: white;
      color: white;
    }

    &.colorGray {
      border-color: #d1d5d9;
      color: #808991;
    }
  }
`;

interface Props {
  size?: string;
  color?: string;
  noOpacity?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function createClassesFromProps(props: Props) {
  const { size, color, noOpacity, className } = props;
  const classes = [styles.button];
  if (size === 'small') {
    classes.push(styles.sizeSmall);
  }
  if (color === 'blue') {
    classes.push(styles.colorBlue);
  }
  if (color === 'white') {
    classes.push(styles.colorWhite);
  }
  if (color === 'gray') {
    classes.push(styles.colorGray);
  }
  if (noOpacity) {
    classes.push(styles.noOpacity);
  }
  className && classes.push(className);
  return classes.join(' ');
}

export default function Button(props: Props & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { children, ...anchorProps } = props;
  return <a {...anchorProps} className={createClassesFromProps(props)}>{children}</a>;
}

export function LinkButton(props: Props & GatsbyLinkProps<any>) {
  const { size, color, className, children, ref, ...linkProps } = props;
  return <Link {...linkProps} className={createClassesFromProps(props)}>{children}</Link>;
}
