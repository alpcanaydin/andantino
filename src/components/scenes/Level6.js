import React from 'react';
import Level from '../Level';

const Level6 = () => (
  <Level
    title="Level 6"
    description="Get ready to use both hands! Can you deal with it?"
    showVST={10.8}
    schedule={[
      { note: 'C4', duration: 0.4, time: 0 },
      { note: 'E4', duration: 0.4, time: 0.4 },
      { note: 'G4', duration: 0.4, time: 0.8 },

      { note: 'C4', duration: 0.4, time: 1.2 },
      { note: 'E4', duration: 0.4, time: 1.6 },
      { note: 'G4', duration: 0.4, time: 2 },

      { note: 'C4', duration: 0.4, time: 2.4 },
      { note: 'C5', duration: 2.5, time: 2.4 },
      { note: 'E4', duration: 0.4, time: 2.8 },
      { note: 'G4', duration: 0.4, time: 3.2 },

      { note: 'C4', duration: 0.4, time: 3.6 },
      { note: 'E4', duration: 0.4, time: 4.0 },
      { note: 'G4', duration: 0.4, time: 4.4 },

      { note: 'C4', duration: 0.4, time: 4.8 },
      { note: 'E4', duration: 0.4, time: 5.2 },
      { note: 'C5', duration: 0.4, time: 5.2 },
      { note: 'G4', duration: 0.4, time: 5.6 },
      { note: 'B4', duration: 0.4, time: 5.6 },
      { note: 'C4', duration: 0.4, time: 6 },
      { note: 'C5', duration: 0.4, time: 6 },
      { note: 'E4', duration: 0.4, time: 6.4 },
      { note: 'B4', duration: 0.4, time: 6.4 },
      { note: 'G4', duration: 0.4, time: 6.8 },
      { note: 'C5', duration: 0.4, time: 6.8 },

      { note: 'D4', duration: 0.4, time: 7.2 },
      { note: 'D5', duration: 2.5, time: 7.2 },
      { note: 'F4', duration: 0.4, time: 7.6 },
      { note: 'A4', duration: 0.4, time: 8 },

      { note: 'D4', duration: 0.4, time: 8.4 },
      { note: 'F4', duration: 0.4, time: 8.8 },
      { note: 'A4', duration: 0.4, time: 9.2 },

      { note: 'D4', duration: 0.4, time: 9.6 },
      { note: 'F4', duration: 0.4, time: 10 },
      { note: 'A4', duration: 0.4, time: 10.4 }
    ]}
    nextScene="level7"
  />
);

export default Level6;
