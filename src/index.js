import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TimeWorker from "./worker.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const helloWorker = new TimeWorker();
let messageCount = 0;

helloWorker.postMessage({ run: true });

helloWorker.onmessage = (event) => {
  if (event.data.status) {
    console.log("STATUS", event.data.status);
  }

  if (event.data.message) {
    messageCount += 1;
    console.log("MESSAGE", event.data.message);

    if (messageCount >= 5) {
      helloWorker.postMessage({ run: false });
    }
  }
};
