import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered.' });
  }

  // 🔍 Find role ID for 'patient'
  const role = await prisma.role.findUnique({ where: { name: 'patient' } });
  if (!role) {
    return res.status(500).json({ message: 'Default role patient not found in DB.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: {
        connect: { id: role.id } // connect user to patient role
      },
    },
  });

  return res.status(201).json({ message: 'User registered successfully.' });
}
