import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RoleGuard from '../components/RoleGuard';
import { fetchPatients, addPatient, updatePatient } from '../lib/db';

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });
    const router = useRouter();

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients();
                setPatients(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPatients();
    }, []);

    const handleAddPatient = async (e) => {
        e.preventDefault();
        try {
            await addPatient(newPatient);
            setPatients([...patients, newPatient]);
            setNewPatient({ name: '', age: '', condition: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdatePatient = async (id, updatedInfo) => {
        try {
            await updatePatient(id, updatedInfo);
            setPatients(patients.map(patient => (patient.id === id ? { ...patient, ...updatedInfo } : patient)));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <RoleGuard>
            <h1>Patient Records</h1>
            <form onSubmit={handleAddPatient}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Condition"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                    required
                />
                <button type="submit">Add Patient</button>
            </form>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        {patient.name} - {patient.age} - {patient.condition}
                        <button onClick={() => handleUpdatePatient(patient.id, { /* updated info */ })}>Edit</button>
                    </li>
                ))}
            </ul>
        </RoleGuard>
    );
};

export default PatientsPage;