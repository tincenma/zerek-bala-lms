import { en, type LandingMessages } from './locales/en'
import { kk } from './locales/kk'
import { ru } from './locales/ru'
import type { Locale } from './config'

export const messages: Record<Locale, LandingMessages> = {
  ru,
  kk,
  en,
}
