import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { unstable_getServerSession } from 'next-auth/next';

export async function POST(req) {
  const session = await unstable_getServerSession();

  console.log(session);
  const { name, phone, country, gender, qualification } = await req.json();

  const updateUser = await prisma.user.update({
    where: {
      email: session?.user?.email,
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
