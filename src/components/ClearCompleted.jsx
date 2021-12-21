import React from 'react';
import propTypes from 'prop-types';

ClearCompleted.propTypes = {
  onClearCompleted: propTypes.func.isRequired,
};

export default function ClearCompleted({ onClearCompleted }) {
  return (
    <button className="button" onClick={onClearCompleted}>
      Clear completed
    </button>
  );
}
