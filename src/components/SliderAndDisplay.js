import { Box, Slider } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";

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
              setBpm(newValue);
              stop().then(() => run());
            }}
            min={30}
            max={300}
          />
        </Box>
      </div>
      <button
        onClick={() => {
          setIsPlay((prev) => {
            if (!prev) {
              run();
            } else {
              stop();
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
