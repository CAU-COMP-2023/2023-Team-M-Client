import React, { useState, useEffect } from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
  MdModeEditOutline,
} from 'react-icons/md';
import './ToDoListItem.scss';
import cn from 'classnames';

function ToDoListItem({
  todo,
  onRemove,
  onToggle,
  onChangeSelectedTodo,
  onInsertToggle,
  style
}) {
  //const { id, text, checked, time } = todo; 이렇게 바꿔줘야함
  const { id, text, checked, min, seconds } = todo;
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const handleMinutesChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputMinutes(isNaN(value) ? 0 : value);
  };

  const handleSecondsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputSeconds(isNaN(value) ? 0 : value);
  };

  const handleStartButtonClick = () => {
    setTimerRunning(!timerRunning);
  };

  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setInputSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));

        if (inputSeconds === 0 && inputMinutes > 0) {
          setInputMinutes((prevMinutes) => prevMinutes - 1);
          setInputSeconds(59);
        }
        if (inputMinutes === 0 && inputSeconds === 0) {
          setTimerRunning(false);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timerRunning, inputMinutes, inputSeconds]);

  useEffect(() => {
    // min과 seconds가 변경될 때 inputMinutes와 inputSeconds를 업데이트
    setInputMinutes(min);
    setInputSeconds(seconds);
  }, [min, seconds]);



  return (
      <div className="TodoListItem-virtualized" style={style}>
        <li className="TodoListItem">
        {/* 이쪽은 check-box 부터~ */}
          <div
            className={cn('checkbox', { checked: checked })}
            onClick={() => onToggle(id)}
          >
            {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            {/* react에서 제공해주는 아이콘 mdchecbox 등등 */}
            <div className="text">{text}</div>
          </div>
        
          {/* 여기다가 타이머를 넣어줘야함. */}
          <div className="timer-controls">
          <button className="start-button" onClick={handleStartButtonClick}>
            {timerRunning ? 'Stop' : 'Start'}
          </button>
          </div>
          


      <div className="time-info">
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

          <div
            className="edit"
            onClick={() => {
              onChangeSelectedTodo(todo);
              onInsertToggle();
            }}
          >
          <MdModeEditOutline />
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </li>
    </div>

  );
}

export default React.memo(ToDoListItem);