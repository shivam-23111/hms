// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserData } from '../utils/auth';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Patients', href: '/patients' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Staff', href: '/staff' },
];

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const data = getUserData();
    if (!data) {
      router.push('/login');
    } else {
      setUserData(data);
    }
    setLoading(false);
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!userData) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f4f6f8' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: '#1976d2',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1rem',
          minHeight: '100vh',
        }}
      >
        <h2 style={{ marginBottom: '2rem', fontWeight: 700, letterSpacing: 1 }}>HMS Dashboard</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map((item) => (
              <li key={item.href} style={{ marginBottom: 18 }}>
                <a
                  href={item.href}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: 16,
                    padding: '8px 16px',
                    borderRadius: 6,
                    display: 'block',
                    background: router.pathname === item.href ? '#1565c0' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div style={{ flex: 1 }} />
        <div style={{ borderTop: '1px solid #fff3', marginTop: 24, paddingTop: 16 }}>
          <span style={{ fontSize: 14 }}>Logged in as</span>
          <div style={{ fontWeight: 600 }}>{userData.name}</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>{userData.role}</div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ color: '#1976d2', fontWeight: 700, fontSize: 32, margin: 0 }}>
            Welcome, {userData.name} 👋
          </h1>
          <div style={{ color: '#555', marginTop: 8 }}>
            <span>Email: {userData.email}</span>
            <span style={{ marginLeft: 24 }}>
              Role: <strong style={{ color: '#1565c0' }}>{userData.role}</strong>
            </span>
          </div>
        </header>

        {/* Role-specific content */}
        {userData.role === 'ADMIN' && (
          <section style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: '2rem', marginBottom: 24 }}>
            <h2 style={{ color: '#1565c0', marginTop: 0 }}>Admin Panel</h2>
            <p>Here you can manage users and appointments.</p>
            <ul>
              <li>View and edit all users</li>
              <li>Manage appointments</li>
              <li>Access reports and analytics</li>
            </ul>
          </section>
        )}

        {userData.role === 'DOCTOR' && (
          <section style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: '2rem', marginBottom: 24 }}>
            <h2 style={{ color: '#1565c0', marginTop: 0 }}>Doctor Panel</h2>
            <p>View your appointments and patient records.</p>
          </section>
        )}

        {userData.role === 'PATIENT' && (
          <section style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: '2rem', marginBottom: 24 }}>
            <h2 style={{ color: '#1565c0', marginTop: 0 }}>Patient Panel</h2>
            <p>View your appointments and medical history.</p>
          </section>
        )}

        {/* General dashboard info */}
        <section style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: '2rem' }}>
          <h3 style={{ color: '#1976d2', marginTop: 0 }}>Quick Links</h3>
          <ul>
            <li><a href="/patients" style={{ color: '#1565c0' }}>Manage Patients</a></li>
            <li><a href="/appointments" style={{ color: '#1565c0' }}>View Appointments</a></li>
            <li><a href="/staff" style={{ color: '#1565c0' }}>Staff Directory</a></li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
