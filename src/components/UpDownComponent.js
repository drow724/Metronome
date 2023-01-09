import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import { IconButton } from "@material-ui/core";
import React from "react";
import { Stack } from "@mui/material";

function UpDownComponent({ setBpm, run, stop }) {
  return (
    <Stack spacing={1}>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        onClick={() => {
          setBpm((prev) => {
            return prev === 300 ? prev : prev + 1;
          });
          stop().then(() => run());
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
          stop().then(() => run());
        }}
      >
        <ArrowCircleDownTwoToneIcon />
      </IconButton>
    </Stack>
  );
}

export default React.memo(UpDownComponent);
