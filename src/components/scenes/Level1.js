import React from 'react';
import Level from '../Level';

const Level1 = () => (
  <Level
    title="Level 1"
    description="Let's start with easy one."
    showVST={2}
    schedule={[
      { note: 'C4', duration: 2, time: 0 }
    ]}
    nextScene="level2"
  />
);

export default Level1;
