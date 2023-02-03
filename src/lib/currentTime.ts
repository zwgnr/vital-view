import { useState } from "react";

export function CurrentTime() {
  const [time, setTime] = useState(new Date().toLocaleString());
  const currentTime = new Date();
  console.log(currentTime);
  console.log(currentTime.toLocaleString());
  console.log(currentTime.toUTCString());
  return time;
}
