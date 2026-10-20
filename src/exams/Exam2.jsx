import { useEffect, useState } from 'react';

const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' },
];

export default function Exam2() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(USERS);
  const [seconds, setSeconds] = useState(0);

  // Debounced "search request". Depends on query only. It sets `results`,
  // which is NOT in the dependency array, so it does not loop.
  useEffect(() => {
    const id = setTimeout(() => {
      const q = query.trim().toLowerCase();
      setResults(USERS.filter((u) =>
        u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)));
    }, 300);
    // Cleanup cancels the previous pending search -> no outdated result
    return () => clearTimeout(id);
  }, [query]);

  // Timer: functional update avoids capturing the initial `seconds` (stuck at 1)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    // Cleanup stops the interval on unmount / StrictMode remount
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.title = `${results.length} result(s)`;
  }, [results.length]);

  return (
    <section>
      <h2>Live Search and Timer</h2>
      <p>Session: {seconds}s</p>
      <input value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder="Search name or role" aria-label="Search users" />
      <p>{results.length} visible</p>
      <ul>
        {results.map((u) => <li key={u.id}>{u.name} – {u.role}</li>)}
      </ul>
    </section>
  );
}
