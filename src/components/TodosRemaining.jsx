import React, { useContext, useMemo } from 'react';
import TodosContext from '../context/TodosContext';

export default function TodosRemaining() {
  let { todos } = useContext(TodosContext);
  /*
    this function  only run when filteredTodos is updated
    benefits - reduce slow component rendering because this fun not always run for every state change.
  */
  const remainingItems = useMemo(() => {
    //long calculation for every render that can slow when component is rerender
    // for (let index = 0; index < 200000000; index++) {}
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);
  return <span>{remainingItems} items remaining</span>;
}
