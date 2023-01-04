import { Box, Slider } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import useSound from "use-sound";
import { Loop, loop } from "../TimerUtil";
import stick1 from "../Drum-Sticks-Hit-E-www.fesliyanstudios.com.mp3";
import stick2 from "../Drum-Sticks-Hit-G-www.fesliyanstudios.com.mp3";

function SliderAndDisplay({ bpm, setBpm }) {
  const [isPlay, setIsPlay] = useState(false);

  //Accent count
  const [accent, setAccent] = useState(0);
  //rythme count
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

  const [intervalTimer, setIntervalTimer] = useState(0);

  const [timeOutTimer, setTimeOutTimer] = useState([]);

  const [play] = useSound(stick1);

  const [accentPlay] = useSound(stick2);

  const rhythm = useMemo(() => {
    const arr = [];
    for (let i = 0; i < beatsPerMeasure; i++) {
      if (accent === i) {
        arr.push(accentPlay);
      } else {
        arr.push(play);
      }
    }
    return arr;
  }, [accent, accentPlay, beatsPerMeasure, play]);

  const handleInputChange = (event, newValue) => {
    const bpm = newValue;
    if (isPlay) {
      // stop old timer and start a new one
      clearInterval(intervalTimer);

      timeOutTimer.forEach((timeOut) => {
        clearTimeout(timeOut);
      });

      loop(setTimeOutTimer, rhythm, bpm);
      setIntervalTimer(
        setInterval(() => {
          loop(setTimeOutTimer, rhythm, bpm);
        }, (60 / bpm) * 1000 * beatsPerMeasure)
      );
      // set the new bpm
      // and reset the beat counter
      setBpm(bpm);
    } else {
      // otherwise, just update the bpm
      setBpm(bpm);
    }
  };

  return (
    <React.Fragment>
      <div className="bpm-slider">
        <p>{bpm} BPM</p>
        <Box>
          <Slider
            value={bpm}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleInputChange}
            min={30}
            max={300}
          />
        </Box>
      </div>
      <button
        onClick={() => {
          setIsPlay((prev) => {
            if (!prev) {
              loop(setTimeOutTimer, rhythm, bpm);
              setIntervalTimer(
                setInterval(() => {
                  loop(setTimeOutTimer, rhythm, bpm);
                }, (60 / bpm) * 1000 * beatsPerMeasure)
              );
            } else {
              clearInterval(intervalTimer);
              timeOutTimer.forEach((timeOut) => {
                clearTimeout(timeOut);
              });
            }
            return !prev;
          });
        }}
      >
        {isPlay ? "Stop" : "Start"}
      </button>
    </React.Fragment>
  );
}

export default React.memo(SliderAndDisplay);
