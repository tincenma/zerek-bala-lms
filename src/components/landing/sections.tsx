import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/useI18n'
import { Reveal, RevealLine } from './effects'
import { ArrowIcon } from './icons'
import {
  AssignmentsMock,
  CaseClockMock,
  CaseHomeworkMock,
  CaseScoreMock,
  GoalsMock,
  NotesMock,
  PathMock,
  ProgressMock,
  ScheduleMock,
  StudyTimerMock,
} from './mocks'
import { SectionHeader } from './SectionHeader'

type HighlightedText = {
  before: string
  emphasis: string
  after?: string
}

const courseMocks = [<StudyTimerMock />, <AssignmentsMock />, <ScheduleMock />, <NotesMock />] as const
const processMocks = [<GoalsMock />, <PathMock />, <ProgressMock />] as const
const programMocks = [<CaseClockMock />, <CaseScoreMock />, <CaseHomeworkMock />] as const
const CONTACT_EMAIL = 'hello@zerekbala.kz'

function renderHighlighted(text: HighlightedText) {
  return (
    <>
      {text.before}
      <em>{text.emphasis}</em>
      {text.after}
    </>
  )
}

function LanguageSwitcher() {
  const { languageOptions, locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement | null>(null)
  const currentOption = languageOptions.find((option) => option.locale === locale) ?? languageOptions[0]

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event: PointerEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div className={`language-switcher${open ? ' open' : ''}`} ref={switcherRef}>
      <button
        type="button"
        className="language-trigger"
        data-locale={locale}
        aria-label={t.nav.languageSelectorLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{currentOption.shortLabel}</span>
        <span className="language-caret" aria-hidden="true" />
      </button>

      {open ? (
        <div className="language-menu" role="menu" aria-label={t.nav.languageSelectorLabel}>
          {languageOptions.map((option) => (
            <button
              key={option.locale}
              type="button"
              data-locale={option.locale}
              role="menuitemradio"
              aria-checked={option.locale === locale}
              className={option.locale === locale ? 'active' : undefined}
              onClick={() => {
                setLocale(option.locale)
                setOpen(false)
              }}
            >
              <span>{option.label}</span>
              <span>{option.shortLabel}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function NavBar() {
  const { t } = useI18n()

  return (
    <nav className="site-nav animate-fade-down" aria-label={t.nav.ariaLabel}>
      <div className="nav-inner">
        <a href="#" className="brand">
          Zerek Bala
          <sup>{'\u00AE'}</sup>
        </a>
        <ul className="nav-links">
          {t.nav.items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={item.active ? 'active' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <LanguageSwitcher />
          <a href="#contact" className="pill-button pill-button-dark nav-cta">
            {t.nav.cta}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </nav>
  )
}

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="hero-section">
      <h1 className="hero-title">
        <RevealLine delay={0.1}>
          {t.hero.title.before}
          <em>{t.hero.title.emphasis}</em>
          {t.hero.title.after}
        </RevealLine>
      </h1>

      <p className="hero-copy animate-fade-rise-delay">{t.hero.copy}</p>

      <a href="#courses" className="pill-button pill-button-dark hero-button animate-fade-rise-delay-2 halo-once">
        {t.hero.cta}
      </a>

      <div className="hero-meta animate-fade-rise-delay-2">
        <span className="meta-dot-row">
          <span className="dot drift" />
          {t.hero.metaAvailable}
        </span>
        <span className="hero-divider">/</span>
        <span className="hero-extra">{t.hero.metaSupport}</span>
      </div>
    </section>
  )
}

export function Marquee() {
  const { t } = useI18n()

  const row = (
    <div className="marquee-row">
      {t.marquee.words.map((word) => (
        <span className="marquee-pair" key={word}>
          <span>{word}</span>
          <span className="marquee-star" aria-hidden="true">
            {'\u2726'}
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee-section animate-fade-rise-delay-2" aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  )
}

export function Courses() {
  const { t } = useI18n()
  const content = t.sections.courses

  return (
    <section id="courses" className="section-pad">
      <SectionHeader eyebrow={content.eyebrow} title={renderHighlighted(content.title)} kicker={content.kicker} />
      <div className="container courses-grid">
        {content.items.map((item, index) => (
          <Reveal key={item.number} delay={(index % 2) + 1} className="course-item group">
            <div className="course-mock">{courseMocks[index]}</div>
            <div className="course-copy">
              <div className="item-number">{item.number}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#contact" className="text-link">
                {content.linkLabel}
                <ArrowIcon />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Process() {
  const { t } = useI18n()
  const content = t.sections.process

  return (
    <section id="process" className="section-pad">
      <SectionHeader eyebrow={content.eyebrow} title={renderHighlighted(content.title)} />
      <div className="container process-grid">
        {content.steps.map((step, index) => (
          <Reveal key={step.number} delay={index + 1} className="process-item group">
            <div className="process-line">
              <span>{step.number}</span>
              <span className="hairline" />
            </div>
            <div className="process-mock">{processMocks[index]}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Stories() {
  const { t } = useI18n()
  const content = t.sections.stories

  return (
    <section id="stories" className="section-pad">
      <SectionHeader eyebrow={content.eyebrow} title={renderHighlighted(content.title)} kicker={content.kicker} />
      <div className="container story-grid">
        {content.items.map((item, index) => (
          <Reveal key={item.tag} delay={index + 1} className="story-card group">
            <div className="story-mock ui-lift">{programMocks[index]}</div>
            <div className="story-meta">
              <span>{item.tag}</span>
              <span>{item.meta}</span>
            </div>
            <h3>{item.title}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Testimonials() {
  const { t } = useI18n()
  const content = t.sections.testimonials

  return (
    <section id="testimonials" className="section-pad">
      <SectionHeader eyebrow={content.eyebrow} title={renderHighlighted(content.title)} />
      <div className="container testimonial-grid">
        {content.items.map((quote, index) => (
          <Reveal key={quote.quote} delay={(index % 3) + 1} className="group">
            <div className="ui-card ui-lift testimonial-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="quote-icon" aria-hidden="true">
                <path
                  d="M9 7H6a3 3 0 0 0-3 3v6h6v-6H6m12 6v-6h-3a3 3 0 0 0-3 3v3h6"
                  stroke="#000"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="testimonial-quote">"{quote.quote}"</p>
              <div className="testimonial-person">
                <div className="avatar-initial">{quote.initial}</div>
                <div>
                  <div className="person-name">{quote.author}</div>
                  <div className="person-role">{quote.role}</div>
                </div>
                <span className="ui-chip">{quote.mark}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function FAQ() {
  const { t } = useI18n()
  const content = t.sections.faq

  return (
    <section id="faq" className="section-pad faq-section">
      <div className="container faq-grid">
        <div>
          <Reveal>
            <span className="eyebrow">{content.eyebrow}</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="faq-title">{renderHighlighted(content.title)}</h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="faq-copy">
              {content.copyBeforeEmail}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              {content.copyAfterEmail}
            </p>
          </Reveal>
        </div>
        <div>
          {content.items.map((item, index) => (
            <Reveal key={item.question} delay={(index % 3) + 1}>
              <details className="faq">
                <summary>
                  <span>{item.question}</span>
                  <span className="plus" />
                </summary>
                <div className="answer">
                  <div className="answer-inner">{item.answer}</div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactCTA() {
  const { t } = useI18n()
  const content = t.sections.contact

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner">
        <Reveal>
          <span className="eyebrow">{content.eyebrow}</span>
        </Reveal>
        <Reveal delay={1}>
          <h2>{renderHighlighted(content.title)}</h2>
        </Reveal>
        <Reveal delay={2}>
          <p>{content.copy}</p>
        </Reveal>
        <Reveal delay={3}>
          <div className="contact-actions">
            <a href="#" className="pill-button pill-button-dark">
              {content.primaryCta}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="pill-button pill-button-light">
              {content.secondaryCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <Reveal className="footer-brand">
            <a href="#" className="brand brand-large">
              Zerek Bala
              <sup>{'\u00AE'}</sup>
            </a>
            <p>{t.footer.description}</p>
          </Reveal>
          <div className="footer-links">
            {t.footer.columns.map((column, index) => (
              <Reveal key={column.heading} delay={index + 1}>
                <div className="eyebrow footer-heading">{column.heading}</div>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="hairline footer-rule" />
        <div className="footer-bottom">
          <div>{'\u00A9'} {t.footer.copyright}</div>
          <div>
            <span>{t.footer.builtFor}</span>
            <span className="meta-dot-row">
              <span className="dot drift" />
              {t.footer.status}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
