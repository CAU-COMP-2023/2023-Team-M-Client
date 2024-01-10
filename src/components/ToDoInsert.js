import "./ToDoInsert.scss";
import {MdAdd} from 'react-icons/md'
import { useCallback, useState } from "react";

function ToDoInsert({onInsert}) {

    const handleMinutesChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setInputMinutes(isNaN(value) ? 0 : value);
      };
    
      const handleSecondsChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setInputSeconds(isNaN(value) ? 0 : value);
      };
      const [inputMinutes, setInputMinutes] = useState(0);
      const [inputSeconds, setInputSeconds] = useState(0);


    
    const [value, setValue] = useState('');
    const onChange = useCallback(e=>{
        setValue(e.target.value);
    },[])

    const onSubmit = useCallback(
    (e) => {
        onInsert({
        text: value,
        min: inputMinutes,
        seconds: inputSeconds,
        });
        setValue(''); //value 초기화
        setInputMinutes(0); // inputMinutes 초기화
        setInputSeconds(0); // inputSeconds 초기화
        // 기본 이벤트(새로고침) 방지
        e.preventDefault();
    },
    [onInsert, value, inputMinutes, inputSeconds]
    );

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
            onChange={onChange}
            value={value} placeholder="할 일을 입력하세요" />
            
                  
            <div className="howmuch">
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



            <button type="submit">
                <MdAdd />
            </button>
        </form>
    )
}
        
export default ToDoInsert;