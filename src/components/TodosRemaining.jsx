import React from 'react';
import propTypes from 'prop-types';

TodosRemaining.propTypes = {
  remainingItems: propTypes.number.isRequired,
};

export default function TodosRemaining({ remainingItems }) {
  return <span>{remainingItems} items remaining</span>;
}
