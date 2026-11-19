import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Series, staticFile, useVideoConfig, delayRender, continueRender} from 'remotion';
import {Scene} from './scenes';
import {T, FONTS_URL} from './theme';
import {Title, Card, Timeline, Curve} from './components';

export const Episode: React.FC<{scenes: Scene[]; audio: string}> = ({scenes, audio}) => {
  const {fps} = useVideoConfig();
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS_URL;
    l.onload = () => document.fonts.ready.then(() => continueRender(handle));
    l.onerror = () => continueRender(handle);
    document.head.appendChild(l);
  }, [handle]);
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
