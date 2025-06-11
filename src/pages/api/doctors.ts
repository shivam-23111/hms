import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const doctors = await prisma.user.findMany({
    where: { role: { name: 'DOCTOR' } },
    select: { id: true, name: true }
  });

  res.status(200).json({ doctors });
}