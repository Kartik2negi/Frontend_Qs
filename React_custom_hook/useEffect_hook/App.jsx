import React, { useState, useEffect } from 'react';
import './style.css';

// 1st Way
let prevDeps = [];
let cleanupFn = null;

function useMyEffect(callback, deps) {
  let hasChanged = !deps || deps.some((dep, i) => dep !== prevDeps[i]);

  if (hasChanged) {
    if (cleanupFn) cleanupFn();
    cleanupFn = callback() || null;
    prevDeps = deps;
  }
}

// 2nd Way
// function useMyEffect(callback, deps) {
//   let prevDeps = useRef();
//   let cleanupFn = useRef(null);

//   let hasChanged =
//     !deps || !prevDeps.current
//       ? true
//       : deps.some((dep, i) => dep !== prevDeps.current[i]);

//   if (hasChanged) {
//     if (cleanupFn.current) {
//       cleanupFn.current();
//     }
//     cleanupFn.current = callback() || null;

//     prevDeps.current = deps;
//   }
// }

const App = () => {
  const [count, setCount] = useState(1);

  useMyEffect(() => {
    console.log('Mount - count', count);

    return () => console.log('UnMount - count', count);
  }, [count]);

  return (
    <div>
      <h3>Custom UseEffect </h3>
      <p> Count : {count} </p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase </button>
    </div>
  );
};

export default App;
