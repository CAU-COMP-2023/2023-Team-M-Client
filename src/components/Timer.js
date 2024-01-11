import React, { useState, useRef, useEffect } from 'react';
import './Timer.scss';
import { LiaUsersSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const Timer = () => {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          clearInterval(intervalRef.current);
          setIsTimerRunning(false);
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
  }, [isTimerRunning, minutes, seconds]);

  const startTimer = () => {
    const totalSeconds = inputMinutes * 60 + inputSeconds;
    if (totalSeconds > 0 && !isTimerRunning) {
      setMinutes(inputMinutes);
      setSeconds(inputSeconds);
      setIsTimerRunning(true);
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setMinutes(0);
    setSeconds(0);
    setIsTimerRunning(false);
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
    <>
   

    <div className="timer-container">

      <Link to="/UserSearch">
        <button className="friend" >
          <LiaUsersSolid style={{ width: '2rem', height: '2rem' }}/>
        </button>

      </Link>

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

    </>
  );
};

export default Timer;