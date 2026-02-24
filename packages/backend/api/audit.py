# audit.py
import asyncio
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any, Tuple
from enum import Enum
import csv
import io
import json
import hashlib
from dataclasses import dataclass
from decimal import Decimal

from prisma import Prisma
from prisma.models import Audit, TrackMatch, Track, User
from prisma.types import AuditCreateInput, TrackMatchCreateInput

# Enums matching Prisma schema
class AuditStatus(str, Enum):
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"

class MatchType(str, Enum):
    EXACT = "EXACT"
    FUZZY = "FUZZY"
    MANUAL = "MANUAL"
    ISRC = "ISRC"
    TITLE_ARTIST = "TITLE_ARTIST"

class PRO(str, Enum):
    ASCAP = "ASCAP"
    BMI = "BMI"
    PRS = "PRS"
    SOCAN = "SOCAN"
    GEMA = "GEMA"
    SACEM = "SACEM"
    JASRAC = "JASRAC"
    APRA = "APRA"
    OTHER = "OTHER"

@dataclass
class RoyaltyRecord:
    """Represents a royalty record from external source"""
    isrc: Optional[str]
    title: str
    artist: str
    pro: PRO
    amount: float
    period: str
    plays: Optional[int] = None
    raw_data: Optional[Dict[str, Any]] = None

