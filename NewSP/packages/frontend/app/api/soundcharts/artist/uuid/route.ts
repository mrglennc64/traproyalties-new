import { NextResponse } from 'next/server';

// Mock data - same as above
const mockArtists: Record<string, any> = {
  'artist-123': {
    uuid: 'artist-123',
    name: 'Kendrick Lamar',
    image: 'https://i.scdn.co/image/ab6761610000e5eb437b9e4a5846a2456c2b5c0e',
    followers: 15000000,
    tracks: [
      { uuid: 'track-1', title: 'HUMBLE.', isrc: 'USUM71703861' },
      { uuid: 'track-2', title: 'DNA.', isrc: 'USUM71703862' },
      { uuid: 'track-3', title: 'LOYALTY.', isrc: 'USUM71703863' },
      { uuid: 'track-4', title: 'ELEMENT.', isrc: 'USUM71703864' },
    ]
  },
  'artist-456': {
    uuid: 'artist-456',
    name: 'Jay Rock',
    image: 'https://i.scdn.co/image/ab6761610000e5eb1b6f9c8c6e9d4b5f3a2c1d0e',
    followers: 2000000,
    tracks: [
      { uuid: 'track-5', title: 'MIDNIGHT DRIVE', isrc: 'US-TDE-24-00123' },
      { uuid: 'track-6', title: 'VICE CITY', isrc: 'US-TDE-24-00124' },
      { uuid: 'track-7', title: 'ELEMENT.', isrc: 'US-TDE-24-00125' },
    ]
  }
};

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  const artist = mockArtists[params.uuid];
  
  if (!artist) {
    return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
  }

  return NextResponse.json({ artist });
}