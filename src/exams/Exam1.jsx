import { useState } from 'react';

export default function Exam1() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);

  const atTarget = count >= target;
  const status = count === 0 ? 'Not started' : atTarget ? 'Target reached' : 'In progress';

  const increment = () => setCount((c) => Math.min(c + 1, target));
  const decrement = () => setCount((c) => Math.max(c - 1, 0));
  const reset = () => setCount(0);

  const addTwo = () => {
    setCount((c) => Math.min(c + 1, target));
    setCount((c) => Math.min(c + 1, target));
  };

  return (
    <section>
      <h2>Smart Task Counter</h2>
      <label>
        Target:{' '}
        <input type="number" min="1" value={target}
          onChange={(e) => setTarget(Math.max(1, Number(e.target.value) || 1))} />
      </label>
      <p className="big">{count} <span>/ {target} tasks</span></p>
      <p className="badge">{status}</p>
      <div className="controls">
      <button onClick={increment} disabled={atTarget}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={addTwo} disabled={atTarget}>Plus two</button>
      <button onClick={reset}>Reset</button>
      </div>
    </section>
  );
}
