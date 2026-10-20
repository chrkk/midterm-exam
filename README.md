# React Hooks Practical Exam

Run: `npm install` then `npm run dev`. Reducer tests: `npm test`.
One tab per exam (1–6) in a single Vite + React app. No state libraries.

## Completed requirements
All requirements for Exams 1–6 (see `src/exams/`).

## Known limitations
- Exam 5 shows only the first 20 matches for readability.
- Exam 6 ignores empty issue titles.

## Test steps
1. Counter: target 5, count 0; 4 then Plus two (stops at 5); Decrement at 0; Reset at target.
2. Search: type fast, only the final query result shows; watch the tab title; switch tabs, timer stops.
3. Form: submit empty (focus goes name → email → password); submit twice to see previous email.
4. Preferences: toggle theme, switch 14/16/18px.
5. Products: open console, click the unrelated counter; "ProductList rendered" must not log.
6. Issues: add, toggle, filter, clear done, reload the page (state persists).

## Debugging explanations
- Ex1: `setCount(count + 1)` twice reads the same captured `count` from the render snapshot; functional updaters receive the latest queued value.
- Ex2: an effect that sets the state it depends on loops, so depend on `query` only. `setSeconds(s => s + 1)` avoids a stale `seconds`. Cleanups cancel the pending timeout and stop the interval.
- Ex3: mutating `ref.current` does not schedule a render; use state for visible data.
- Ex4: a missing provider yields only the default value; two `createContext` calls make two unrelated contexts. Context removes intermediate props because any descendant reads the value directly.
- Ex5: `useMemo`/`useCallback` must list every value they read; analytics is a side effect, so it goes in `useEffect`.
- Ex6: return new objects (`{...state}`, `{...issue}`), match `action.payload`, and `default: return state`.

## When memoization is unnecessary
Filtering a 10-item list or a cheap `a + b` calculation: the memo bookkeeping costs more than recomputing.
