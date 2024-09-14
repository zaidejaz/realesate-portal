// app/api/leadgen/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerFirstName,
      customerLastName,
      phoneNumber,
      emailAddress,
      propertyAddress,
      city,
      state,
      zipcode,
      homeOwner,
      propertyValue,
      contractWithRealtor,
      submittedById,
    } = body;

    const lead = await prisma.lead.create({
      data: {
        customerFirstName,
        customerLastName,
        phoneNumber,
        emailAddress,
        propertyAddress,
        city,
        state,
        zipcode,
        homeOwner,
        propertyValue,
        contractWithRealtor,
        submittedBy: { connect: { id: submittedById } },
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Error creating lead' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const submittedById = searchParams.get('submittedById');

    if (!submittedById) {
      return NextResponse.json({ error: 'submittedById is required' }, { status: 400 });
    }

    const leads = await prisma.lead.findMany({
      where: { submittedById },
      orderBy: { submissionDate: 'desc' },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Error fetching leads' }, { status: 500 });
  }
}