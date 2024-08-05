import { useState, useRef, useEffect } from "react";
import CountDownDisplay from "./components/CountDownDisplay";
import "./App.css";

function App() {
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [countdown, setCountdown] = useState(0); // store timer in seconds
  const [started, setStarted] = useState(false);
  const [togglePause, setTogglePause] = useState(false);
  const intervalIdRef = useRef(0);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setTimer((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (id === "minutes") {
      let tmp = value;
      if (tmp === "") tmp = 0;
      setCountdown(parseInt(tmp) * 60 + timer.seconds);
    } else {
      let tmp = value;
      if (tmp === "") tmp = 0;
      setCountdown(parseInt(tmp) + timer.minutes);
    }
  };

  const handleStartTimer = (e) => {
    e.preventDefault();

    if (countdown === 0) {
      return;
    }

    setStarted(!started);
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    intervalIdRef.current = intervalId;
  };

  const handlePauseResumeTimer = (e) => {
    e.preventDefault();
    if (!togglePause) {
      // pause
      setTogglePause(!togglePause);
      clearInterval(intervalIdRef.current);
    } else {
      // continue
      setTogglePause(!togglePause);
      const intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      intervalIdRef.current = intervalId;
    }
  };

  const handleResetTimer = (e) => {
    e.preventDefault();
    clearInterval(intervalIdRef.current);
    setCountdown(0);
    setTimer({ minutes: 0, seconds: 0 });
    setStarted(false);
  };

  useEffect(() => {
    if (countdown === 0 && started) {
      alert("Timer is complete.");
      clearInterval(intervalIdRef.current);
      setStarted(false);
    }
  }, [countdown, started]);

  return (
    <>
      <h1>Timer</h1>
      <form>
        <input
          id="minutes"
          type="number"
          value={timer.minutes}
          min={0}
          onChange={handleInputChange}
        />
        <label>Minutes</label>
        <input
          id="seconds"
          type="number"
          value={timer.seconds}
          min={0}
          onChange={handleInputChange}
        />
        <label>Seconds</label>
        <button onClick={handleStartTimer} disabled={started}>
          START
        </button>
        <button onClick={handlePauseResumeTimer}>PAUSE/RESUME</button>
        <button onClick={handleResetTimer}>RESET</button>
      </form>
      <h3>
        <CountDownDisplay countdown={countdown} />
      </h3>
    </>
  );
}

export default App;
