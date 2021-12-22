/**
 * this hook is on top of the layer of useState hook
 */

import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  let [value, setValue] = useState(() => {
    let item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue; //always check the item is exists on lS and setValue on every render
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); //set the new value on every change
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
