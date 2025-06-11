import { PrismaClient, user as PrismaUser, role } from '@prisma/client';

const prisma = new PrismaClient();

// Define the User interface to match Prisma's User with Role relation
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: role; // Prisma relation to Role model
}

// Input type for creating a user (without id, with roleId for relation)
export interface UserCreateInput {
  name: string;
  email: string;
  password: string;
  role: { connect: { id: number } }; // Connect to existing Role by id
}

// Input type for updating a user
export interface UserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  role?: { connect: { id: number } }; // Optional role update
}

export const createUser = async (userData: UserCreateInput): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    },
    include: { role: true }, // Include role data in response
  });
  return user;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { role: true }, // Include role data
  });
  return user;
};

export const updateUser = async (id: number, userData: UserUpdateInput): Promise<User> => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    },
    include: { role: true }, // Include role data
  });
  return user;
};

export const deleteUser = async (id: number): Promise<User> => {
  const user = await prisma.user.delete({
    where: { id },
    include: { role: true }, // Include role data
  });
  return user;
};