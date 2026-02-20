import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DiscoveryResult {
  totalMissing: number;
  issues: Array<{
    type: string;
    track: string;
    artist: string;
    issue: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    amount: number;
    fix: string;
  }>;
}

export class RoyaltyDiscoveryService {
  // Step 1: Audit registrations against PRO databases
  async auditRegistrations(userId: string): Promise<DiscoveryResult> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tracks: {
          include: {
            registrations: true,
            earnings: true,
          },
        },
      },
    });

    if (!user) throw new Error('User not found');

    const issues = [];
    let totalMissing = 0;

    for (const track of user.tracks) {
      const pros = ['ASCAP', 'BMI', 'PRS', 'SOCAN'];
      for (const pro of pros) {
        const registered = track.registrations.some(
          (r: any) => r.pro === pro && r.status === 'REGISTERED'
        );
        if (!registered) {
          const estimatedAmount = this.estimateMissingRoyalties(track, pro);
          totalMissing += estimatedAmount;
          issues.push({
            type: 'MISSING_REGISTRATION',
            track: track.title,
            artist: track.artist,
            issue: `Not registered with ${pro}`,
            severity: 'HIGH',
            amount: estimatedAmount,
            fix: `Register with ${pro} immediately`,
          });
        }
      }
      // Check for metadata errors
      const metadataIssues = this.checkMetadata(track);
      issues.push(...metadataIssues);
      // Check for split mismatches
      const splitIssues = await this.checkSplits(track);
      issues.push(...splitIssues);
    }
    return {
      totalMissing,
      issues: issues.sort((a, b) =>
        a.severity === 'HIGH' ? -1 : b.severity === 'HIGH' ? 1 : 0
      ),
    };
  }

  // Step 2: Check metadata quality
  private checkMetadata(track: any) {
    const issues = [];
    if (!track.isrc) {
      issues.push({
        type: 'METADATA_ERROR',
        track: track.title,
        artist: track.artist,
        issue: 'Missing ISRC code',
        severity: 'HIGH',
        amount: 0,
        fix: 'Add ISRC code',
      });
    }
    if (!track.iswc) {
      issues.push({
        type: 'METADATA_ERROR',
        track: track.title,
        artist: track.artist,
        issue: 'Missing ISWC (composition ID)',
        severity: 'MEDIUM',
        amount: 0,
        fix: 'Register composition to get ISWC',
      });
    }
    if (track.artists.length === 0) {
      issues.push({
        type: 'METADATA_ERROR',
        track: track.title,
        artist: track.artist,
        issue: 'No featured artists listed',
        severity: 'LOW',
        amount: 0,
        fix: 'Add all contributors',
      });
    }
    return issues;
  }

  // Step 3: Check for split mismatches
  private async checkSplits(track: any) {
    // This would check against your split sheets
    // For now, return mock data
    if (track.title === 'Summer Nights') {
      return [{
        type: 'SPLIT_MISMATCH',
        track: track.title,
        artist: track.artist,
        issue: 'Producer Baby Keem missing 30% split',
        severity: 'HIGH',
        amount: 8200,
        fix: 'Add producer to split sheet',
      }];
    }
    return [];
  }

  // Estimate missing royalties based on track performance
  private estimateMissingRoyalties(track: any, pro: string): number {
    // This would use real earnings data
    // For demo, return estimated amounts
    const earnings = track.earnings || [];
    const totalEarned = earnings.reduce((sum: number, e: any) => sum + e.amount, 0);
    // Estimate that missing PRO registration costs ~30% of earnings
    return Math.round(totalEarned * 0.3);
  }

  // Step 4: Match with MLC (Mechanical Licensing Collective)
  async matchWithMLC(trackId: string) {
    // This would call MLC API to match compositions with recordings
    // For demo, return mock
    return {
      matched: true,
      confidence: 0.95,
      mlcId: 'MLC-' + Math.random().toString(36).slice(2),
    };
  }

  // Step 5: Generate actionable fixes
  async generateFixPlan(userId: string) {
    const audit = await this.auditRegistrations(userId);
    return {
      totalMissing: audit.totalMissing,
      priority: audit.issues.filter(i => i.severity === 'HIGH'),
      quickWins: audit.issues.filter(i => i.severity === 'LOW'),
      steps: audit.issues.map(issue => ({
        action: issue.fix,
        for: `${issue.track} - ${issue.artist}`,
        impact: `$${issue.amount}`,
      })),
    };
  }
}
