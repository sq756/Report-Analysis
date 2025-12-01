export enum Severity {
  CRITICAL = 'Critical',
  MAJOR = 'Major',
  MINOR = 'Minor',
  INFO = 'Info'
}

export interface ReviewItem {
  id: string;
  page: number | string;
  location: string;
  issue: string;
  suggestion: string;
  severity: Severity;
  category: 'Format' | 'Language' | 'Logic' | 'Citation' | 'Image';
  status: 'open' | 'resolved';
}

export interface Stats {
  criticalCount: number;
  majorCount: number;
  minorCount: number;
  totalIssues: number;
  resolvedCount: number;
}