import { NextResponse } from 'next/server';
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
    
    // Mock data for demonstration - replace with actual Soundcharts API later
    if (type === 'artist') {
      // Simulate artist search results
      const mockArtists = [
        { name: 'Kendrick Lamar', matches: 12, confidence: 'high' },
        { name: 'Jay Rock', matches: 8, confidence: 'high' },
        { name: 'Schoolboy Q', matches: 7, confidence: 'medium' },
        { name: 'SZA', matches: 15, confidence: 'high' }
      ].filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
      
      for (const artist of mockArtists) {
        results.push({
          track: `${artist.name} Catalog`,
          artist: artist.name,
          source: 'Soundcharts Database',
          estimatedAmount: `$${(Math.random() * 10000 + 1000).toFixed(0)}`,
          confidence: artist.confidence,
          streams: `${(Math.random() * 10 + 1).toFixed(1)}M`,
          platforms: 'Spotify, Apple Music, Tidal'
        });
      }
    }
    
    // Check internal database for unclaimed royalties (SQLite compatible)
    const unclaimed = await prisma.unclaimedRoyalty.findMany({
      where: {
        OR: [
          { 
            artistName: { 
              contains: query.toLowerCase() 
            } 
          },
          { 
            writerName: { 
              contains: query.toLowerCase() 
            } 
          }
        ]
      },
      take: 5
    });
    
    for (const item of unclaimed) {
      results.push({
        track: item.trackTitle,
        artist: item.artistName || 'Unknown',
        source: item.source,
        estimatedAmount: `$${item.amount.toLocaleString()}`,
        confidence: item.confidence,
        isrc: item.isrc
      });
    }
    
    // Sort by confidence (high first)
    results.sort((a, b) => {
      const confidenceWeight: Record<string, number> = { high: 3, medium: 2, low: 1 };
      return (confidenceWeight[b.confidence] || 0) - (confidenceWeight[a.confidence] || 0);
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

export async function POST(request: Request) {
  try {
    const { email, searchType, query, resultsFound } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }
    
    // Save lead to database
    const lead = await prisma.lead.create({
      data: {
        email,
        searchType,
        query,
        resultsFound,
        status: 'new'
      }
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Email captured successfully'
    });
    
  } catch (error) {
    console.error('Email capture failed:', error);
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    );
  }
}