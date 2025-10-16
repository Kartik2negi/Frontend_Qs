import { useRef } from 'react';

const isEqual = (prevDeps, nextDeps) => {
  if (!prevDeps || prevDeps.length !== nextDeps.length) return false;
  for (let i = 0; i < nextDeps.length; i++) {
    if (nextDeps[i] !== prevDeps[i]) {
      return false;
    }
  }
  return true;
};

const useCustomCallback = (cb, deps) => {
  const ref = useRef();

  if (!ref.current || !isEqual(ref.current.deps, deps)) {
    ref.current = {
      value: cb,
      deps,
    };
  }
  return ref.current.value;
};

export default useCustomCallback;
