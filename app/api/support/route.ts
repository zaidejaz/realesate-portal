import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const acceptedLeads = await prisma.lead.findMany({
      where: { status: 'ACCEPTED' },
      orderBy: { submissionDate: 'desc' },
    });

    return NextResponse.json(acceptedLeads);
  } catch (error) {
    console.error('Error fetching accepted leads:', error);
    return NextResponse.json({ error: 'Error fetching accepted leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { leadId, realtorId } = body;

    const assignment = await prisma.leadAssignment.create({
      data: {
        lead: { connect: { id: leadId } },
        realtor: { connect: { id: realtorId } },
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error('Error assigning lead:', error);
    return NextResponse.json({ error: 'Error assigning lead' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { realtorId, isActive } = body;

    const updatedRealtor = await prisma.realtor.update({
      where: { id: realtorId },
      data: { isActive },
    });

    return NextResponse.json(updatedRealtor);
  } catch (error) {
    console.error('Error updating realtor:', error);
    return NextResponse.json({ error: 'Error updating realtor' }, { status: 500 });
  }
}