import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest): Promise<Response> => {
  const body = await request.json();

  if (
    typeof body === 'object' &&
    body &&
    'productId' in body &&
    typeof body.productId === 'string'
  ) {
    console.log(`Revalidating: ${body.productId}`);
    revalidatePath(`/product/${body.productId}`);
    revalidatePath(`/products`);
    return NextResponse.json({ message: 'OK' }, { status: 201 });
  }

  return NextResponse.json({ message: 'Invalid body' }, { status: 400 });
};
