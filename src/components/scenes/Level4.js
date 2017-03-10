import React from 'react';
import Level from '../Level';

const Level4 = () => (
  <Level
    title="Level 4"
    description="Yes of course, you know the upcoming melody."
    showVST={4.5}
    schedule={[
      { note: 'B4', duration: 0.5, time: 0 },
      { note: 'B4', duration: 0.5, time: 0.5 },
      { note: 'C5', duration: 0.5, time: 1 },
      { note: 'D5', duration: 0.5, time: 1.5 },
      { note: 'D5', duration: 0.5, time: 2 },
      { note: 'C5', duration: 0.5, time: 2.5 },
      { note: 'B4', duration: 0.5, time: 3 },
      { note: 'A4', duration: 1, time: 3.5 }
    ]}
    nextScene="level5"
  />
);

export default Level4;
