import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  // Direct access - no try/catch to see the exact error
  console.log('Params received:', params);
  
  if (!params?.uuid) {
    return NextResponse.json(
      { error: 'No UUID provided', params },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    uuid: params.uuid,
    message: 'Artist API is working'
  });
}
