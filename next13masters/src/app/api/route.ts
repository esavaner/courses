import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_request: NextRequest): Promise<Response> => {
  return NextResponse.json('hello');
};
