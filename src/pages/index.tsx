import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{ background: '#1976d2', color: '#fff', padding: '1rem 2rem' }}>
                <h1>Hospital Management System</h1>
            </header>

            {/* Navbar */}
            <nav style={{ background: '#1565c0', padding: '0.5rem 2rem' }}>
                <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
                    <li>
                        <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/patients" style={{ color: '#fff', textDecoration: 'none' }}>Patients</Link>
                    </li>
                    <li>
                        <Link href="/appointments" style={{ color: '#fff', textDecoration: 'none' }}>Appointments</Link>
                    </li>
                    <li>
                        <Link href="/staff" style={{ color: '#fff', textDecoration: 'none' }}>Staff</Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem' }}>
                <h2>Welcome to the Hospital Management System</h2>
                <p>Your one-stop solution for managing hospital operations efficiently.</p>
                <ul>
                    <li>Manage patient records</li>
                    <li>Schedule and track appointments</li>
                    <li>Oversee staff and departments</li>
                    <li>Role-based secure access</li>
                </ul>
            </main>

            {/* Footer */}
            <footer style={{ background: '#1976d2', color: '#fff', textAlign: 'center', padding: '1rem 0' }}>
                &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;