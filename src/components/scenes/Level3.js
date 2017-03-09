import React from 'react';
import Level from '../Level';

const Level3 = () => (
  <Level
    title="Level 3"
    description="Can you recognize simple chords? Of course you can!"
    showVST={10}
    schedule={[
      { note: 'E4', duration: 2, time: 0 },
      { note: 'B4', duration: 2, time: 0 },
      { note: 'G4', duration: 2, time: 0 },
      { note: 'F4', duration: 2, time: 2.5 },
      { note: 'A4', duration: 2, time: 2.5 },
      { note: 'C5', duration: 2, time: 2.5 },
      { note: 'D4', duration: 2, time: 5 },
      { note: 'F4', duration: 2, time: 5 },
      { note: 'A4', duration: 2, time: 5 },
      { note: 'B4', duration: 2.7, time: 7.5 },
      { note: 'E4', duration: 2.7, time: 7.5 },
      { note: 'G4', duration: 2.7, time: 7.5 }
    ]}
    nextScene="level4"
  />
);

export default Level3;
