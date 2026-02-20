/**
 * Frontend service for Soundcharts API integration
 * Calls your backend which securely uses Soundcharts SDK
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface TrackVerification {
  isrc: string;
  verified: boolean;
  confidence: number;
  soundcharts_streams: number;
  reported_streams: number;
  difference: number;
  estimated_missing: number;
  platform_breakdown: Record<string, number>;
}

export interface CatalogVerification {
  total_tracks_verified: number;
  total_missing_royalties: number;
  tracks: TrackVerification[];
}

export class SoundchartsService {
  
  /**
   * Search for an artist by name
   */
  async searchArtist(artistName: string) {
    const response = await fetch(`${API_BASE}/api/soundcharts/search/artist/${encodeURIComponent(artistName)}`);
    if (!response.ok) throw new Error('Failed to search artist');
    return response.json();
  }

  /**
   * Get artist metadata
   */
  async getArtistMetadata(artistUuid: string) {
    const response = await fetch(`${API_BASE}/api/soundcharts/artist/${artistUuid}/metadata`);
    if (!response.ok) throw new Error('Failed to get artist metadata');
    return response.json();
  }

  /**
   * Get artist streaming data
   */
  async getArtistStreams(artistUuid: string, platform: string = 'spotify', days: number = 90) {
    const response = await fetch(
      `${API_BASE}/api/soundcharts/artist/${artistUuid}/streams/${platform}?days=${days}`
    );
    if (!response.ok) throw new Error('Failed to get streaming data');
    return response.json();
  }

  /**
   * Verify a single track's earnings
   */
  async verifyTrack(isrc: string, reportedEarnings: number = 0): Promise<TrackVerification> {
    const response = await fetch(
      `${API_BASE}/api/soundcharts/verify/track/${isrc}?reported_earnings=${reportedEarnings}`
    );
    if (!response.ok) throw new Error('Failed to verify track');
    return response.json();
  }

  /**
   * Verify entire catalog (Mogul-style audit)
   */
  async verifyCatalog(tracks: Array<{ isrc: string; reported_earnings: number }>): Promise<CatalogVerification> {
    const response = await fetch(`${API_BASE}/api/soundcharts/verify/catalog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tracks }),
    });
    if (!response.ok) throw new Error('Failed to verify catalog');
    return response.json();
  }
}

export const soundchartsApi = new SoundchartsService();