class AuditService:
    def __init__(self, db: Prisma):
        self.db = db

    async def create_audit(
        self,
        user_id: str,
        file_name: str,
        records: List[RoyaltyRecord]
    ) -> Audit:
        """Create a new audit and process records"""
        
        # Create audit record
        audit = await self.db.audit.create({
            'user_id': user_id,
            'file_name': file_name,
            'status': AuditStatus.PROCESSING,
            'tracks_scanned': len(records),
            'tracks': {
                'create': []  # Will be populated during processing
            }
        })
        
        try:
            # Process records asynchronously
            asyncio.create_task(self._process_audit(audit.id, records))
            return audit
        except Exception as e:
            # Update audit status to failed if initial processing fails
            await self.db.audit.update(
                where={'id': audit.id},
                data={
                    'status': AuditStatus.FAILED,
                    'completed_at': datetime.now()
                }
            )
            raise e

    async def _process_audit(
        self,
        audit_id: str,
        records: List[RoyaltyRecord]
    ) -> None:
        """Process audit records in background"""
        try:
            matches_found = 0
            total_amount = 0.0
            track_matches = []

            for record in records:
                # Find matching tracks in database
                matched_tracks = await self._find_matching_tracks(record)
                
                if matched_tracks:
                    # Create track matches for each found track
                    for track, match_type in matched_tracks:
                        track_match = await self.db.trackmatch.create({
                            'audit_id': audit_id,
                            'track_id': track.id,
                            'isrc': record.isrc,
                            'title': record.title,
                            'artist': record.artist,
                            'pro': record.pro.value,
                            'match_type': match_type.value,
                            'amount_found': record.amount
                        })
                        track_matches.append(track_match)
                        matches_found += 1
                        total_amount += record.amount
                else:
                    # Create unmatched record
                    track_match = await self.db.trackmatch.create({
                        'audit_id': audit_id,
                        'isrc': record.isrc,
                        'title': record.title,
                        'artist': record.artist,
                        'pro': record.pro.value,
                        'match_type': MatchType.FUZZY.value if self._fuzzy_match_possible(record) else None,
                        'amount_found': record.amount
                    })
                    track_matches.append(track_match)

            # Update audit with results
            await self.db.audit.update(
                where={'id': audit_id},
                data={
                    'matches_found': matches_found,
                    'missing_amount': total_amount - sum(m.amount_found for m in track_matches if m.track_id),
                    'status': AuditStatus.COMPLETED,
                    'completed_at': datetime.now()
                }
            )

        except Exception as e:
            # Log error and update audit status
            print(f"Audit processing failed: {str(e)}")
            await self.db.audit.update(
                where={'id': audit_id},
                data={
                    'status': AuditStatus.FAILED,
                    'completed_at': datetime.now()
                }
            )

    async def _find_matching_tracks(
        self, 
        record: RoyaltyRecord
    ) -> List[Tuple[Track, MatchType]]:
        """Find matching tracks in database"""
        matches = []

        # 1. Try exact ISRC match first
        if record.isrc:
            track = await self.db.track.find_first(
                where={'isrc': record.isrc}
            )
            if track:
                matches.append((track, MatchType.ISRC))

        # 2. Try title + artist exact match
        if not matches:
            tracks = await self.db.track.find_many(
                where={
                    'title': record.title,
                    'artist': record.artist
                }
            )
            for track in tracks:
                matches.append((track, MatchType.EXACT))

        # 3. Try fuzzy matching if no exact matches
        if not matches and self._fuzzy_match_possible(record):
            tracks = await self._fuzzy_match_tracks(record)
            for track in tracks:
                matches.append((track, MatchType.FUZZY))

        return matches

    def _fuzzy_match_possible(self, record: RoyaltyRecord) -> bool:
        """Check if fuzzy matching is possible for this record"""
        return bool(record.title and record.artist)

    async def _fuzzy_match_tracks(
        self,
        record: RoyaltyRecord,
        threshold: float = 0.8
    ) -> List[Track]:
        """Perform fuzzy matching on tracks"""
        # This is a simplified version - you might want to use
        # more sophisticated fuzzy matching algorithms
        all_tracks = await self.db.track.find_many(
            where={
                'OR': [
                    {'title': {'contains': record.title}},
                    {'artist': {'contains': record.artist}}
                ]
            }
        )
        
        matches = []
        for track in all_tracks:
            similarity = self._calculate_similarity(
                f"{track.title} {track.artist}",
                f"{record.title} {record.artist}"
            )
            if similarity >= threshold:
                matches.append(track)
        
        return matches

    def _calculate_similarity(self, str1: str, str2: str) -> float:
        """Calculate similarity between two strings"""
        # Simple implementation - you might want to use
        # libraries like fuzzywuzzy or rapidfuzz
        set1 = set(str1.lower().split())
        set2 = set(str2.lower().split())
        
        if not set1 or not set2:
            return 0.0
            
        intersection = set1.intersection(set2)
        union = set1.union(set2)
        
        return len(intersection) / len(union)

    async def get_audit_summary(self, audit_id: str) -> Dict[str, Any]:
        """Get summary statistics for an audit"""
        audit = await self.db.audit.find_unique(
            where={'id': audit_id},
            include={
                'tracks': True,
                'user': True
            }
        )
        
        if not audit:
            raise ValueError(f"Audit {audit_id} not found")
        
        # Calculate statistics
        matched_tracks = [t for t in audit.tracks if t.track_id]
        unmatched_tracks = [t for t in audit.tracks if not t.track_id]
        
        by_match_type = {}
        for track in audit.tracks:
            if track.match_type:
                by_match_type[track.match_type] = by_match_type.get(track.match_type, 0) + 1
        
        by_pro = {}
        for track in audit.tracks:
            by_pro[track.pro] = by_pro.get(track.pro, 0) + 1
        
        return {
            'id': audit.id,
            'file_name': audit.file_name,
            'status': audit.status,
            'tracks_scanned': audit.tracks_scanned,
            'matches_found': audit.matches_found,
            'missing_amount': audit.missing_amount,
            'created_at': audit.created_at.isoformat(),
            'completed_at': audit.completed_at.isoformat() if audit.completed_at else None,
            'user': {
                'id': audit.user.id,
                'email': audit.user.email,
                'name': audit.user.name
            },
            'statistics': {
                'match_rate': (audit.matches_found / audit.tracks_scanned * 100) if audit.tracks_scanned > 0 else 0,
                'matched_count': len(matched_tracks),
                'unmatched_count': len(unmatched_tracks),
                'by_match_type': by_match_type,
                'by_pro': by_pro
            }
        }

    async def export_audit_results(
        self,
        audit_id: str,
        format: str = 'csv'
    ) -> Tuple[str, str]:
        """Export audit results in specified format"""
        audit = await self.db.audit.find_unique(
            where={'id': audit_id},
            include={
                'tracks': {
                    'include': {
                        'track': True
                    }
                }
            }
        )
        
        if not audit:
            raise ValueError(f"Audit {audit_id} not found")
        
        if format.lower() == 'csv':
            return await self._export_csv(audit)
        elif format.lower() == 'json':
            return await self._export_json(audit)
        else:
            raise ValueError(f"Unsupported format: {format}")

    async def _export_csv(self, audit: Audit) -> Tuple[str, str]:
        """Export audit results as CSV"""
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write headers
        writer.writerow([
            'ISRC', 'Title', 'Artist', 'PRO', 'Amount', 
            'Match Type', 'Matched Track ID', 'Matched Track Title'
        ])
        
        # Write data
        for match in audit.tracks:
            writer.writerow([
                match.isrc or '',
                match.title,
                match.artist,
                match.pro,
                match.amount_found,
                match.match_type or 'UNMATCHED',
                match.track_id or '',
                match.track.title if match.track else ''
            ])
        
        return f"audit_{audit.id}.csv", output.getvalue()

    async def _export_json(self, audit: Audit) -> Tuple[str, str]:
        """Export audit results as JSON"""
        data = {
            'audit_id': audit.id,
            'file_name': audit.file_name,
            'created_at': audit.created_at.isoformat(),
            'completed_at': audit.completed_at.isoformat() if audit.completed_at else None,
            'status': audit.status,
            'summary': {
                'tracks_scanned': audit.tracks_scanned,
                'matches_found': audit.matches_found,
                'missing_amount': audit.missing_amount
            },
            'matches': []
        }
        
        for match in audit.tracks:
            match_data = {
                'isrc': match.isrc,
                'title': match.title,
                'artist': match.artist,
                'pro': match.pro,
                'amount': match.amount_found,
                'match_type': match.match_type,
                'timestamp': match.timestamp.isoformat()
            }
            
            if match.track:
                match_data['matched_track'] = {
                    'id': match.track.id,
                    'title': match.track.title,
                    'artist': match.track.artist,
                    'isrc': match.track.isrc
                }
            
            data['matches'].append(match_data)
        
        return f"audit_{audit.id}.json", json.dumps(data, indent=2)

    async def parse_royalty_file(
        self,
        file_content: str,
        file_type: str,
        pro: PRO
    ) -> List[RoyaltyRecord]:
        """Parse royalty file from PRO/distributor"""
        records = []
        
        if file_type.endswith('.csv'):
            reader = csv.DictReader(io.StringIO(file_content))
            for row in reader:
                # Adjust field names based on PRO format
                record = self._parse_csv_row(row, pro)
                if record:
                    records.append(record)
        
        return records

    def _parse_csv_row(self, row: Dict[str, str], pro: PRO) -> Optional[RoyaltyRecord]:
        """Parse CSV row based on PRO format"""
        try:
            # This is a simplified example - you'll need to adjust
            # based on actual PRO file formats
            return RoyaltyRecord(
                isrc=row.get('ISRC') or row.get('isrc'),
                title=row.get('Title') or row.get('Song Title') or row.get('track_title', ''),
                artist=row.get('Artist') or row.get('Writer') or row.get('artist_name', ''),
                pro=pro,
                amount=float(row.get('Amount') or row.get('Royalty') or row.get('earnings', 0)),
                period=row.get('Period') or row.get('Statement Period') or '',
                plays=int(row.get('Plays') or row.get('Streams') or 0) if row.get('Plays') else None,
                raw_data=row
            )
        except (ValueError, KeyError) as e:
            print(f"Error parsing row: {e}")
            return None

    async def get_user_audits(
        self,
        user_id: str,
        limit: int = 50,
        offset: int = 0,
        status: Optional[AuditStatus] = None
    ) -> List[Audit]:
        """Get audits for a specific user"""
        where = {'user_id': user_id}
        if status:
            where['status'] = status.value
        
        return await self.db.audit.find_many(
            where=where,
            take=limit,
            skip=offset,
            order={'created_at': 'desc'},
            include={
                'tracks': True
            }
        )

    async def delete_audit(self, audit_id: str, user_id: str) -> bool:
        """Delete an audit and its associated matches"""
        # Verify ownership
        audit = await self.db.audit.find_first(
            where={
                'id': audit_id,
                'user_id': user_id
            }
        )
        
        if not audit:
            return False
        
        # Delete audit (cascades to TrackMatch due to relation)
        await self.db.audit.delete(
            where={'id': audit_id}
        )
        
        return True

    async def get_missing_royalties_summary(
        self,
        user_id: str,
        days: int = 90
    ) -> Dict[str, Any]:
        """Get summary of missing royalties from recent audits"""
        cutoff_date = datetime.now() - timedelta(days=days)
        
        # Get all completed audits for user
        audits = await self.db.audit.find_many(
            where={
                'user_id': user_id,
                'status': AuditStatus.COMPLETED.value,
                'created_at': {'gte': cutoff_date}
            },
            include={
                'tracks': {
                    'where': {
                        'track_id': None  # Unmatched tracks
                    }
                }
            }
        )
        
        total_missing = 0
        by_pro = {}
        unmatched_tracks = []
        
        for audit in audits:
            total_missing += audit.missing_amount
            for match in audit.tracks:
                if not match.track_id:  # Unmatched
                    by_pro[match.pro] = by_pro.get(match.pro, 0) + match.amount_found
                    unmatched_tracks.append({
                        'title': match.title,
                        'artist': match.artist,
                        'pro': match.pro,
                        'amount': match.amount_found,
                        'audit_date': audit.created_at.isoformat()
                    })
        
        return {
            'period_days': days,
            'total_missing': total_missing,
            'by_pro': by_pro,
            'unmatched_count': len(unmatched_tracks),
            'unmatched_tracks': unmatched_tracks[:20]  # Top 20
        }

# Example usage
async def main():
    db = Prisma()
    await db.connect()
    
    audit_service = AuditService(db)
    
    # Parse a royalty file
    with open('royalties.csv', 'r') as f:
        content = f.read()
        records = await audit_service.parse_royalty_file(
            content,
            'royalties.csv',
            PRO.ASCAP
        )
    
    # Create audit
    audit = await audit_service.create_audit(
        user_id='user_id_here',
        file_name='royalties.csv',
        records=records
    )
    
    # Wait for processing to complete (in real app, you'd poll or use webhooks)
    await asyncio.sleep(5)
    
    # Get summary
    summary = await audit_service.get_audit_summary(audit.id)
    print(json.dumps(summary, indent=2))
    
    # Export results
    filename, data = await audit_service.export_audit_results(audit.id, 'csv')
    with open(filename, 'w') as f:
        f.write(data)
    
    await db.disconnect()

if __name__ == '__main__':
    asyncio.run(main())