import React, { useContext } from 'react';
import TodosContext from '../context/TodosContext';

export default function CheckAllTodos() {
  const { setTodos } = useContext(TodosContext);
  let checkAll = () => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        todo.completed = true;
        return todo;
      });
    });
  };
  return (
    <div>
      <div className="button" onClick={checkAll}>
        Check All
      </div>
    </div>
  );
}
