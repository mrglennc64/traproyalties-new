import { NextResponse } from 'next/server';
import { soundcharts } from '@/lib/soundcharts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  try {
    const results: any[] = [];

    if (type === 'artist') {
      const artists = await soundcharts.searchArtist(query);

      if (artists.length > 0) {
        const artist = artists[0];
        const tracks = await soundcharts.getArtistTracks(artist.uuid, 5);

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
