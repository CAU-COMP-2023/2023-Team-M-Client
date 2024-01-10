
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
  const handleMinutesChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputMinutes(isNaN(value) ? 0 : value);
  };

  const handleSecondsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputSeconds(isNaN(value) ? 0 : value);
  };

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