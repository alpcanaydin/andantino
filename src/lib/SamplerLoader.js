import base64Decoder from './helper/base64Decoder';

class SamplerLoader {
  constructor(ac, loaderOptions) {
    if (!ac) {
      throw new Error('AudioContext is required.');
    }

    this.ac = ac;
    this.options = Object.assign({}, SamplerLoader.defaultOptions, loaderOptions);
  }

  fetchJSON() {
    return fetch(`${this.options.uri}/${this.options.file}`)
      .then(response => response.json())
    ;
  }

  async load() {
    const notes = await this.fetchJSON();
    const promises = [];

    for (const [key, data] of Object.entries(notes)) {
      const buffer = base64Decoder(data.replace('data:audio/mp3;base64,', ''));

      const promise = new Promise((resolve, reject) => {
        this.ac.decodeAudioData(
          buffer,
          (audioBuffer) => { resolve({ key, audioBuffer }); },
          reject
        );
      });

      promises.push(promise);
    }

    const sampler = await Promise.all(promises);
    return sampler.reduce(
      (acc, { key, audioBuffer }) => Object.assign({}, acc, { [key]: audioBuffer }),
      {}
    );
  }
}

SamplerLoader.defaultOptions = {
  uri: '',
  file: ''
};

export default SamplerLoader;
