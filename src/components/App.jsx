import '../reset.css';
import '../App.css';
import { useState, useEffect, useRef, useMemo } from 'react';
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
  let [name, setName] = useState('');

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
  /*
    this function  only run when filteredTodos is updated
    benefits - reduce slow component rendering because this fun not always run for every state change.
  */
  const remainingItems = useMemo(() => {
    //long calculation for every render that can slow when component is rerender
    for (let index = 0; index < 200000000; index++) {}
    return filteredTodos.filter(todo => !todo.completed).length;
  }, [filteredTodos]);
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
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)} //this will rerender when user is typing
            className="todo-input"
            placeholder="What is your name?"
          />

          {name && <p>Hello {name}</p>}
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
