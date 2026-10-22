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

  useEffect(() => {
    const id = setTimeout(() => {
      const q = query.trim().toLowerCase();
      setResults(USERS.filter((u) =>
        u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)));
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
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
