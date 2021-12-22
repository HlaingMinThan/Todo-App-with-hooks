import React from 'react';
import propTypes from 'prop-types';
import TodosRemaining from './TodosRemaining';
import ClearCompleted from './ClearCompleted';
import useToggle from '../hooks/useToggle';
import FilterButtons from './FilterButtons';
import CheckAllTodos from './CheckAllTodos';
import DeleteTodo from './DeleteTodo';
TodoList.propTypes = {
  filteredTodos: propTypes.array.isRequired,
  onCheckedHandler: propTypes.func.isRequired,
  onMarkAsEdit: propTypes.func.isRequired,
  onHandleKey: propTypes.func.isRequired,
};
export default function TodoList({
  filteredTodos,
  onCheckedHandler,
  onMarkAsEdit,
  onUpdateTodo,
  onHandleKey,
}) {
  let [firstVisiable, togglefirstVisiable] = useToggle();
  let [secondVisiable, toggleSecondVisiable] = useToggle();
  return (
    <>
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li className="todo-item-container" key={todo.id}>
            <div className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onCheckedHandler(todo.id)}
              />
              {!todo.isEdit && (
                <span
                  className={`todo-item-label ${
                    todo.completed ? 'line-through' : ''
                  }`}
                  onDoubleClick={() => {
                    onMarkAsEdit(todo.id);
                  }}
                >
                  {todo.title}
                </span>
              )}
              {todo.isEdit && (
                <input
                  autoFocus
                  type="text"
                  className="todo-item-input"
                  defaultValue={todo.title}
                  onBlur={e => onUpdateTodo(e, todo.id)}
                  onKeyUp={e => {
                    onHandleKey(e, todo.id);
                  }}
                />
              )}
            </div>

            <DeleteTodo id={todo.id} />
          </li>
        ))}
      </ul>
      <div className="toggles-container mt-2">
        <button className="button" onClick={togglefirstVisiable}>
          toggle first
        </button>
        <button className="button" onClick={toggleSecondVisiable}>
          toggle second
        </button>
      </div>
      {firstVisiable && (
        <div className="check-all-container">
          <CheckAllTodos />
          <TodosRemaining />
        </div>
      )}

      {secondVisiable && (
        <div className="other-buttons-container">
          <FilterButtons />
          <ClearCompleted />
        </div>
      )}
    </>
  );
}
