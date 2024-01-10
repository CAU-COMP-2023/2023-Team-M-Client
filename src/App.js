import { useState, useRef, useCallback, useEffect } from 'react';
import ToDoEdit from './components/ToDoEdit';
import ToDoInsert from './components/ToDoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/ToDoTemplate';
import Timer from './components/Timer';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {


  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [
      {
        id: 1,
        text: '기본 1',
        min: 0,
        seconds: 0,
        checked: true,
      },
      {
        id: 2,
        text: '기본 2',
        min: 0,
        seconds: 0,
        checked: true,
      },
      {
        id: 3,
        text: '기본 3',
        min: 0,
        seconds: 0,
        checked: false,
      },
    ];
  });

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);

  const nextId = useRef(4);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onInsertToggle = useCallback(() => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle((prev) => !prev);
  }, [selectedTodo]);

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const onInsert = useCallback(
    ({ text, min, seconds }) => {
      const todo = {
        id: nextId.current,
        text,
        min,
        seconds,
        checked: false,
      };
      setTodos((todos) => todos.concat(todo));
      nextId.current++;
    },
    []
  );

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onUpdate = useCallback(
    (id, text) => {
      onInsertToggle();

      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
      );
    },
    [onInsertToggle],
  );

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (

    
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/"
          element={
            <>
             <Timer />
              <TodoTemplate>
                <ToDoInsert onInsert={onInsert} />
                <TodoList
                  todos={todos}
                  onToggle={onToggle}
                  onRemove={onRemove}
                  onChangeSelectedTodo={onChangeSelectedTodo}
                  onInsertToggle={onInsertToggle}
                />
                {insertToggle && (
                  <ToDoEdit
                    onInsert={onInsert}
                    selectedTodo={selectedTodo}
                    onInsertToggle={onInsertToggle}
                    onUpdate={onUpdate}
                    insertToggle={insertToggle}
                  />
                )}
              </TodoTemplate>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
