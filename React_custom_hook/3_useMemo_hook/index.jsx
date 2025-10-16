import React, { useState, memo, useMemo } from 'react';
import './style.css';
import useCustomMemo from './useCustomMemo.js';

const App = () => {
  const [count, setCount] = useState(1);
  const [other, setOther] = useState(true);

  // const sqrd = useMemo(() => {
  //   console.log('re-render');
  //   return count * count;
  // }, [count]);

  const sqrd = useCustomMemo(() => {
    console.log('re-render');
    return count * count;
  }, [count]);

  return (
    <div>
      <h2>Example of custom useMemo hook</h2>
      <p>Count : {count}</p>
      <p>Sqaured : {sqrd}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setOther(!other)}>Retriggered</button>
      <p>Other : {other.toString()}</p>
    </div>
  );
};

export default App;
