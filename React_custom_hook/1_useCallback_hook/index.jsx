import React, { useState, memo, useMemo } from 'react';
import './style.css';
import useCustomCallback from './useCustomCallback.js';

const Child = React.memo(({ increment }) => {
  console.log('Re-render');

  return <button onClick={increment}>Increment</button>;
});

const App = () => {
  const [count, setCount] = useState(1);
  const [other, setOther] = useState(true);

  // const increment = () => {
  //   setCount(count + 1);
  // };

  const increment = useCustomCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <h2>Example of Custom useCallback hook</h2>
      <p>Count : {count}</p>
      <Child increment={increment} />
      <button onClick={() => setOther(!other)}>Re-triggered</button>
      <p>Other : {other.toString()}</p>
    </div>
  );
};

export default App;

