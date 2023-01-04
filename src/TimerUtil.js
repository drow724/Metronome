export function loop(setTimeOutTimer, rhythm, bpm) {
  setTimeOutTimer([]);
  rhythm.forEach((sound, i) => {
    setTimeOutTimer((current) => [
      ...current,
      setTimeout(() => {
        sound();
      }, (60 / bpm) * 1000 * (i + 1)),
    ]);
  });
}
