import { Box, Slider } from "@material-ui/core";
import React from "react";
import UpDownComponent from "../components/UpDownComponent";

function SliderAndDisplay({ bpm, setBpm, run, stop, isPlay, setIsPlay }) {
  return (
    <React.Fragment>
      <div className="bpm-slider">
        <p>{bpm} BPM</p>
        <Box>
          <Slider
            value={bpm}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={(event, newValue) => {
              if (isPlay) {
                setBpm(newValue);
                stop().then(() => run());
              } else {
                setBpm(newValue);
              }
            }}
            min={30}
            max={300}
          />
        </Box>
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <UpDownComponent
          setBpm={setBpm}
          run={run}
          stop={stop}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
        />
      </Box>
    </React.Fragment>
  );
}

export default React.memo(SliderAndDisplay);
