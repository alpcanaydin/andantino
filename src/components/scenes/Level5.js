import React from 'react';
import Level from '../Level';

const Level5 = () => (
  <Level
    title="Level 5"
    description="Easiest waltz ever? Two notes at the same time! Be careful about repeats."
    showVST={10}
    schedule={[
      { note: 'F4', duration: 0.4, time: 0 },
      { note: 'A4', duration: 0.4, time: 0.4 },
      { note: 'C5', duration: 0.4, time: 0.4 },
      { note: 'A4', duration: 0.4, time: 0.8 },
      { note: 'C5', duration: 0.4, time: 0.8 },

      { note: 'F4', duration: 0.4, time: 1.2 },
      { note: 'A4', duration: 0.4, time: 1.6 },
      { note: 'C5', duration: 0.4, time: 1.6 },
      { note: 'A4', duration: 0.4, time: 2 },
      { note: 'C5', duration: 0.4, time: 2 },

      { note: 'F4', duration: 0.4, time: 2.4 },
      { note: 'A4', duration: 0.4, time: 2.8 },
      { note: 'C5', duration: 0.4, time: 2.8 },
      { note: 'A4', duration: 0.4, time: 3.2 },
      { note: 'C5', duration: 0.4, time: 3.2 },

      { note: 'F4', duration: 0.4, time: 3.6 },
      { note: 'A4', duration: 0.4, time: 4 },
      { note: 'C5', duration: 0.4, time: 4 },
      { note: 'A4', duration: 0.4, time: 4.4 },
      { note: 'C5', duration: 0.4, time: 4.4 },

      { note: 'E4', duration: 0.4, time: 4.8 },
      { note: 'B4', duration: 0.4, time: 5.2 },
      { note: 'G4', duration: 0.4, time: 5.2 },
      { note: 'B4', duration: 0.4, time: 5.6 },
      { note: 'G4', duration: 0.4, time: 5.6 },

      { note: 'E4', duration: 0.4, time: 6 },
      { note: 'B4', duration: 0.4, time: 6.4 },
      { note: 'G4', duration: 0.4, time: 6.4 },
      { note: 'B4', duration: 0.4, time: 6.8 },
      { note: 'G4', duration: 0.4, time: 6.8 },

      { note: 'E4', duration: 0.4, time: 7.2 },
      { note: 'B4', duration: 0.4, time: 7.6 },
      { note: 'G4', duration: 0.4, time: 7.6 },
      { note: 'B4', duration: 0.4, time: 8.0 },
      { note: 'G4', duration: 0.4, time: 8.0 },

      { note: 'E4', duration: 0.4, time: 8.4 },
      { note: 'B4', duration: 0.4, time: 8.8 },
      { note: 'G4', duration: 0.4, time: 8.8 },
      { note: 'B4', duration: 0.4, time: 9.2 },
      { note: 'G4', duration: 0.4, time: 9.2 }
    ]}
    nextScene="level6"
  />
);

export default Level5;
