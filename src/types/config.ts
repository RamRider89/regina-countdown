import { Locale, LocalizedString } from '../i18n/translations';

export type { Locale, LocalizedString };

export interface Participant {
  name: string;
  avatar?: string;
}

export interface VacationTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface TimezoneEntry {
  label: string;
  tz: string;
}

export interface VacationConfig {
  tripName: LocalizedString;
  subtitle: LocalizedString;
  departureDate: string;       // ISO 8601
  timezone: string;
  language?: Locale;
  timezones?: TimezoneEntry[];
  destination: string;
  destinationImage?: string;
  participants: Participant[];
  theme: VacationTheme;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundVideoMobile?: string;
  stickers?: string[];
  gallery?: string[];
  completionMessage: LocalizedString;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
