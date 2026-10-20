import { useEffect, useReducer } from 'react';

export function usePersistentReducer(reducer, initialState, key) {
  // Third argument: lazy initializer, so localStorage loads only once
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* ignore */ }
  }, [key, state]);

  return [state, dispatch];
}
