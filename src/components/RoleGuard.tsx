import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/auth';

const RoleGuard = ({ children, allowedRoles }) => {
    const router = useRouter();
    const { user } = useAuth();

    React.useEffect(() => {
        if (!user || !allowedRoles.includes(user.role)) {
            router.replace('/login');
        }
    }, [user, allowedRoles, router]);

    if (!user || !allowedRoles.includes(user.role)) {
        return null; // Optionally, you can return a loading spinner or message here
    }

    return <>{children}</>;
};

export default RoleGuard;