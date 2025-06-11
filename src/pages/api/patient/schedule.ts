import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Request body:', req.body); // Log to debug
  const { patientId, userId, date } = req.body;

  // Validate fields
  if (!patientId || !userId || !date) {
    return res.status(400).json({ message: 'All fields (patientId, userId, date) are required.' });
  }

  // Convert and validate IDs
  const parsedPatientId = parseInt(patientId);
  const parsedUserId = parseInt(userId);
  if (isNaN(parsedPatientId) || isNaN(parsedUserId)) {
    return res.status(400).json({ message: 'patientId and userId must be valid numbers.' });
  }

  // Validate date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: 'Invalid date format. Use ISO format (e.g., 2025-06-15T10:00:00Z).' });
  }

  try {
    // Check if patient and user exist
    const patient = await prisma.patient.findUnique({ where: { id: parsedPatientId } });
    const doctor = await prisma.user.findUnique({ where: { id: parsedUserId } });
    if (!patient) {
      return res.status(400).json({ message: `Patient with ID ${parsedPatientId} not found.` });
    }
    if (!doctor) {
      return res.status(400).json({ message: `Doctor with ID ${parsedUserId} not found.` });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: parsedPatientId,
        userId: parsedUserId,
        date: parsedDate,
        status: 'Scheduled',
      },
    });
    return res.status(201).json({ appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: 'Failed to schedule appointment.', error: errorMessage });
  }
}