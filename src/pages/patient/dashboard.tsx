// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserData } from '../../utils/auth';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Appointment {
  id: number;
  doctorName: string;
  date: string;
  time: string;
  status: string;
}

const menuItems = [
  { label: 'Dashboard', href: '/patient/dashboard' },
  { label: 'My Appointments', href: '/patient/appointments' },
  { label: 'Medical Records', href: '/patient/records' },
  { label: 'Profile', href: '/patient/profile' },
];

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = getUserData();
    if (!data) {
      router.push('/login');
    } else {
      setUserData(data);
      fetchAppointments(data.id);
    }
    setLoading(false);
  }, [router]);

  const fetchAppointments = async (patientId: number) => {
    try {
      const res = await fetch(`/api/patient/appointments?patientId=${patientId}`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments);
      }
    } catch (error) {
      // handle error if needed
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  const handleScheduleClick = () => {
    router.push('/patient/schedule');
  };

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
        <h2 style={{ marginBottom: '2rem', fontWeight: 700, letterSpacing: 1 }}>Patient Portal</h2>
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
          <button
            onClick={handleLogout}
            style={{
              marginTop: 16,
              background: '#fff',
              color: '#1976d2',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Logout
          </button>
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

        {/* Schedule Appointment Button */}
        <button
          onClick={handleScheduleClick}
          style={{
            display: 'inline-block',
            marginBottom: 16,
            background: '#1976d2',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 6,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          + Schedule New Appointment
        </button>

        {/* Patient-specific content */}
        <section
          style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px #0001',
            padding: '2rem',
            marginBottom: 24,
          }}
        >
          <h2 style={{ color: '#1565c0', marginTop: 0 }}>My Upcoming Appointments</h2>
          <p>View and manage your upcoming appointments with doctors.</p>
          <ul>
            {appointments.length === 0 && <li>No upcoming appointments.</li>}
            {appointments.map((appt) => (
              <li key={appt.id}>
                Dr. {appt.doctorName} - {appt.date} at {appt.time} ({appt.status})
              </li>
            ))}
          </ul>
          <a href="/patient/appointments" style={{ color: '#1976d2', fontWeight: 500 }}>
            View All Appointments
          </a>
        </section>

        <section
          style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px #0001',
            padding: '2rem',
            marginBottom: 24,
          }}
        >
          <h2 style={{ color: '#1565c0', marginTop: 0 }}>Medical Records</h2>
          <p>Access your medical history, prescriptions, and lab results.</p>
          <ul>
            <li>
              Blood Test - 01 June 2025 - <a href="#">View Report</a>
            </li>
            <li>
              Prescription - 05 May 2025 - <a href="#">View Prescription</a>
            </li>
          </ul>
          <a href="/patient/records" style={{ color: '#1976d2', fontWeight: 500 }}>
            View All Records
          </a>
        </section>

        <section
          style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px #0001',
            padding: '2rem',
          }}
        >
          <h2 style={{ color: '#1565c0', marginTop: 0 }}>Profile</h2>
          <p>Update your personal information and contact details.</p>
          <a href="/patient/profile" style={{ color: '#1976d2', fontWeight: 500 }}>
            Go to Profile
          </a>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
