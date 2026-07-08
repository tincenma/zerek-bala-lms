import {
  COURSE_ITEMS,
  FAQ_ITEMS,
  FOOTER_COLUMNS,
  MARQUEE_WORDS,
  NAV_ITEMS,
  PROCESS_STEPS,
  PROGRAM_ITEMS,
  TESTIMONIALS,
} from '../../data/landingContent'
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

const courseMocks = [<StudyTimerMock />, <AssignmentsMock />, <ScheduleMock />, <NotesMock />] as const
const processMocks = [<GoalsMock />, <PathMock />, <ProgressMock />] as const
const programMocks = [<CaseClockMock />, <CaseScoreMock />, <CaseHomeworkMock />] as const

export function NavBar() {
  return (
    <nav className="site-nav animate-fade-down" aria-label="Primary navigation">
      <div className="nav-inner">
        <a href="#" className="brand">
          Zerek Bala
          <sup>{'\u00AE'}</sup>
        </a>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={item.active ? 'active' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="pill-button pill-button-dark nav-cta">
          Explore Courses
          <ArrowIcon />
        </a>
      </div>
    </nav>
  )
}

export function Hero() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        <RevealLine delay={0.1}>
          {'Learn practical '}
          <em>skills</em>
          {' online.'}
        </RevealLine>
      </h1>

      <p className="hero-copy animate-fade-rise-delay">
        Zerek Bala is an online learning platform with accessible courses, structured modules, assignments, and
        teacher or mentor support. Learn at your own pace and build knowledge you can use in real life.
      </p>

      <a href="#courses" className="pill-button pill-button-dark hero-button animate-fade-rise-delay-2 halo-once">
        Explore Free Courses
      </a>

      <div className="hero-meta animate-fade-rise-delay-2">
        <span className="meta-dot-row">
          <span className="dot drift" />
          Free courses available
        </span>
        <span className="hero-divider">/</span>
        <span className="hero-extra">Online learning with mentor support</span>
      </div>
    </section>
  )
}

export function Marquee() {
  const row = (
    <div className="marquee-row">
      {MARQUEE_WORDS.map((word) => (
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
  return (
    <section id="courses" className="section-pad">
      <SectionHeader
        eyebrow="- Platform"
        title={
          <>
            Courses designed <em>for practical growth.</em>
          </>
        }
        kicker="Structured learning. Real support."
      />
      <div className="container courses-grid">
        {COURSE_ITEMS.map((item, index) => (
          <Reveal key={item.number} delay={(index % 2) + 1} className="course-item group">
            <div className="course-mock">{courseMocks[index]}</div>
            <div className="course-copy">
              <div className="item-number">{item.number}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#contact" className="text-link">
                Learn more
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
  return (
    <section id="process" className="section-pad">
      <SectionHeader
        eyebrow="- How it works"
        title={
          <>
            Three steps from <em>course to confidence.</em>
          </>
        }
      />
      <div className="container process-grid">
        {PROCESS_STEPS.map((step, index) => (
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
  return (
    <section id="stories" className="section-pad">
      <SectionHeader
        eyebrow="- Programs"
        title={
          <>
            Learning for individuals, <em>teams, and communities.</em>
          </>
        }
        kicker="Flexible learning for different goals."
      />
      <div className="container story-grid">
        {PROGRAM_ITEMS.map((item, index) => (
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
  return (
    <section id="testimonials" className="section-pad">
      <SectionHeader
        eyebrow="- Platform Value"
        title={
          <>
            Built for learners <em>and organizations.</em>
          </>
        }
      />
      <div className="container testimonial-grid">
        {TESTIMONIALS.map((quote, index) => (
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
  return (
    <section id="faq" className="section-pad faq-section">
      <div className="container faq-grid">
        <div>
          <Reveal>
            <span className="eyebrow">- Questions</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="faq-title">
              Things learners and organizations <em>often ask.</em>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="faq-copy">
              Anything missing? Write to us at{' '}
              <a href="mailto:hello@zerekbala.kz">hello@zerekbala.kz</a>.
            </p>
          </Reveal>
        </div>
        <div>
          {FAQ_ITEMS.map((item, index) => (
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
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner">
        <Reveal>
          <span className="eyebrow">- Begin</span>
        </Reveal>
        <Reveal delay={1}>
          <h2>
            Your next skill is <em>one course away.</em>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p>Explore accessible online courses, learn with structure, and get support when guidance matters.</p>
        </Reveal>
        <Reveal delay={3}>
          <div className="contact-actions">
            <a href="#" className="pill-button pill-button-dark">
              Explore Free Courses
            </a>
            <a href="mailto:hello@zerekbala.kz" className="pill-button pill-button-light">
              Talk to us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <Reveal className="footer-brand">
            <a href="#" className="brand brand-large">
              Zerek Bala
              <sup>{'\u00AE'}</sup>
            </a>
            <p>An online learning platform for accessible courses, guided progress, and practical skill development.</p>
          </Reveal>
          <div className="footer-links">
            {FOOTER_COLUMNS.map((column, index) => (
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
          <div>{'\u00A9'} MMXXVI Zerek Bala. All rights reserved.</div>
          <div>
            <span>Built for learners and organizations</span>
            <span className="meta-dot-row">
              <span className="dot drift" />
              Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
