import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get('model');

    let data;
    switch (model) {
      case 'users':
        data = await prisma.user.findMany();
        break;
      case 'leads':
        data = await prisma.lead.findMany();
        break;
      case 'realtors':
        data = await prisma.realtor.findMany();
        break;
      default:
        return NextResponse.json({ error: 'Invalid model specified' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Implement create operations for various models
}

export async function PUT(req: NextRequest) {
  // Implement update operations for various models
}