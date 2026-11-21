import React from 'react';
import {AbsoluteFill, Audio, Loop, Sequence, Series, staticFile, interpolate, useVideoConfig} from 'remotion';
import {C, FPS, THEME} from './brand';
import {Episode as Ep, Scene} from './types';
import {sceneFrames} from './timing';
import {useBrandFonts} from './fonts';
import {Frame, Stamp, Subtitles} from './kit';
import {Card, Counter, Curve, Flow, Lesson, Quote, Timeline, Title, stampDelay} from './scenes';
import {Burn, Crowd, Doc, GoldDrain, Machine, Outro, Press, Ticker} from './scenes/illustrated';
import {ActionPrice, Transaction} from './scenes/fusion';

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
    case 'press': return <Press {...v} />;
    case 'crowd': return <Crowd {...v} />;
    case 'ticker': return <Ticker {...v} />;
    case 'doc': return <Doc {...v} />;
    case 'action-price': return <ActionPrice {...v} />;
    case 'transaction': return <Transaction {...v} />;
    case 'machine': return <Machine {...v} />;
    case 'gold': return <GoldDrain {...v} />;
    case 'burn': return <Burn {...v} />;
    case 'outro': return <Outro {...v} />;
  }
};

// Nappe sonore de fond, en boucle, avec fondu d'entrée et de sortie.
const Bed: React.FC<{name: string; volume: number}> = ({name, volume}) => {
  const {durationInFrames, fps} = useVideoConfig();
  return (
    <Loop durationInFrames={18 * fps}>
      <Audio src={staticFile(`sfx/${name}.mp3`)} volume={(f) => volume * interpolate(f, [0, 15], [0, 1], {extrapolateRight: 'clamp'})} />
    </Loop>
  );
};

export const EpisodeVideo: React.FC<{episode: Ep; subtitles?: boolean}> = ({episode, subtitles}) => {
  useBrandFonts();
  const dir = episode.audioDir ?? episode.format;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      {episode.bed && <Bed {...episode.bed} />}
      <Series>
        {episode.scenes.map((sc, idx) => {
          const frames = sceneFrames(sc, episode.wordsPerSecond);
          return (
            <Series.Sequence key={sc.id} durationInFrames={frames}>
              {sc.audio && <Audio src={staticFile(`audio/${dir}/${sc.id}.mp3`)} />}
              {episode.transitionSfx && idx > 0 && <Audio src={staticFile(`sfx/${episode.transitionSfx}.mp3`)} volume={0.35} />}
              {(sc.sfx ?? []).map((x, i) => (
                <Sequence key={i} from={Math.round((x.at ?? 0) * FPS)} durationInFrames={x.dur ? Math.round(x.dur * FPS) : undefined}>
                  <Audio src={staticFile(`sfx/${x.name}.mp3`)} volume={x.volume ?? 0.6} />
                </Sequence>
              ))}
              <Frame serial={episode.serial} sources={sc.sources}>
                <Visual scene={sc} serial={episode.serial} />
              </Frame>
              {sc.stamp && <Stamp text={sc.stamp} delay={sc.stampAt === undefined ? stampDelay(sc.visual, frames) : Math.round(sc.stampAt * FPS)}
                low={sc.visual.type === 'doc'} centered={sc.stampAt !== undefined} />}
              {subtitles && <Subtitles text={sc.text} captions={sc.captions} frames={sc.audioSec ? Math.round(sc.audioSec * FPS) + 6 : frames} />}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
