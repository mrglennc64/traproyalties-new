export type SeverityType = "HIGH" | "MEDIUM" | "LOW";

export interface RoyaltyIssue {
  type: string;
  track: string;
  artist: string;
  issue: string;
  severity: SeverityType;
  amount: number;
  fix: string;
}

export interface RoyaltyResult {
  totalMissing: number;
  issues: RoyaltyIssue[];
}

export function analyzeRoyalties(data: any[]): RoyaltyResult {
  const issues: RoyaltyIssue[] = [];
  let totalMissing = 0;

  for (const item of data) {
    // Calculate amount (example logic)
    const amount = item.estimatedValue || Math.floor(Math.random() * 10000);
    totalMissing += amount;

    // Determine severity with proper typing
    let severity: SeverityType = "LOW";
    if (amount > 10000) severity = "HIGH";
    else if (amount > 5000) severity = "MEDIUM";

    issues.push({
      type: item.type || "missing_royalty",
      track: item.track || "Unknown Track",
      artist: item.artist || "Unknown Artist",
      issue: item.issue || "Potential unclaimed royalties detected",
      severity,
      amount,
      fix: item.fix || "Register with PRO"
    });
  }

  // Sort by severity (HIGH first)
  issues.sort((a, b) => {
    const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return {
    totalMissing,
    issues
  };
}