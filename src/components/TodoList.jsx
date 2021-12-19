import React from 'react';
import propTypes from 'prop-types';

TodoList.propTypes = {
  todos: propTypes.array.isRequired,
  onDeleteTodo: propTypes.func.isRequired,
  onCheckedHandler: propTypes.func.isRequired,
  onMarkAsEdit: propTypes.func.isRequired,
  onHandleKey: propTypes.func.isRequired,
};
export default function TodoList({
  todos,
  onDeleteTodo,
  onCheckedHandler,
  onMarkAsEdit,
  onUpdateTodo,
  onHandleKey,
}) {
  return (
    <>
      <ul className="todo-list">
        {todos.map(todo => (
          <li className="todo-item-container" key={todo.id}>
            <div className="todo-item">
              <input
                type="checkbox"
                defaultChecked={todo.completed}
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
            <button className="x-button" onClick={() => onDeleteTodo(todo.id)}>
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
          </li>
        ))}
      </ul>
      <div className="check-all-container">
        <div>
          <div className="button">Check All</div>
        </div>
        <span>
          {todos.filter(todo => !todo.completed).length} items remaining
        </span>
      </div>

      <div className="other-buttons-container">
        <div>
          <button className="button filter-button filter-button-active">
            All
          </button>
          <button className="button filter-button">Active</button>
          <button className="button filter-button">Completed</button>
        </div>
        <div>
          <button className="button">Clear completed</button>
        </div>
      </div>
    </>
  );
}
