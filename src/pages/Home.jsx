import '../reset.css';
import '../App.css';
import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import EmptyTodoFeedback from '../components/EmptyTodoFeedback';
import useLocalStorage from '../hooks/useLocalStorage';
import TodosContext from '../context/TodosContext';

function App() {
  let [name, setName] = useLocalStorage('name', '');
  let [todos, setTodos] = useLocalStorage('todos', []);

  let [filter, setFilter] = useState('all');
  let [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTodos(todos);
    }
    if (filter === 'active') {
      setFilteredTodos(todos.filter(todo => !todo.completed));
    }
    if (filter === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.completed));
    }
  }, [filter, todos]);

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
      e.target.value.length !== 0 &&
        todo.id === id &&
        (todo.title = e.target.value);
      todo.isEdit = false;
      return todo;
    });
    setTodos(updatedTodos);
  };

  let cancelTodo = id => {
    let updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEdit = false;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  let handleKey = (e, id) => {
    if (e.key === 'Escape') {
      cancelTodo(id);
    }
    if (e.key === 'Enter') {
      updateTodo(e, id);
    }
  };
  return (
    <TodosContext.Provider value={{ todos, setTodos, filter, setFilter }}>
      <div className="todo-app">
        <div className="name-container">
          <h2>What's your Name</h2>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="todo-input"
            placeholder="What is your name?"
          />
          {name && <p className="mt-2">Hello {name}</p>}
        </div>
        <h2>Todo App</h2>
        <TodoForm />
        {!!todos.length && (
          <TodoList
            onUpdateTodo={updateTodo}
            onCheckedHandler={checkedHandler}
            filteredTodos={filteredTodos}
            onMarkAsEdit={markAsEdit}
            onHandleKey={handleKey}
          />
        )}
        {!todos.length && <EmptyTodoFeedback />}
      </div>
    </TodosContext.Provider>
  );
}

export default App;
