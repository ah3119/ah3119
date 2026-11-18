import React from 'react';
import {Composition} from 'remotion';
import {Episode} from './Episode';
import {JOHN_LAW, JOHN_LAW_SHORT1, totalFrames} from './scenes';
import {FPS} from './theme';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="JohnLawLong" component={Episode} width={1920} height={1080} fps={FPS}
      durationInFrames={totalFrames(JOHN_LAW, FPS)} defaultProps={{scenes: JOHN_LAW, audio: ''}} />
    <Composition id="JohnLawShort1" component={Episode} width={1080} height={1920} fps={FPS}
      durationInFrames={totalFrames(JOHN_LAW_SHORT1, FPS)} defaultProps={{scenes: JOHN_LAW_SHORT1, audio: ''}} />
  </>
);
