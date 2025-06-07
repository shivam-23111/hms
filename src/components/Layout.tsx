import React from 'react';
import { useRouter } from 'next/router';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    return (
        <div>
            <header>
                <h1>Hospital Management System</h1>
                <nav>
                    <ul>
                        <li onClick={() => router.push('/')}>Home</li>
                        <li onClick={() => router.push('/patients')}>Patients</li>
                        <li onClick={() => router.push('/dashboard')}>Dashboard</li>
                        <li onClick={() => router.push('/login')}>Login</li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Hospital Management System</p>
            </footer>
        </div>
    );
};

export default Layout;