import { useState } from 'react';

const useToggle = (initialState = true) => {
  let [visiable, setVisiable] = useState(initialState);

  function toggle() {
    setVisiable(prevState => !prevState);
  }

  return [visiable, toggle];
};

export default useToggle;
