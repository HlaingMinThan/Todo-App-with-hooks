import propTypes from 'prop-types';
import React, { useState } from 'react';
TodoForm.propTypes = {
  onHandleSubmit: propTypes.func.isRequired,
};
export default function TodoForm({ onHandleSubmit }) {
  let [title, setTitle] = useState('');
  let handleInput = e => {
    setTitle(e.target.value);
  };
  let submitHandler = e => {
    e.preventDefault();
    if (title.trim().length === 0) {
      return;
    }
    setTitle('');
    onHandleSubmit(title);
  };
  return (
    <form action="#" onSubmit={submitHandler}>
      <input
        value={title}
        onChange={handleInput}
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}
