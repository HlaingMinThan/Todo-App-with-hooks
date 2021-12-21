import React from 'react';
import propTypes from 'prop-types';
import TodosRemaining from './TodosRemaining';
import ClearCompleted from './ClearCompleted';
TodoList.propTypes = {
  filteredTodos: propTypes.array.isRequired,
  onDeleteTodo: propTypes.func.isRequired,
  onCheckedHandler: propTypes.func.isRequired,
  onMarkAsEdit: propTypes.func.isRequired,
  onHandleKey: propTypes.func.isRequired,
  remainingItems: propTypes.number.isRequired,
  onClearCompleted: propTypes.func.isRequired,
  checkAll: propTypes.func.isRequired,
  setFilter: propTypes.func.isRequired,
  filter: propTypes.string.isRequired,
};
export default function TodoList({
  filteredTodos,
  remainingItems,
  onDeleteTodo,
  onCheckedHandler,
  onMarkAsEdit,
  onUpdateTodo,
  onHandleKey,
  onClearCompleted,
  checkAll,
  setFilter,
  filter,
}) {
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
          <div className="button" onClick={checkAll}>
            Check All
          </div>
        </div>
        <TodosRemaining remainingItems={remainingItems} />
      </div>

      <div className="other-buttons-container">
        <div>
          <button
            className={`button filter-button ${
              filter === 'all' ? 'filter-button-active' : ''
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`button filter-button ${
              filter === 'active' ? 'filter-button-active' : ''
            }`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`button filter-button ${
              filter === 'completed' ? 'filter-button-active' : ''
            }`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <div>
          <ClearCompleted onClearCompleted={onClearCompleted} />
        </div>
      </div>
    </>
  );
}
