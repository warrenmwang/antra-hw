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
    let valueTmp = value;
    if (valueTmp === "") valueTmp = "0";
    let valueInt = parseInt(valueTmp);

    // pre-process / validation
    if (id === "minutes" && valueInt > 99) {
      valueInt = 99;
    } else if (id === "seconds" && valueInt > 59) {
      valueInt = 59;
    }

    setTimer((prev) => ({
      ...prev,
      [id]: `${valueInt}`,
    }));

    if (id === "minutes") {
      setCountdown(valueInt * 60 + timer.seconds);
    } else {
      setCountdown(timer.minutes * 60 + valueInt);
    }
  };

  const handleStartTimer = (e) => {
    e.preventDefault();

    if (countdown === 0) {
      return;
    }

    setStarted(true);
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    intervalIdRef.current = intervalId;
  };

  const handlePauseResumeTimer = (e) => {
    e.preventDefault();

    if (!started) {
      return;
    }

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
    setTogglePause(false);
  };

  useEffect(() => {
    if (countdown === 0 && started) {
      clearInterval(intervalIdRef.current);
      setTimer({ minutes: 0, seconds: 0 });
      setStarted(false);
      setTogglePause(false);
      alert("Timer is complete.");
    }
  }, [countdown, started]);

  return (
    <>
      <h1>Timer</h1>
      <form>
        {!started && (
          <>
            <input
              id="minutes"
              type="number"
              value={timer.minutes}
              min={0}
              max={99}
              onChange={handleInputChange}
            />
            <label>Minutes</label>
            <input
              id="seconds"
              type="number"
              value={timer.seconds}
              min={0}
              max={59}
              onChange={handleInputChange}
            />
            <label>Seconds</label>
          </>
        )}
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
