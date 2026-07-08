import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LOCALE, LANGUAGE_OPTIONS, LOCALE_STORAGE_KEY, isLocale, type Locale } from './config'
import { I18nContext } from './I18nContext'
import { messages } from './messages'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  try {
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocale(savedLocale)) return savedLocale
  } catch {
    return DEFAULT_LOCALE
  }

  return DEFAULT_LOCALE
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // The site can run without persisted language preference.
    }
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      languageOptions: LANGUAGE_OPTIONS,
      setLocale,
      t: messages[locale],
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
