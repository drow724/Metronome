import React, { useState } from "react";
import SliderAndDisplay from "../components/SliderAndDisplay";
import UpDownComponent from "../components/UpDownComponent";

export default function Webtronome() {
  //Beat Per Minute
  const [bpm, setBpm] = useState(60);

  return (
    <div className="metronome">
      <SliderAndDisplay bpm={bpm} setBpm={setBpm} />
      <UpDownComponent setBpm={setBpm} />
    </div>
  );
}
