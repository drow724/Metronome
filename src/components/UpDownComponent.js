import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import { Button, Stack } from "@mui/material";

function UpDownComponent({ setBpm, run, stop, isPlay, setIsPlay }) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"미제공"}
            label="Age"
            //onChange={handleChange}
            disabled
          >
            <MenuItem value={"미제공"}>{"미제공"}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
            label="Age"
            //onChange={handleChange}
            disabled
          >
            <MenuItem value={"미제공"}>{"미제공"}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
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
      </Button>
      <Stack direction={"row"} spacing={1}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => {
            setBpm((prev) => {
              return prev === 300 ? prev : prev + 1;
            });
            if (isPlay) {
              stop().then(() => run());
            }
          }}
        >
          <ArrowCircleUpTwoToneIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => {
            setBpm((prev) => {
              return prev === 30 ? prev : prev - 1;
            });
            if (isPlay) {
              stop().then(() => run());
            }
          }}
        >
          <ArrowCircleDownTwoToneIcon />
        </IconButton>
      </Stack>
    </React.Fragment>
  );
}

export default React.memo(UpDownComponent);
