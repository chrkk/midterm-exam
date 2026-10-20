import { PreferencesProvider, usePreferences } from './preferences.jsx';

function Toolbar() {
  const { theme, toggleTheme } = usePreferences();
  return <button onClick={toggleTheme}>Theme: {theme}</button>;
}

function PreferencesPanel() {
  const { fontSize, setFontSize } = usePreferences();
  return (
    <div className="controls">
      {[14, 16, 18].map((s) => (
        <button key={s} aria-pressed={fontSize === s} onClick={() => setFontSize(s)}>{s}px</button>
      ))}
    </div>
  );
}

function ArticlePreview() {
  const { theme, fontSize } = usePreferences();
  return (
    <article className="panel" style={{ fontSize, padding: '1rem', background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#eee' : '#111', border: '1px solid #888' }}>
      <h3>Article preview</h3>
      <p>Theme and font size reach this component without any props.</p>
    </article>
  );
}

function Dashboard() {
  const { theme } = usePreferences();
  return (
    <div className="panel" style={{ padding: '1rem', background: theme === 'dark' ? '#111' : '#eee',
      color: theme === 'dark' ? '#eee' : '#111' }}>
      <Toolbar />
      <PreferencesPanel />
      <ArticlePreview />
    </div>
  );
}

export default function Exam4() {
  return (
    <PreferencesProvider>
      <section>
        <h2>Application Preferences</h2>
        <Dashboard />
      </section>
    </PreferencesProvider>
  );
}
