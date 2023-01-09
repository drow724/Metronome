import React, { useEffect, useState } from "react";

export default function Webtronome() {
  //Beat Per Minute
  const [bpm, setBpm] = useState(60);

  const [message, setMessage] = useState("");
  const onMessage = (event) => setMessage(event.data);

  useEffect(() => {
    const worker = new Worker("worker.js");
    worker.addEventListener("message", onMessage);
    return () => {
      worker.removeEventListener("error", onMessage);
      worker.terminate();
    };
  }, []);

  return (
    <div className="metronome">
      {/* <SliderAndDisplay bpm={bpm} setBpm={setBpm} />
      <UpDownComponent setBpm={setBpm} /> */}
      {/* //<button onClick={runSort}></button> */}
    </div>
  );
}
