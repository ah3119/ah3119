import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile} from 'remotion';
import {C, THEME} from './brand';
import {Episode as Ep, Scene} from './types';
import {sceneFrames} from './timing';
import {useBrandFonts} from './fonts';
import {Frame, Stamp, Subtitles} from './kit';
import {Card, Counter, Curve, Flow, Lesson, Quote, Timeline, Title, stampDelay} from './scenes';

const Visual: React.FC<{scene: Scene; serial: string}> = ({scene, serial}) => {
  const v = scene.visual;
  switch (v.type) {
    case 'title': return <Title {...v} serial={serial} />;
    case 'card': return <Card {...v} />;
    case 'quote': return <Quote {...v} />;
    case 'timeline': return <Timeline {...v} />;
    case 'counter': return <Counter {...v} />;
    case 'curve': return <Curve {...v} />;
    case 'flow': return <Flow {...v} />;
    case 'lesson': return <Lesson {...v} outro={THEME.outro} />;
  }
};

export const EpisodeVideo: React.FC<{episode: Ep; subtitles?: boolean}> = ({episode, subtitles}) => {
  useBrandFonts();
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <Series>
        {episode.scenes.map((sc) => {
          const frames = sceneFrames(sc);
          return (
            <Series.Sequence key={sc.id} durationInFrames={frames}>
              {sc.audio && <Audio src={staticFile(`audio/${episode.format}/${sc.id}.mp3`)} />}
              <Frame serial={episode.serial} sources={sc.sources}>
                <Visual scene={sc} serial={episode.serial} />
              </Frame>
              {sc.stamp && <Stamp text={sc.stamp} delay={stampDelay(sc.visual, frames)} />}
              {subtitles && <Subtitles text={sc.text} frames={frames} />}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
