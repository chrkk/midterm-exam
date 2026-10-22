import { useState } from 'react';
import Exam1 from './exams/Exam1.jsx';
import Exam2 from './exams/Exam2.jsx';
import Exam3 from './exams/Exam3.jsx';
import Exam4 from './exams/Exam4.jsx';
import Exam5 from './exams/Exam5.jsx';
import Exam6 from './exams/Exam6.jsx';

const EXAMS = [
  ['Task Counter', Exam1], ['Live Search', Exam2], ['Form Toolkit', Exam3],
  ['Preferences', Exam4], ['Products', Exam5], ['Issues', Exam6],
];

export default function App() {
  const [index, setIndex] = useState(0);
  const Current = EXAMS[index][1];
  return (
    <>
      <header>
        <h1>React Hooks Practical</h1>
        <p>Pick an exam tab to try it.</p>
      </header>
      <nav>
        {EXAMS.map(([name], i) => (
          <button key={name} aria-pressed={i === index} onClick={() => setIndex(i)}>
            {i + 1}. {name}
          </button>
        ))}
      </nav>
      <Current />
    </>
  );
}
