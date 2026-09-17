export interface CountdownConfig {
  targetDate: string;        // ISO 8601, e.g. "2027-01-01T00:00:00Z"
  timezone: string;          // IANA, e.g. "America/Mexico_City"
  title: string;
  subtitle: string;
  backgroundImage?: string;
  logo?: string;
  primaryColor: string;      // CSS hex, e.g. "#0057B8"
  secondaryColor: string;
  ctaText: string;
  ctaUrl: string;
  completionMessage: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
