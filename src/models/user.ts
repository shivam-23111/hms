import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'doctor' | 'nurse' | 'receptionist'| 'patient';
}

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    const user = await prisma.user.create({
        data: userData,
    });
    return user;
};

export const getUserById = async (id: number): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    return user;
};

export const updateUser = async (id: number, userData: Partial<Omit<User, 'id'>>): Promise<User> => {
    const user = await prisma.user.update({
        where: { id },
        data: userData,
    });
    return user;
};

export const deleteUser = async (id: number): Promise<User> => {
    const user = await prisma.user.delete({
        where: { id },
    });
    return user;
};