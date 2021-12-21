import '../reset.css';
import '../App.css';
import { useState, useEffect, useRef } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import EmptyTodoFeedback from './EmptyTodoFeedback';
function App() {
  let [todos, setTodos] = useState([
    { id: 1, title: 'this is title 1', completed: false, isEdit: false },
    { id: 2, title: 'this is title 2', completed: true, isEdit: false },
    { id: 3, title: 'this is title 3', completed: false, isEdit: false },
  ]);
  let [filteredTodos, setFilteredTodos] = useState(todos);
  let [filter, setFilter] = useState('all');
  let nameInputRef = useRef(null);

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
  let remainingItems = () => {
    return filteredTodos.filter(todo => !todo.completed).length;
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
  let handleSubmit = title => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Math.random(), title, completed: false },
    ]);
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
  let onClearCompleted = () => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => !todo.completed);
    });
  };
  let checkAll = () => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        todo.completed = true;
        return todo;
      });
    });
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
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What's your Name</h2>
          <button
            type="button"
            onClick={() => {
              console.log(nameInputRef.current.value);
            }}
          >
            get ref
          </button>
          <input
            ref={nameInputRef}
            type="text"
            className="todo-input"
            placeholder="What is your name?"
          />
        </div>
        <h2>Todo App</h2>
        <TodoForm onHandleSubmit={handleSubmit} />
        {!!todos.length && (
          <TodoList
            filter={filter}
            checkAll={checkAll}
            onDeleteTodo={deleteTodo}
            onUpdateTodo={updateTodo}
            onCheckedHandler={checkedHandler}
            filteredTodos={filteredTodos}
            onMarkAsEdit={markAsEdit}
            onHandleKey={handleKey}
            onClearCompleted={onClearCompleted}
            setFilter={setFilter}
            remainingItems={remainingItems}
          />
        )}
        {!todos.length && <EmptyTodoFeedback />}
      </div>
    </div>
  );
}

export default App;
