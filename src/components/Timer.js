import React, { useState, useRef, useEffect } from 'react';
import './Timer.scss';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          clearInterval(intervalRef.current);
          setIsActive(false);
        } else {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    const totalSeconds = inputMinutes * 60 + inputSeconds;
    if (totalSeconds > 0 && !isActive) {
      setMinutes(inputMinutes);
      setSeconds(inputSeconds);
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setIsActive(false);
  };

  const handleMinutesChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputMinutes(isNaN(value) ? 0 : value);
  };

  const handleSecondsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputSeconds(isNaN(value) ? 0 : value);
  };

  return (
    <div className="timer-container">

      <div className="timer-display">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
      
      
      <div className="input-container">
        <input
          type="number"
          value={inputMinutes}
          onChange={handleMinutesChange}
          placeholder="분"
        />
        <span>:</span>
        <input
          type="number"
          value={inputSeconds}
          onChange={handleSecondsChange}
          placeholder="초"
        />
      </div>

      
      <div className="button-container">
        <button onClick={startTimer}>START</button>
        <button onClick={stopTimer}>STOP</button>
        <button onClick={resetTimer}>RESET</button>
      </div>
    </div>
  );
};

export default Timer;