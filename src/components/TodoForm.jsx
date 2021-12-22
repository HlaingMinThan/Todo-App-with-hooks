import React, { useContext, useState } from 'react';
import TodosContext from '../context/TodosContext';
export default function TodoForm() {
  let [title, setTitle] = useState('');
  let { setTodos } = useContext(TodosContext);
  let handleInput = e => {
    setTitle(e.target.value);
  };
  let submitHandler = e => {
    e.preventDefault();
    if (title.trim().length === 0) {
      return;
    }
    setTitle('');
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Math.random(), title, completed: false },
    ]);
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        value={title}
        onChange={handleInput}
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}
