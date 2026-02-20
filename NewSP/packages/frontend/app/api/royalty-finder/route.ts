import { NextResponse } from 'next/server';
import { soundcharts } from '@/lib/soundcharts';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }
  
  try {
    const results = [];
    
    if (type === 'artist') {
      // Search for artist
      const artists = await soundcharts.searchArtist(query);
      
      if (artists.length > 0) {
        // Get first artist's tracks
        const artist = artists[0];
        const tracks = await soundcharts.getArtistTracks(artist.uuid, 5);
        
        // Estimate royalties for each track
        for (const track of tracks) {
          try {
            const royalty = await soundcharts.estimateRoyalties(track.uuid);
            results.push({
              track: royalty.trackName,
              artist: royalty.artistName,
              source: 'Soundcharts Streaming Data',
              estimatedAmount: `$${royalty.estimatedRoyalty.toLocaleString()}`,
              confidence: royalty.confidence,
              isrc: royalty.isrc,
              streams: royalty.totalStreams.toLocaleString(),
              platforms: Object.keys(royalty.platforms).join(', ')
            });
          } catch (e) {
            console.error(`Failed to estimate royalties for track ${track.uuid}:`, e);
          }
        }
      }
    }
    
    // Also check internal database
    const unclaimed = await prisma.unclaimedRoyalty.findMany({
      where: {
        OR: [
          { artistName: { contains: query, mode: 'insensitive' } },
          { writerName: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 5
    });
    
    for (const item of unclaimed) {
      results.push({
        track: item.trackTitle,
        artist: item.artistName,
        source: item.source,
        estimatedAmount: `$${item.amount.toLocaleString()}`,
        confidence: item.confidence,
        isrc: item.isrc
      });
    }
    
    // Sort by confidence (high first)
    results.sort((a, b) => {
      const confidenceWeight = { high: 3, medium: 2, low: 1 };
      return (confidenceWeight[b.confidence as keyof typeof confidenceWeight] || 0) - 
             (confidenceWeight[a.confidence as keyof typeof confidenceWeight] || 0);
    });
    
    return NextResponse.json({
      found: results.length,
      items: results.slice(0, 5)
    });
    
  } catch (error) {
    console.error('Royalty finder error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
