interface SoundchartsConfig {
  apiKey: string;
  appId: string;
  baseUrl?: string;
  timeout?: number;
}

export interface Artist {
  uuid: string;
  name: string;
  spotifyId?: string;
  appleMusicId?: string;
  image?: string;
  followers?: number;
}

export interface Track {
  uuid: string;
  title: string;
  isrc?: string;
  upc?: string;
  artists: Array<{ name: string; uuid: string }>;
  releaseDate?: string;
}

export interface StreamingData {
  platform: 'spotify' | 'apple_music' | 'tidal' | 'amazon' | 'youtube' | 'deezer';
  streams: number;
  date: string;
}

export interface RoyaltyEstimate {
  trackUuid: string;
  trackName: string;
  artistName: string;
  isrc?: string;
  platforms: Record<string, number>;
  totalStreams: number;
  estimatedRoyalty: number;
  currency: string;
  confidence: 'high' | 'medium' | 'low';
}

class SoundchartsAPI {
  private apiKey: string;
  private appId: string;
  private baseUrl: string;
  private timeout: number;
  
  constructor(config: SoundchartsConfig) {
    this.apiKey = config.apiKey;
    this.appId = config.appId;
    this.baseUrl = config.baseUrl || 'https://api.soundcharts.com/api/v2';
    this.timeout = config.timeout || 10000; // 10 second timeout
  }
  
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    try {
      const headers: HeadersInit = {
        'x-api-key': this.apiKey,
        'x-app-id': this.appId,
        'Content-Type': 'application/json',
        ...options?.headers,
      };
      console.log(`Making request to: ${this.baseUrl}${endpoint}`);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Soundcharts API error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Soundcharts API error: ${response.status} - ${errorText}`);
      }
      return response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      throw error;
    }
  }
  
  // ...existing code...
  // Search for artist by name
  async searchArtist(query: string): Promise<Artist[]> {
    try {
      console.log(`Searching artist: ${query}`);
      const url = `/artist/search?name=${encodeURIComponent(query)}`;
      const data = await this.request<any>(url);
      console.log('Response data:', data);
      let items = [];
      if (Array.isArray(data)) {
        items = data;
      } else if (data?.items && Array.isArray(data.items)) {
        items = data.items;
      } else if (data?.data && Array.isArray(data.data)) {
        items = data.data;
      } else if (data?.results && Array.isArray(data.results)) {
        items = data.results;
      } else if (data?.artists && Array.isArray(data.artists)) {
        items = data.artists;
      } else {
        console.log('Unknown response format:', data);
        return [];
      }
      return items.map((item: any) => ({
        uuid: item.uuid || item.id,
        name: item.name || item.title,
        spotifyId: item.spotifyId || item.spotify_id,
        appleMusicId: item.appleMusicId || item.apple_music_id,
        image: item.image || item.picture,
        followers: item.followers
      }));
    } catch (error) {
      console.error('Artist search failed:', error);
      return [];
    }
  }
  
  // Get artist details by UUID
  async getArtist(artistUuid: string): Promise<any> {
    return this.request(`/artist/${artistUuid}`);
  }
  
  // Get artist's tracks
  async getArtistTracks(artistUuid: string, limit: number = 50): Promise<Track[]> {
    try {
      const data = await this.request<any>(`/artist/${artistUuid}/tracks?limit=${limit}`);
      
      return data.items?.map((item: any) => ({
        uuid: item.uuid,
        title: item.title,
        isrc: item.isrc,
        upc: item.upc,
        artists: item.artists || [],
        releaseDate: item.releaseDate
      })) || [];
    } catch (error) {
      console.error('Get artist tracks failed:', error);
      return [];
    }
  }
  
  // Get track by ISRC
  async getTrackByIsrc(isrc: string): Promise<Track | null> {
    try {
      const data = await this.request<any>(`/track/isrc/${isrc}`);
      return {
        uuid: data.uuid,
        title: data.title,
        isrc: data.isrc,
        upc: data.upc,
        artists: data.artists || [],
        releaseDate: data.releaseDate
      };
    } catch (error) {
      console.error('Get track by ISRC failed:', error);
      return null;
    }
  }
  
  // Get streaming data for a track
  async getTrackStreams(trackUuid: string, platform?: string): Promise<StreamingData[]> {
    try {
      const platformParam = platform ? `?platform=${platform}` : '';
      const data = await this.request<any>(`/track/${trackUuid}/streams${platformParam}`);
      
      return data.items?.map((item: any) => ({
        platform: item.platform,
        streams: item.value,
        date: item.date
      })) || [];
    } catch (error) {
      console.error('Get track streams failed:', error);
      return [];
    }
  }
  
  // Get track metadata
  async getTrackMetadata(trackUuid: string): Promise<any> {
    return this.request(`/track/${trackUuid}/metadata`);
  }
  
  // Search for track by title and artist
  async searchTrack(title: string, artist?: string): Promise<Track[]> {
    try {
      let query = `title=${encodeURIComponent(title)}`;
      if (artist) {
        query += `&artist=${encodeURIComponent(artist)}`;
      }
      const data = await this.request<any>(`/track/search?${query}`);
      
      return data.items?.map((item: any) => ({
        uuid: item.uuid,
        title: item.title,
        isrc: item.isrc,
        upc: item.upc,
        artists: item.artists || [],
        releaseDate: item.releaseDate
      })) || [];
    } catch (error) {
      console.error('Track search failed:', error);
      return [];
    }
  }
  
  // Get playlist placements for a track
  async getTrackPlaylists(trackUuid: string): Promise<any[]> {
    try {
      const data = await this.request<any>(`/track/${trackUuid}/playlists`);
      return data.items || [];
    } catch (error) {
      console.error('Get track playlists failed:', error);
      return [];
    }
  }
  
  // Estimate royalties based on streaming data
  async estimateRoyalties(trackUuid: string): Promise<RoyaltyEstimate> {
    try {
      const [streams, metadata] = await Promise.all([
        this.getTrackStreams(trackUuid),
        this.getTrackMetadata(trackUuid).catch(() => null)
      ]);
      
      // Average payout rates per stream (USD)
      const rates = {
        spotify: 0.0035,      // $0.0035 per stream
        apple_music: 0.0065,   // $0.0065 per stream
        tidal: 0.0125,         // $0.0125 per stream
        amazon: 0.005,         // $0.005 per stream
        youtube: 0.0015,       // $0.0015 per stream
        deezer: 0.0045,        // $0.0045 per stream
      };
      
      let totalStreams = 0;
      let totalRoyalty = 0;
      const platformStreams: Record<string, number> = {};
      
      // Process streaming data
      for (const item of streams) {
        const platform = item.platform;
        const streamCount = item.streams || 0;
        platformStreams[platform] = (platformStreams[platform] || 0) + streamCount;
        totalStreams += streamCount;
        
        const rate = rates[platform as keyof typeof rates] || 0.003;
        totalRoyalty += streamCount * rate;
      }
      
      // Determine confidence based on data quality
      let confidence: 'high' | 'medium' | 'low' = 'low';
      if (streams.length > 0) {
        confidence = totalStreams > 1000000 ? 'high' : totalStreams > 100000 ? 'medium' : 'low';
      }
      
      return {
        trackUuid,
        trackName: metadata?.title || 'Unknown',
        artistName: metadata?.mainArtist?.name || 'Unknown',
        isrc: metadata?.isrc,
        platforms: platformStreams,
        totalStreams,
        estimatedRoyalty: Math.round(totalRoyalty * 100) / 100,
        currency: 'USD',
        confidence
      };
    } catch (error) {
      console.error('Royalty estimation failed:', error);
      throw error;
    }
  }
  
  // Get chart positions for a track
  async getTrackCharts(trackUuid: string): Promise<any[]> {
    try {
      const data = await this.request<any>(`/track/${trackUuid}/charts`);
      return data.items || [];
    } catch (error) {
      console.error('Get track charts failed:', error);
      return [];
    }
  }
}

// Create a singleton instance with your credentials
export const soundcharts = new SoundchartsAPI({
  appId: process.env.SOUNDCHARTS_APP_ID || '',
  apiKey: process.env.SOUNDCHARTS_API_KEY || '',
  timeout: 15000, // 15 seconds
});

export default soundcharts;
