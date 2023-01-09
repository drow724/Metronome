import React, { useEffect, useState } from "react";
import SliderAndDisplay from "../components/SliderAndDisplay";
import UpDownComponent from "../components/UpDownComponent";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

const createWorker = createWorkerFactory(() => import("../worker"));

export default function Webtronome() {
  const [bpm, setBpm] = useState(60);

  const [volume, setVolume] = useState(1);

  //rythme count
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

  const [isPlay, setIsPlay] = useState(false);

  const [message, setMessage] = useState(1);

  //Beat Per Minute
  const worker = useWorker(createWorker);

  const run = async () => {
    const msg = await worker.start(bpm, volume, beatsPerMeasure, (result) => {
      setMessage(result);
    });
  };

  const stop = async () => {
    await worker.stop();
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div className="metronome">
      <SliderAndDisplay
        bpm={bpm}
        setBpm={setBpm}
        run={run}
        stop={stop}
        isPlay={isPlay}
        setIsPlay={setIsPlay}
      />
      <UpDownComponent setBpm={setBpm} run={run} stop={stop} />
    </div>
  );
}
