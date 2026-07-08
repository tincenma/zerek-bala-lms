import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import './App.css'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'

const ASSIGNMENTS = [
  { tag: 'DUE', t: 'Digital basics project', s: 'Submit by Friday' },
  { tag: 'GRADED', t: 'English practice quiz', s: '92% / Reviewed by mentor' },
  { tag: 'NEW', t: 'Career skills module', s: 'Just unlocked' },
  { tag: 'DUE', t: 'Entrepreneurship worksheet', s: 'Due tomorrow' },
  { tag: 'GRADED', t: 'Computer literacy task', s: '88% / 2 comments' },
]

const NOTE_PHRASES = [
  'learn skills you can use in real life',
  'strong courses should be easy to access',
  'practice today, grow tomorrow',
  'mentors turn questions into progress',
]

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  delay?: number
  children: ReactNode
}

type Stat = {
  v: string
  l: string
}

function App() {
  return (
    <div className="landing-page">
      <FadingLoopVideo />
      <CursorGlow />
      <NavBar />
      <main>
        <Hero />
        <Marquee />
        <Courses />
        <Process />
        <Stories />
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>
      <SiteFooter />
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FadingLoopVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const fadingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const fadeSeconds = 0.5
    video.style.opacity = '0'
    video.muted = true
    video.playsInline = true

    const tick = () => {
      const duration = video.duration
      const time = video.currentTime

      if (duration && Number.isFinite(duration)) {
        let opacity = 1
        if (time < fadeSeconds) opacity = time / fadeSeconds
        else if (time > duration - fadeSeconds) opacity = Math.max(0, (duration - time) / fadeSeconds)
        if (!fadingRef.current) video.style.opacity = String(opacity)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const onEnded = () => {
      fadingRef.current = true
      video.style.opacity = '0'
      window.setTimeout(() => {
        try {
          video.currentTime = 0
          void video.play().catch(() => undefined)
        } catch {
          // Some browsers block replay until the user interacts with the page.
        }
        fadingRef.current = false
      }, 100)
    }

    const onLoaded = () => {
      void video.play().catch(() => undefined)
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('loadedmetadata', onLoaded)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [])

  return (
    <div className="video-field" aria-hidden="true">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="fading-video"
      />
      <div className="video-fade" />
    </div>
  )
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const visibleRef = useRef(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const glow = ref.current
    if (!glow) return undefined

    const move = (event: MouseEvent) => {
      glow.style.left = `${event.clientX}px`
      glow.style.top = `${event.clientY}px`
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
    }

    const leave = () => {
      visibleRef.current = false
      setVisible(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" style={{ opacity: visible ? 1 : 0 }} />
}

function RevealLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const wrap = (node: ReactNode, key: string): ReactNode => {
    if (typeof node === 'string') {
      return node.split(/(\s+)/).map((part, index) => {
        if (part.trim() === '') return part

        return (
          <span key={`${key}-${index}`} className="word-reveal">
            <span style={{ animationDelay: `${delay + index * 0.04}s` }}>{part}</span>
          </span>
        )
      })
    }

    if (isValidElement<{ children?: ReactNode }>(node)) {
      return cloneElement(node, { key }, wrap(node.props.children, key))
    }

    return node
  }

  return <>{Children.toArray(children).map((child, index) => wrap(child, `r${index}`))}</>
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const isAlreadyInView = () => {
      const rect = element.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 0
    }

    if (isAlreadyInView()) {
      element.classList.add('is-in')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('is-in')
            observer.unobserve(element)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay ? ` delay-${Math.min(delay, 4)}` : ''
  const classes = `reveal${delayClass}${className ? ` ${className}` : ''}`

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  )
}

function SectionHeader({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string
  title: ReactNode
  kicker?: string
}) {
  return (
    <div className="container">
      <div className="section-intro">
        <Reveal className="eyebrow-row">
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        {kicker ? (
          <Reveal delay={1} className="section-kicker">
            {kicker}
          </Reveal>
        ) : null}
      </div>
      <Reveal delay={1}>
        <h2 className="section-title">{title}</h2>
      </Reveal>
    </div>
  )
}

function NavBar() {
  const items = [
    { label: 'Home', href: '#', active: true },
    { label: 'Courses', href: '#courses' },
    { label: 'How it works', href: '#process' },
    { label: 'Programs', href: '#stories' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className="site-nav animate-fade-down" aria-label="Primary navigation">
      <div className="nav-inner">
        <a href="#" className="brand">
          Zerek Bala
          <sup>{'\u00AE'}</sup>
        </a>
        <ul className="nav-links">
          {items.map((item) => (
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

function Hero() {
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

function Marquee() {
  const words = ['Explore', 'Learn', 'Practice', 'Mentor', 'Certify', 'Grow']
  const row = (
    <div className="marquee-row">
      {words.map((word) => (
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

function Courses() {
  const items = [
    {
      n: '01',
      t: 'Practical Course Catalog',
      d: 'Zerek Bala publishes structured online courses that help learners build useful knowledge and real-world skills.',
      mock: <StudyTimerMock />,
    },
    {
      n: '02',
      t: 'Online Learning Paths',
      d: 'Learners study modules, complete assignments, and move through each course in a clear step-by-step format.',
      mock: <AssignmentsMock />,
    },
    {
      n: '03',
      t: 'Teacher & Mentor Support',
      d: 'Courses can include self-paced study, teacher sessions, mentor feedback, and guided practice when support is needed.',
      mock: <ScheduleMock />,
    },
    {
      n: '04',
      t: 'Progress & Certificates',
      d: 'Participants can track progress, submit work, earn completion proof, and build confidence course by course.',
      mock: <NotesMock />,
    },
  ]

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
        {items.map((item, index) => (
          <Reveal key={item.n} delay={(index % 2) + 1} className="course-item group">
            <div className="course-mock">{item.mock}</div>
            <div className="course-copy">
              <div className="item-number">{item.n}</div>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
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

function Process() {
  const steps = [
    {
      n: 'I',
      t: 'Choose',
      d: 'Browse available courses and choose the learning path that matches your goals, schedule, and current skill level.',
      mock: <GoalsMock />,
    },
    {
      n: 'II',
      t: 'Learn',
      d: 'Learners study online, complete tasks, meet teachers or mentors when needed, and keep moving through a clear path.',
      mock: <PathMock />,
    },
    {
      n: 'III',
      t: 'Grow',
      d: 'Complete modules, earn proof of progress, and use new skills for study, work, personal growth, or team development.',
      mock: <ProgressMock />,
    },
  ]

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
        {steps.map((step, index) => (
          <Reveal key={step.n} delay={index + 1} className="process-item group">
            <div className="process-line">
              <span>{step.n}</span>
              <span className="hairline" />
            </div>
            <div className="process-mock">{step.mock}</div>
            <h3>{step.t}</h3>
            <p>{step.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Stories() {
  const cases = [
    { tag: 'Program 001', t: 'Free learning access for communities.', meta: 'Learners / access', mock: <CaseClockMock /> },
    { tag: 'Program 002', t: 'Structured courses from Zerek Bala.', meta: 'Course catalog / quality', mock: <CaseScoreMock /> },
    { tag: 'Program 003', t: 'Learning tools for teams and partners.', meta: 'Organizations / training', mock: <CaseHomeworkMock /> },
  ]

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
        {cases.map((item, index) => (
          <Reveal key={item.tag} delay={index + 1} className="story-card group">
            <div className="story-mock ui-lift">{item.mock}</div>
            <div className="story-meta">
              <span>{item.tag}</span>
              <span>{item.meta}</span>
            </div>
            <h3>{item.t}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  const quotes = [
    {
      q: 'Accessible courses help learners start building useful skills without waiting for expensive programs or distant institutions.',
      a: 'Learners',
      r: 'Free course access',
      i: 'L',
      mark: 'Accessible learning',
    },
    {
      q: 'Structured modules, assignments, and mentor support make online learning easier to follow from start to finish.',
      a: 'Course team',
      r: 'Learning design',
      i: 'C',
      mark: 'Guided progress',
    },
    {
      q: 'The same platform can support individual learners, community programs, partner organizations, and company training.',
      a: 'Partners',
      r: 'Organizations and teams',
      i: 'P',
      mark: 'Flexible LMS',
    },
  ]

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
        {quotes.map((quote, index) => (
          <Reveal key={quote.q} delay={(index % 3) + 1} className="group">
            <div className="ui-card ui-lift testimonial-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="quote-icon" aria-hidden="true">
                <path d="M9 7H6a3 3 0 0 0-3 3v6h6v-6H6m12 6v-6h-3a3 3 0 0 0-3 3v3h6" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <p className="testimonial-quote">"{quote.q}"</p>
              <div className="testimonial-person">
                <div className="avatar-initial">{quote.i}</div>
                <div>
                  <div className="person-name">{quote.a}</div>
                  <div className="person-role">{quote.r}</div>
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

function FAQ() {
  const items = [
    {
      q: 'Who is the platform for?',
      a: 'Zerek Bala is for learners who want practical online courses, including teenagers, young adults, job seekers, community members, employees, and teams.',
    },
    {
      q: 'Is it free?',
      a: 'Selected courses are available for free so learners can start building skills with fewer barriers. Course availability and access terms may vary by program.',
    },
    {
      q: 'How do courses work?',
      a: 'Learners enroll in a course, study online modules, complete tasks, and receive teacher or mentor support when the course format includes guided learning.',
    },
    {
      q: 'Who creates the courses?',
      a: 'Courses are created and published by Zerek Bala, with a focus on clear structure, practical learning outcomes, and support for learners.',
    },
    {
      q: 'Can organizations use the platform?',
      a: 'Yes. Zerek Bala can support organizations that want online learning, employee training, partner education, or structured courses for their communities.',
    },
  ]

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
          {items.map((item, index) => (
            <Reveal key={item.q} delay={(index % 3) + 1}>
              <details className="faq">
                <summary>
                  <span>{item.q}</span>
                  <span className="plus" />
                </summary>
                <div className="answer">
                  <div className="answer-inner">{item.a}</div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCTA() {
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

function SiteFooter() {
  const cols = [
    { h: 'Platform', links: ['Home', 'Courses', 'Programs', 'Contact'] },
    { h: 'Learning', links: ['Online Modules', 'Assignments', 'Mentors', 'Certificates'] },
    { h: 'Organizations', links: ['Team Training', 'Partner Courses', 'Employee Learning', 'Support'] },
  ]

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
            {cols.map((col, index) => (
              <Reveal key={col.h} delay={index + 1}>
                <div className="eyebrow footer-heading">{col.h}</div>
                <ul>
                  {col.links.map((link) => (
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

function StudyTimerMock() {
  const [progress, setProgress] = useState(0)
  const [seconds, setSeconds] = useState(25 * 60)

  useEffect(() => {
    const total = 25 * 60
    let remaining = total
    const id = window.setInterval(() => {
      remaining -= 1
      if (remaining < 0) remaining = total
      setSeconds(remaining)
      setProgress(1 - remaining / total)
    }, 1000)

    return () => window.clearInterval(id)
  }, [])

  const circumference = 2 * Math.PI * 70
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const shownSeconds = String(seconds % 60).padStart(2, '0')

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">
          <span className="dot pulse-dot" /> In course
        </span>
        <span className="microcopy">Digital Skills</span>
      </div>
      <div className="timer-shell">
        <svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true">
          <circle cx="90" cy="90" r="70" fill="none" strokeWidth="2" className="ring-track" />
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            strokeWidth="2"
            className="ring-active"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform="rotate(-90 90 90)"
            strokeLinecap="round"
          />
        </svg>
        <div className="timer-readout">
          <div>{minutes}:{shownSeconds}</div>
          <span>remaining</span>
        </div>
      </div>
      <div className="card-foot">
        <span>Building your first portfolio / Module 7</span>
        <Equalizer />
      </div>
    </div>
  )
}

function AssignmentsMock() {
  const [start, setStart] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setStart((current) => (current + 1) % ASSIGNMENTS.length), 2600)
    return () => window.clearInterval(id)
  }, [])

  const visible = [0, 1, 2].map((index) => ASSIGNMENTS[(start + index) % ASSIGNMENTS.length])

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">Course tasks / this week</span>
        <span className="microcopy">5 open</span>
      </div>
      <div className="mock-stack">
        {visible.map((item, index) => (
          <div
            key={`${start}-${item.t}`}
            className={`notif ui-row ${index === 0 ? 'row-active' : ''}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <span className={`tag ${item.tag === 'NEW' ? 'tag-dark' : ''}`}>{item.tag}</span>
            <div className="row-main">
              <div>{item.t}</div>
              <span>{item.s}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="card-foot card-foot-bordered">
        <span>Next deadline</span>
        <strong>Tomorrow / 18:00</strong>
      </div>
    </div>
  )
}

function ScheduleMock() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((current) => (current + 1) % 4), 1800)
    return () => window.clearInterval(id)
  }, [])

  const plan = [
    { t: '08:30', l: "Review yesterday's module", done: true },
    { t: '09:00', l: 'Watch module / Digital skills', done: true },
    { t: '15:30', l: 'Practice task / 30 min', done: tick >= 1 },
    { t: '17:00', l: 'Mentor feedback / online', done: tick >= 2 },
    { t: '19:30', l: 'Reflect and plan tomorrow', done: tick >= 3 },
  ]

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">Today / course plan</span>
        <span className="microcopy">{plan.filter((row) => row.done).length}/5</span>
      </div>
      <div className="mock-stack">
        {plan.map((row) => (
          <div key={row.t} className={`ui-row schedule-row ${row.done ? 'done' : ''}`}>
            <div className="time">{row.t}</div>
            <div className="schedule-label">{row.l}</div>
            <div className="check">{row.done ? <CheckIcon /> : null}</div>
          </div>
        ))}
      </div>
      <div className="card-foot card-foot-bordered">
        <span>Streak / 23 days</span>
        <div className="streak-bars" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <span key={index} className={index < 11 ? 'filled' : undefined} />
          ))}
        </div>
      </div>
    </div>
  )
}

function NotesMock() {
  const [phrase, setPhrase] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let index = 0
    const target = NOTE_PHRASES[phrase]
    const id = window.setInterval(() => {
      index += 1
      setTyped(target.slice(0, index))
      if (index >= target.length) {
        window.clearInterval(id)
        window.setTimeout(() => setPhrase((current) => (current + 1) % NOTE_PHRASES.length), 1500)
      }
    }, 55)

    return () => window.clearInterval(id)
  }, [phrase])

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">Note / Digital skills</span>
        <span className="microcopy">Saved</span>
      </div>
      <div className="notes-body">
        <h4>What I learned this week</h4>
        <span className="skeleton-bar w-92" />
        <span className="skeleton-bar w-78" />
        <span className="skeleton-bar w-85" />
        <p className="typed-note">
          {typed}
          <span className="typing-cursor" />
        </p>
        <div className="chip-row">
          <span className="ui-chip">#skills</span>
          <span className="ui-chip">#practice</span>
          <span className="ui-chip">#progress</span>
        </div>
      </div>
      <div className="card-foot card-foot-bordered">
        <span>132 notes this course</span>
        <span>trending up</span>
      </div>
    </div>
  )
}

function GoalsMock() {
  return (
    <div className="ui-card-dark calm-field mock-card">
      <div className="card-topline">
        <span className="microcopy light">Application / live</span>
        <span className="microcopy light meta-dot-row">
          <span className="dot dot-light pulse-dot" />
          Reviewing
        </span>
      </div>
      <div className="wave-bars" aria-hidden="true">
        {Array.from({ length: 42 }).map((_, index) => {
          const height = 0.2 + 0.8 * Math.abs(Math.sin(index * 0.6))
          return (
            <span
              key={index}
              className="eq-bar"
              style={{
                height: `${(height * 100).toFixed(2)}%`,
                animationDelay: `${(index * 0.04).toFixed(2)}s`,
                animationDuration: `${(1.4 + (index % 5) * 0.15).toFixed(2)}s`,
              }}
            />
          )
        })}
      </div>
      <p className="dark-note">"I want practical skills, but I need a clear path and someone to guide me."</p>
    </div>
  )
}

function PathMock() {
  return (
    <div className="ui-card mock-card">
      <div className="card-topline">
        <span className="microcopy">Learning path / active</span>
        <span className="ui-chip">personal</span>
      </div>
      <div className="path-canvas">
        <svg viewBox="0 0 300 200" className="path-svg" aria-hidden="true">
          <g fill="none" stroke="#000" strokeWidth="1" opacity="0.85">
            <rect x="30" y="30" width="80" height="50" rx="4" />
            <rect x="140" y="30" width="60" height="50" rx="4" />
            <rect x="220" y="30" width="55" height="50" rx="4" />
            <rect x="60" y="120" width="75" height="50" rx="4" />
            <rect x="170" y="120" width="85" height="50" rx="4" />
            <path d="M70 80 V100 H170 V120" className="draw-in" />
            <path d="M170 80 V100" className="draw-in delay-path-1" />
            <path d="M247 80 V100 H210 V120" className="draw-in delay-path-2" />
          </g>
          <g fill="#000" fontFamily="Inter, system-ui, sans-serif" fontSize="7">
            <text x="40" y="50">Basics</text>
            <text x="150" y="50">Practice</text>
            <text x="230" y="50">Quiz</text>
            <text x="75" y="140">Project</text>
            <text x="185" y="140">Portfolio</text>
          </g>
        </svg>
      </div>
      <div className="card-foot">
        <span>5 modules / 3 unlocked</span>
        <span>auto-adapted</span>
      </div>
    </div>
  )
}

function ProgressMock() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((current) => (current + 1) % 60), 1000)
    return () => window.clearInterval(id)
  }, [])

  const points = Array.from({ length: 30 })
    .map((_, index) => {
      const x = 10 + index * 9
      const base = 60 - Math.sin((index + tick) * 0.4) * 18 - index * 0.6
      return `${x},${base.toFixed(1)}`
    })
    .join(' ')

  return (
    <div className="ui-card mock-card">
      <div className="card-topline">
        <span className="microcopy">Course progress / 30 days</span>
        <span className="ui-chip">Scores up 38%</span>
      </div>
      <div className="progress-chart">
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={`0,90 ${points} 300,90`} fill="url(#areaG)" />
          <polyline points={points} fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="chart-labels">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 4</span>
        </div>
      </div>
      <div className="metric-grid">
        {[
          { l: 'Study hrs', v: '4.2' },
          { l: 'Avg score', v: '91%' },
          { l: 'Modules', v: '48' },
        ].map((metric) => (
          <div key={metric.l}>
            <strong>{metric.v}</strong>
            <span>{metric.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CaseStatGrid({ stats, tone = 'light' }: { stats: Stat[]; tone?: 'light' | 'dark' }) {
  return (
    <div className={`case-stat-grid ${tone}`}>
      {stats.map((stat) => (
        <div key={stat.l}>
          <strong>{stat.v}</strong>
          <span>{stat.l}</span>
        </div>
      ))}
    </div>
  )
}

function CaseClockMock() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((current) => current + 1), 1500)
    return () => window.clearInterval(id)
  }, [])

  const angle = (tick % 24) * 15 - 90

  return (
    <div className="ui-card case-card">
      <div className="card-topline">
        <span className="microcopy">Learning rhythm</span>
        <span className="microcopy">course / progress</span>
      </div>
      <div className="clock-wrap">
        <svg viewBox="-100 -100 200 200" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, index) => {
            const radian = ((index * 15 - 90) * Math.PI) / 180
            const focus = (index >= 9 && index <= 12) || (index >= 14 && index <= 17)

            return (
              <line
                key={index}
                x1={(Math.cos(radian) * 60).toFixed(3)}
                y1={(Math.sin(radian) * 60).toFixed(3)}
                x2={(Math.cos(radian) * 78).toFixed(3)}
                y2={(Math.sin(radian) * 78).toFixed(3)}
                stroke={focus ? '#000' : 'rgba(0,0,0,0.18)'}
                strokeWidth={focus ? 2 : 1}
                strokeLinecap="round"
              />
            )
          })}
          <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(0,0,0,0.15)" />
          <line
            x1="0"
            y1="0"
            x2={(Math.cos((angle * Math.PI) / 180) * 38).toFixed(3)}
            y2={(Math.sin((angle * Math.PI) / 180) * 38).toFixed(3)}
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="clock-hand"
          />
        </svg>
      </div>
      <CaseStatGrid stats={[{ v: '+2.1h', l: 'focused study / day' }, { v: '-41%', l: 'cramming nights' }]} />
    </div>
  )
}

function CaseScoreMock() {
  const [score, setScore] = useState(58)

  useEffect(() => {
    const id = window.setInterval(() => setScore((current) => (current < 96 ? current + 1 : 58)), 140)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="ui-card-dark calm-field case-card">
      <div className="card-topline">
        <span className="microcopy light">Completion score</span>
        <span className="microcopy light meta-dot-row">
          <span className="dot dot-light pulse-dot" /> active
        </span>
      </div>
      <div className="score-readout">
        <strong>{score}</strong>
        <span>out of 100</span>
      </div>
      <CaseStatGrid stats={[{ v: '+38', l: 'points' }, { v: 'x2.4', l: 'confidence' }]} tone="dark" />
    </div>
  )
}

function CaseHomeworkMock() {
  return (
    <div className="ui-card case-card">
      <div className="card-topline">
        <span className="microcopy">Open tasks / 7wk</span>
        <span className="ui-chip">all clear</span>
      </div>
      <div className="homework-bars" aria-hidden="true">
        {[18, 22, 14, 6, 3, 2, 1].map((value, index) => (
          <div key={index}>
            <span style={{ height: `${value * 4}px`, opacity: 0.2 + index * 0.12 }} />
            <small>W{index + 1}</small>
          </div>
        ))}
      </div>
      <CaseStatGrid stats={[{ v: '0', l: 'overdue this week' }, { v: '23', l: 'day streak' }]} />
    </div>
  )
}

function Equalizer() {
  return (
    <div className="equalizer" aria-hidden="true">
      {[0.3, 0.6, 0.9, 0.5, 0.7, 0.4].map((height, index) => (
        <span key={index} className="eq-bar" style={{ height: `${height * 100}%`, animationDelay: `${index * 0.12}s` }} />
      ))}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.6" aria-hidden="true">
      <path d="M2 5l2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default App
