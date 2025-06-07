// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const body = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Authentication failed');
        return;
      }

      // ✅ Save user data to localStorage
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // ✅ Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p style={{ marginTop: 16 }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button type="button" onClick={() => setIsRegister(!isRegister)} style={{ color: '#1976d2', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Login;
