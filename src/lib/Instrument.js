import player from 'sample-player/lib/player';
import events from 'sample-player/lib/events';
import notes from 'sample-player/lib/notes';
import scheduler from 'sample-player/lib/scheduler';

class Instrument {
  constructor(sampler, ac, options) {
    const instrumentOptions = Object.assign({}, Instrument.defaultOptions, options);

    return scheduler(notes(events(player(ac, sampler, instrumentOptions)))).connect(ac.destination);
  }
}

Instrument.defaultOptions = {
  gain: 1
};

export default Instrument;
