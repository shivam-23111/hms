// ===========================
// ✅ FRONTEND: schedule.tsx
// ===========================
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserData } from '../../utils/auth';

interface Doctor {
  id: number;
  name: string;
}

const ScheduleAppointment = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const user = getUserData();

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data.doctors || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!doctorId || !date) {
      setError('Please select doctor and date/time.');
      return;
    }

    try {
      const res = await fetch('/api/patient/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: user.patientId, // Make sure this is available in user data
          userId: Number(doctorId),
          date,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Appointment scheduled successfully!');
        setDoctorId('');
        setDate('');
      } else {
        setError(data.message || 'Failed to schedule appointment.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
      <h2 style={{ color: '#1976d2' }}>Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Doctor:</label>
          <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required style={{ width: '100%', padding: 8 }}>
            <option value="">Select Doctor</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Date & Time:</label>
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
        <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: 6, fontWeight: 600 }}>Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleAppointment;