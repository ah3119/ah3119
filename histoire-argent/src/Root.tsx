import React from 'react';
import {Composition, Still} from 'remotion';
import longEp from '../content/episodes/ep01-john-law.json';
import shortEp from '../content/episodes/ep01-short.json';
import {FPS, THEME} from './brand';
import {EpisodeVideo} from './Episode';
import {Avatar, Banner, Thumbnail} from './Stills';
import {episodeFrames} from './timing';
import {Episode} from './types';

const L = longEp as unknown as Episode, S = shortEp as unknown as Episode;
const {long, short} = THEME.formats;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ep01-long" component={EpisodeVideo} fps={FPS} width={long.width} height={long.height}
      durationInFrames={episodeFrames(L)} defaultProps={{episode: L, subtitles: false}} />
    <Composition id="ep01-short" component={EpisodeVideo} fps={FPS} width={short.width} height={short.height}
      durationInFrames={episodeFrames(S)} defaultProps={{episode: S, subtitles: true}} />
    <Still id="brand-avatar" component={Avatar} width={800} height={800} />
    <Still id="brand-banner" component={Banner} width={2560} height={1440} />
    <Still id="ep01-thumbnail" component={Thumbnail} width={1280} height={720} defaultProps={{episode: L}} />
  </>
);
