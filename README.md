# andantino

Andantino is a game that let's people to know if they are a tone-deaf or not. Users listen some notes and try to find
same notes on the keyboard.

https://alpcanaydin.github.io/andantino

# Installation

Pull this repo and and run `yarn` command. You can start dev server via `yarn start`

# Sending New Levels

If you like Andantino and want to send new level, please open an issue and provide an array like this:

```js
[
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
]
```

# MIDI Sounds
Piano sounds gathered from this wonderful library: https://github.com/gleitz/midi-js-soundfonts

# Inspirations
These repositories used for code and UI inspirations.

* https://github.com/googlecreativelab/aiexperiments-ai-duet
* https://github.com/danigb/soundfont-player
* https://github.com/stuartmemo/qwerty-hancock
