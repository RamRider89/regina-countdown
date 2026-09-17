export interface VacationTheme {
  primaryColor: string;    // CSS hex
  secondaryColor: string;
  accentColor: string;
}

export interface VacationConfig {
  tripName: string;
  subtitle: string;
  departureDate: string;   // ISO 8601
  timezone: string;
  destination: string;
  participants: string[];
  theme: VacationTheme;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundVideoMobile?: string;
  stickers?: string[];
  gallery?: string[];
  completionMessage: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
