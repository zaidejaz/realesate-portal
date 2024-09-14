import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      brokerage,
      state,
      centralZipCode,
      radius,
      signUpCategory,
      totalTeamMembers,
    } = body;

    const realtor = await prisma.realtor.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        brokerage,
        state,
        centralZipCode,
        radius,
        signUpCategory,
        totalTeamMembers,
        agentCode: generateAgentCode(firstName, lastName),
        user: {
          create: {
            email,
            password: generateTemporaryPassword(),
            role: 'REALTOR',
          },
        },
      },
    });

    return NextResponse.json(realtor, { status: 201 });
  } catch (error) {
    console.error('Error creating realtor:', error);
    return NextResponse.json({ error: 'Error creating realtor' }, { status: 500 });
  }
}

function generateAgentCode(firstName: string, lastName: string): string {
  // Implement agent code generation logic
  return `${firstName[0]}${lastName[0]}${Math.floor(1000 + Math.random() * 9000)}`;
}

function generateTemporaryPassword(): string {
  // Implement temporary password generation logic
  return Math.random().toString(36).slice(-8);
}