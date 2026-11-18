import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile, useVideoConfig} from 'remotion';
import {Scene} from './scenes';
import {T} from './theme';
import {Title, Card, Timeline, Curve} from './components';

export const Episode: React.FC<{scenes: Scene[]; audio: string}> = ({scenes, audio}) => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: T.bg}}>
      {audio ? <Audio src={staticFile(audio)} /> : null}
      <Series>
        {scenes.map((s, i) => (
          <Series.Sequence key={i} durationInFrames={Math.round(s.sec * fps)}>
            {s.kind === 'title' && <Title {...s} />}
            {s.kind === 'card' && <Card {...s} />}
            {s.kind === 'timeline' && <Timeline {...s} />}
            {s.kind === 'curve' && <Curve {...s} />}
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
