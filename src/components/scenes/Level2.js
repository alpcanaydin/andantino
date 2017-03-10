import React from 'react';
import Level from '../Level';

const Level2 = () => (
  <Level
    title="Level 2"
    description="This one is a little harder."
    showVST={3.6}
    schedule={[
      { note: 'D4', duration: 0.8 },
      { note: 'F4', duration: 0.8, time: 0.8 },
      { note: 'A4', duration: 2, time: 1.6 }
    ]}
    nextScene="level3"
  />
);

export default Level2;
