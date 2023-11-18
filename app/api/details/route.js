import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, phone, country, gender, qualification, email } =
    await req.json();

  const updateUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
      phone,
      country,
      gender,
      qualification,
    },
  });
  return NextResponse.json(updateUser);
}
