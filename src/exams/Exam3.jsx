import { useRef, useState } from 'react';

export default function Exam3() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [clicks, setClicks] = useState(0);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const lastEmail = useRef('');

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.password.length < 8) next.password = 'Password must be at least 8 characters.';
    setErrors(next);

    if (next.name) return nameRef.current.focus();
    if (next.email) return emailRef.current.focus();
    if (next.password) return passwordRef.current.focus();

    setMessage(`Registered. Previous email: ${lastEmail.current || 'none'}`);
    lastEmail.current = values.email;
  };

  return (
    <section>
      <h2>Accessible Form Toolkit</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[['name', 'Name', 'text', nameRef], ['email', 'Email', 'email', emailRef],
          ['password', 'Password', 'password', passwordRef]].map(([key, label, type, ref]) => (
          <label key={key}>
            {label}<br />
            <input ref={ref} name={key} type={type} value={values[key]} onChange={onChange}
              aria-invalid={Boolean(errors[key])} aria-describedby={`${key}-err`} />
            <p id={`${key}-err`} className="err" role="alert">{errors[key]}</p>
          </label>
        ))}
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setClicks((c) => c + 1)}>Clicks: {clicks}</button>
    </section>
  );
}
