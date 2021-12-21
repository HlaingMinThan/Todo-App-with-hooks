import React from 'react';
import propTypes from 'prop-types';

TodosRemaining.propTypes = {
  remainingItems: propTypes.func.isRequired,
};

export default function TodosRemaining({ remainingItems }) {
  return <span>{remainingItems()} items remaining</span>;
}
