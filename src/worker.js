/* eslint-disable no-restricted-globals */
// assume ./worker.ts contains
let result;

const volume = 0.5;
let nextNoteTime = 1.0;

// create the audio context
const audioContext = new AudioContext();

// create a buffer source and add the buffer
var source = audioContext.createBufferSource();
source.buffer = audioContext.createBuffer(1, 1, 22050);

// start playing the audio data immediately
source.start(0);

let index = 1;

function rhythm(bpm, volumeNode, beatsPerMeasure, fn) {
  const secondsPerBeat = 60.0 / bpm;
  // when it is time to schedule a note to play
  // we use while becuase audioContext time is incrementing even when paused
  // so we loop until the nextNoteTime catches up
  while (nextNoteTime < audioContext.currentTime + 0.1) {
    // create an oscillator which generates a constant tone (a beep)
    const osc = audioContext.createOscillator();
    osc.connect(volumeNode);
    if (index % beatsPerMeasure === 1) {
      osc.frequency.value = 880.0;
    } else {
      osc.frequency.value = 440.0;
    }

    // start the beep at the next note time
    osc.start(nextNoteTime);

    // stop the beep after at the note length
    osc.stop(nextNoteTime + 0.075);

    // calculate the time of the next note
    nextNoteTime += secondsPerBeat;

    index++;
    fn(index);
  }
}

export function start(bpm, volume, beatsPerMeasure, fn) {
  const volumeNode = audioContext.createGain();
  volumeNode.gain.value = volume;
  volumeNode.connect(audioContext.destination);
  result = setInterval(() => {
    rhythm(bpm, volumeNode, beatsPerMeasure, fn);
  }, 100);
}

export function stop() {
  clearInterval(result);
  index = 1;
}
