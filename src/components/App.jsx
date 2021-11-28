import '../reset.css';
import '../App.css';
import { useState } from 'react';

function App() {
  let [todos, setTodos] = useState([
    { id: 1, title: 'this is title 1', completed: false, isEdit: false },
    { id: 2, title: 'this is title 2', completed: true, isEdit: false },
    { id: 3, title: 'this is title 3', completed: false, isEdit: false },
  ]);
  let [title, setTitle] = useState('');

  let handleSubmit = e => {
    e.preventDefault();
    if(title.trim().length !== 0 ){
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Math.random(), title, completed: false },
      ]);
      setTitle("")
    }
  };

  let handleInput = e => {
    setTitle(e.target.value);
  };
  let deleteTodo = id =>
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));

  let checkedHandler = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  let markAsEdit = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEdit = true;
      } else {
        todo.isEdit = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  let updateTodo = (e, id) => {
    let updatedTodos = todos.map(todo => {
        e.target.value.length !== 0 && todo.id === id && (todo.title = e.target.value);
        todo.isEdit = false;
        return todo;
    });
    setTodos(updatedTodos);
  };

  let cancelTodo = (id) =>{
    let updateTodos=todos.map(todo=>{
      if(todo.id ===id){
        todo.isEdit=false
      }
      return todo;
    })
    setTodos(updateTodos)
  }

  let handleKey=(e,id)=>{
    if (e.key === 'Escape') {cancelTodo(id)};
    if(e.key==='Enter') {updateTodo(e, id)}; 
  }
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={handleInput}
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map(todo => (
            <li className="todo-item-container" key={todo.id}>
              <div className="todo-item">
                <input
                  type="checkbox"
                  defaultChecked={todo.completed}
                  onChange={() => checkedHandler(todo.id)}
                />
                {!todo.isEdit && (
                  <span
                    className={`todo-item-label ${todo.completed ? 'line-through' : ''
                      }`}
                    onDoubleClick={() => {
                      markAsEdit(todo.id);
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
                    onBlur={e=>updateTodo(e,todo.id)}
                    onKeyUp={e => {handleKey(e,todo.id)}}
                  />
                )}
              </div>
              <button className="x-button" onClick={() => deleteTodo(todo.id)}>
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

          <span>{todos.filter(todo=>!todo.completed).length} items remaining</span>
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
      </div>
    </div>
  );
}

export default App;
