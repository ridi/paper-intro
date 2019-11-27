import React from 'react';

interface Props {
  text: string;
}

export default function LineBreakText(props: Props) {
  const lines = props.text.split('\n');
  const nodes: React.ReactNode[] = [];
  lines.forEach((line, idx) => {
    nodes.push(line);
    nodes.push(<br key={idx} />);
  });
  return <>{nodes}</>;
}
