import React, { useContext } from 'react';
import TodosContext from '../context/TodosContext';

export default function DeleteTodo({ id }) {
  let { setTodos } = useContext(TodosContext);
  let deleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  return (
    <button className="x-button" onClick={() => deleteTodo(id)}>
      <svg
        className="x-button-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
