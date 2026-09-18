import { Locale, LocalizedString } from './translations';

export function localize(value: LocalizedString, locale: Locale): string {
  if (typeof value === 'string') return value;
  return value[locale] ?? value['es'] ?? value['en'] ?? value['ru'] ?? '';
}
