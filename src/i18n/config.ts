export const SUPPORTED_LOCALES = ['ru', 'kk', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ru'
export const LOCALE_STORAGE_KEY = 'zerek-bala-locale'

export const LANGUAGE_OPTIONS: readonly { locale: Locale; shortLabel: string; label: string }[] = [
  { locale: 'ru', shortLabel: 'RU', label: 'Русский' },
  { locale: 'kk', shortLabel: 'KK', label: 'Қазақша' },
  { locale: 'en', shortLabel: 'EN', label: 'English' },
]

export function isLocale(value: string | null): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}
