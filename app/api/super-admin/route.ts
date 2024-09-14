import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Same as admin GET
}

export async function POST(req: NextRequest) {
  // Same as admin POST
}

export async function PUT(req: NextRequest) {
  // Same as admin PUT
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get('model');
    const id = searchParams.get('id');

    if (!model || !id) {
      return NextResponse.json({ error: 'Model and ID are required' }, { status: 400 });
    }

    let result;
    switch (model) {
      case 'users':
        result = await prisma.user.delete({ where: { id } });
        break;
      case 'leads':
        result = await prisma.lead.delete({ where: { id } });
        break;
      case 'realtors':
        result = await prisma.realtor.delete({ where: { id } });
        break;
      default:
        return NextResponse.json({ error: 'Invalid model specified' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({ error: 'Error deleting data' }, { status: 500 });
  }
}