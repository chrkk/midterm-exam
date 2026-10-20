import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, reducer } from './reducer.js';

test('ADD_ISSUE adds an open issue and increments nextId', () => {
  const next = reducer(initialState, { type: 'ADD_ISSUE', payload: { title: 'Bug' } });
  assert.deepEqual(next.issues, [{ id: 1, title: 'Bug', done: false }]);
  assert.equal(next.nextId, 2);
  assert.equal(initialState.issues.length, 0); // original not mutated
});

test('TOGGLE_ISSUE flips done without mutating the old issue', () => {
  const state = { ...initialState, issues: [{ id: 1, title: 'A', done: false }], nextId: 2 };
  const next = reducer(state, { type: 'TOGGLE_ISSUE', payload: { id: 1 } });
  assert.equal(next.issues[0].done, true);
  assert.equal(state.issues[0].done, false);
});

test('CLEAR_DONE removes only completed issues', () => {
  const state = { ...initialState, nextId: 3,
    issues: [{ id: 1, title: 'A', done: true }, { id: 2, title: 'B', done: false }] };
  assert.deepEqual(reducer(state, { type: 'CLEAR_DONE' }).issues.map((i) => i.id), [2]);
});
