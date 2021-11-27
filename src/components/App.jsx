import '../reset.css';
import '../App.css';
import { useState } from 'react';

function App() {
  let [todos,setTodos]=useState([
    {id:1,title:'this is title 1',completed:false},
    {id:2,title:'this is title 2',completed:true},
    {id:3,title:'this is title 3',completed:false},
  ])
  let [title,setTitle]=useState("")

  let handleSubmit=(e)=>{
    e.preventDefault();
    setTodos(prevTodos=>[...prevTodos,{id:Math.random(),title,completed:false}])
  }

  let handleInput=(e)=>{
    setTitle(e.target.value);
  }

  let deleteTodo=(id)=>setTodos(prevTodos=>prevTodos.filter(todo=>todo.id!==id))
  
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
          {todos.map(todo=>
          <li className="todo-item-container" key={todo.id}>
            <div className="todo-item">
              <input type="checkbox" />
              <span className="todo-item-label">{todo.title}</span>
              {/* <input type="text" className="todo-item-input" value="Do other thing /> */}
            </div>
            <button className="x-button" onClick={()=>deleteTodo(todo.id)}>
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
          )}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
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
