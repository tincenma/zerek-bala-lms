import { createContext } from 'react'
import { LANGUAGE_OPTIONS, type Locale } from './config'
import type { LandingMessages } from './locales/en'

export type I18nContextValue = {
  locale: Locale
  languageOptions: typeof LANGUAGE_OPTIONS
  setLocale: (locale: Locale) => void
  t: LandingMessages
}

export const I18nContext = createContext<I18nContextValue | undefined>(undefined)
