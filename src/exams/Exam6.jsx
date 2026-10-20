import { useState } from 'react';
import { initialState, reducer } from './reducer.js';
import { usePersistentReducer } from './usePersistentReducer.js';

export default function Exam6() {
  const [state, dispatch] = usePersistentReducer(reducer, initialState, 'issue-tracker');
  const [title, setTitle] = useState('');
  const { issues, filter } = state;

  const counts = {
    all: issues.length,
    open: issues.filter((i) => !i.done).length,
    done: issues.filter((i) => i.done).length,
  };
  const shown = issues.filter((i) => filter === 'all' || (filter === 'open' ? !i.done : i.done));

  const submit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ISSUE', payload: { title } }); // payload shape matches reducer
    setTitle('');
  };

  return (
    <section>
      <h2>Issue Tracker</h2>
      <form className="controls" onSubmit={submit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New issue" aria-label="Issue title" />
        <button type="submit">Add</button>
      </form>
      <div className="controls">
        {['all', 'open', 'done'].map((f) => (
          <button key={f} aria-pressed={filter === f}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: f } })}>
            {f} ({counts[f]})
          </button>
        ))}
        <button onClick={() => dispatch({ type: 'CLEAR_DONE' })}>Clear done</button>
      </div>
      <ul>
        {shown.map((i) => (
          <li key={i.id}>
            <label>
              <input type="checkbox" checked={i.done}
                onChange={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: i.id } })} />{' '}
              <span className={i.done ? 'done' : ''}>{i.title}</span>
            </label>
            <button className="danger" onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: i.id } })}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
