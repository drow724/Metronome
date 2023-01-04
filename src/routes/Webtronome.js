import React, { useCallback, useEffect, useMemo, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useSound from "use-sound";
import stick1 from "../Drum-Sticks-Hit-E-www.fesliyanstudios.com.mp3";
import stick2 from "../Drum-Sticks-Hit-G-www.fesliyanstudios.com.mp3";
export default function Webtronome() {
  const [isPlay, setIsPlay] = useState(false);

  //Beat Per Minute
  const [bpm, setBpm] = useState(60);
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

  const loop = () => {
    setTimeOutTimer([]);
    rhythm.forEach((sound, i) => {
      setTimeOutTimer((current) => [
        ...current,
        setTimeout(() => {
          sound();
        }, (60 / bpm) * 1000 * (i + 1)),
      ]);
    });
  };

  const handleInputChange = (event) => {
    const bpm = event.target.value;
    if (isPlay) {
      // stop old timer and start a new one
      clearInterval(intervalTimer);

      timeOutTimer.forEach((timeOut) => {
        clearTimeout(timeOut);
      });

      loop();
      setIntervalTimer(setInterval(loop, (60 / bpm) * 1000 * beatsPerMeasure));
      // set the new bpm
      // and reset the beat counter
      setBpm(bpm);
    } else {
      // otherwise, just update the bpm
      setBpm(bpm);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="metronome">
      <div className="bpm-slider">
        <input
          type="number"
          min="60"
          max="240"
          onChange={handleInputChange}
          value={bpm}
        />
        <p>{bpm} BPM</p>
        <input
          type="range"
          min="60"
          max="240"
          value={bpm}
          onChange={handleInputChange}
        />
      </div>
      <button
        onClick={() => {
          setIsPlay((prev) => {
            if (!prev) {
              loop();
              setIntervalTimer(
                setInterval(loop, (60 / bpm) * 1000 * beatsPerMeasure)
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
    </div>
  );
}
