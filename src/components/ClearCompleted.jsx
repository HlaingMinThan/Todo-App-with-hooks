import React, { useContext } from 'react';
import TodosContext from '../context/TodosContext';
export default function ClearCompleted() {
  let { setTodos } = useContext(TodosContext);
  let clearCompleted = () => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => !todo.completed);
    });
  };
  return (
    <div>
      <button className="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </div>
  );
}
