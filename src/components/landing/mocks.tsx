import { useEffect, useState } from 'react'
import { EQUALIZER_BARS, HOMEWORK_BARS, TOTAL_STUDY_SECONDS } from '../../data/landingContent'
import { useI18n } from '../../i18n/useI18n'
import { CheckIcon } from './icons'

type CaseStat = Readonly<{
  value: string
  label: string
}>

export function StudyTimerMock() {
  const { t } = useI18n()
  const [progress, setProgress] = useState(0)
  const [seconds, setSeconds] = useState(TOTAL_STUDY_SECONDS)

  useEffect(() => {
    let remaining = TOTAL_STUDY_SECONDS
    const id = window.setInterval(() => {
      remaining -= 1
      if (remaining < 0) remaining = TOTAL_STUDY_SECONDS
      setSeconds(remaining)
      setProgress(1 - remaining / TOTAL_STUDY_SECONDS)
    }, 1000)

    return () => window.clearInterval(id)
  }, [])

  const circumference = 2 * Math.PI * 70
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const shownSeconds = String(seconds % 60).padStart(2, '0')
  const content = t.mocks.studyTimer

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">
          <span className="dot pulse-dot" /> {content.status}
        </span>
        <span className="microcopy">{content.course}</span>
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
          <div>
            {minutes}:{shownSeconds}
          </div>
          <span>{content.remaining}</span>
        </div>
      </div>
      <div className="card-foot">
        <span>{content.footer}</span>
        <Equalizer />
      </div>
    </div>
  )
}

export function AssignmentsMock() {
  const { t } = useI18n()
  const [start, setStart] = useState(0)
  const content = t.mocks.assignments
  const assignments = content.items

  useEffect(() => {
    const id = window.setInterval(() => setStart((current) => (current + 1) % assignments.length), 2600)
    return () => window.clearInterval(id)
  }, [assignments.length])

  const visible = [0, 1, 2].map((index) => assignments[(start + index) % assignments.length])

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">{content.title}</span>
        <span className="microcopy">{content.openCount}</span>
      </div>
      <div className="mock-stack">
        {visible.map((item, index) => (
          <div
            key={`${start}-${item.title}`}
            className={`notif ui-row ${index === 0 ? 'row-active' : ''}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <span className={`tag ${item.tagTone === 'dark' ? 'tag-dark' : ''}`}>{item.tag}</span>
            <div className="row-main">
              <div>{item.title}</div>
              <span>{item.meta}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="card-foot card-foot-bordered">
        <span>{content.nextDeadline}</span>
        <strong>{content.nextDeadlineValue}</strong>
      </div>
    </div>
  )
}

export function ScheduleMock() {
  const { t } = useI18n()
  const [tick, setTick] = useState(0)
  const content = t.mocks.schedule

  useEffect(() => {
    const id = window.setInterval(() => setTick((current) => (current + 1) % 4), 1800)
    return () => window.clearInterval(id)
  }, [])

  const plan = content.items.map((row) => ({
    ...row,
    done: row.completedAtTick <= tick,
  }))

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">{content.title}</span>
        <span className="microcopy">
          {plan.filter((row) => row.done).length}/{plan.length}
        </span>
      </div>
      <div className="mock-stack">
        {plan.map((row) => (
          <div key={row.time} className={`ui-row schedule-row ${row.done ? 'done' : ''}`}>
            <div className="time">{row.time}</div>
            <div className="schedule-label">{row.label}</div>
            <div className="check">{row.done ? <CheckIcon /> : null}</div>
          </div>
        ))}
      </div>
      <div className="card-foot card-foot-bordered">
        <span>{content.streak}</span>
        <div className="streak-bars" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <span key={index} className={index < 11 ? 'filled' : undefined} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function NotesMock() {
  const { t } = useI18n()
  const [phrase, setPhrase] = useState(0)
  const [typed, setTyped] = useState('')
  const content = t.mocks.notes
  const phrases = content.phrases

  useEffect(() => {
    let index = 0
    const target = phrases[phrase % phrases.length]
    const id = window.setInterval(() => {
      index += 1
      setTyped(target.slice(0, index))
      if (index >= target.length) {
        window.clearInterval(id)
        window.setTimeout(() => setPhrase((current) => (current + 1) % phrases.length), 1500)
      }
    }, 55)

    return () => window.clearInterval(id)
  }, [phrase, phrases])

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">{content.title}</span>
        <span className="microcopy">{content.saved}</span>
      </div>
      <div className="notes-body">
        <h4>{content.heading}</h4>
        <span className="skeleton-bar w-92" />
        <span className="skeleton-bar w-78" />
        <span className="skeleton-bar w-85" />
        <p className="typed-note">
          {typed}
          <span className="typing-cursor" />
        </p>
        <div className="chip-row">
          {content.tags.map((tag) => (
            <span key={tag} className="ui-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="card-foot card-foot-bordered">
        <span>{content.footerNotes}</span>
        <span>{content.footerTrend}</span>
      </div>
    </div>
  )
}

export function GoalsMock() {
  const { t } = useI18n()
  const content = t.mocks.goals

  return (
    <div className="ui-card-dark calm-field mock-card">
      <div className="card-topline">
        <span className="microcopy light">{content.title}</span>
        <span className="microcopy light meta-dot-row">
          <span className="dot dot-light pulse-dot" />
          {content.status}
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
      <p className="dark-note">{content.quote}</p>
    </div>
  )
}

export function PathMock() {
  const { t } = useI18n()
  const content = t.mocks.path

  return (
    <div className="ui-card mock-card">
      <div className="card-topline">
        <span className="microcopy">{content.title}</span>
        <span className="ui-chip">{content.chip}</span>
      </div>
      <div className="path-canvas">
        <svg viewBox="0 0 300 200" className="path-svg" aria-hidden="true">
          <g fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.9">
            <rect x="30" y="30" width="80" height="50" rx="4" />
            <rect x="140" y="30" width="60" height="50" rx="4" />
            <rect x="220" y="30" width="55" height="50" rx="4" />
            <rect x="60" y="120" width="75" height="50" rx="4" />
            <rect x="170" y="120" width="85" height="50" rx="4" />
            <path d="M70 80 V100 H170 V120" className="draw-in" />
            <path d="M170 80 V100" className="draw-in delay-path-1" />
            <path d="M247 80 V100 H210 V120" className="draw-in delay-path-2" />
          </g>
          <g fill="var(--ink)" fontFamily="Inter, system-ui, sans-serif" fontSize="7">
            <text x="40" y="50">
              {content.labels.basics}
            </text>
            <text x="150" y="50">
              {content.labels.practice}
            </text>
            <text x="230" y="50">
              {content.labels.quiz}
            </text>
            <text x="75" y="140">
              {content.labels.project}
            </text>
            <text x="185" y="140">
              {content.labels.portfolio}
            </text>
          </g>
        </svg>
      </div>
      <div className="card-foot">
        <span>{content.footerModules}</span>
        <span>{content.footerMode}</span>
      </div>
    </div>
  )
}

export function ProgressMock() {
  const { t } = useI18n()
  const [tick, setTick] = useState(0)
  const content = t.mocks.progress

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
        <span className="microcopy">{content.title}</span>
        <span className="ui-chip">{content.chip}</span>
      </div>
      <div className="progress-chart">
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={`0,90 ${points} 300,90`} fill="url(#areaG)" />
          <polyline
            points={points}
            fill="none"
            stroke="var(--secondary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="chart-labels">
          {content.chartLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
      <div className="metric-grid">
        {content.metrics.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CaseClockMock() {
  const { t } = useI18n()
  const [tick, setTick] = useState(0)
  const content = t.mocks.caseClock

  useEffect(() => {
    const id = window.setInterval(() => setTick((current) => current + 1), 1500)
    return () => window.clearInterval(id)
  }, [])

  const angle = (tick % 24) * 15 - 90

  return (
    <div className="ui-card case-card">
      <div className="card-topline">
        <span className="microcopy">{content.title}</span>
        <span className="microcopy">{content.status}</span>
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
                stroke={focus ? 'var(--accent)' : 'rgba(67,56,202,0.22)'}
                strokeWidth={focus ? 2 : 1}
                strokeLinecap="round"
              />
            )
          })}
          <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(67,56,202,0.18)" />
          <line
            x1="0"
            y1="0"
            x2={(Math.cos((angle * Math.PI) / 180) * 38).toFixed(3)}
            y2={(Math.sin((angle * Math.PI) / 180) * 38).toFixed(3)}
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="clock-hand"
          />
        </svg>
      </div>
      <CaseStatGrid stats={content.stats} />
    </div>
  )
}

export function CaseScoreMock() {
  const { t } = useI18n()
  const [score, setScore] = useState(58)
  const content = t.mocks.caseScore

  useEffect(() => {
    const id = window.setInterval(() => setScore((current) => (current < 96 ? current + 1 : 58)), 140)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="ui-card-dark calm-field case-card">
      <div className="card-topline">
        <span className="microcopy light">{content.title}</span>
        <span className="microcopy light meta-dot-row">
          <span className="dot dot-light pulse-dot" /> {content.status}
        </span>
      </div>
      <div className="score-readout">
        <strong>{score}</strong>
        <span>{content.label}</span>
      </div>
      <CaseStatGrid stats={content.stats} tone="dark" />
    </div>
  )
}

export function CaseHomeworkMock() {
  const { t } = useI18n()
  const content = t.mocks.caseHomework

  return (
    <div className="ui-card case-card">
      <div className="card-topline">
        <span className="microcopy">{content.title}</span>
        <span className="ui-chip">{content.chip}</span>
      </div>
      <div className="homework-bars" aria-hidden="true">
        {HOMEWORK_BARS.map((value, index) => (
          <div key={index}>
            <span style={{ height: `${value * 4}px`, opacity: 0.2 + index * 0.12 }} />
            <small>
              {content.weekPrefix}
              {index + 1}
            </small>
          </div>
        ))}
      </div>
      <CaseStatGrid stats={content.stats} />
    </div>
  )
}

function CaseStatGrid({ stats, tone = 'light' }: { stats: readonly CaseStat[]; tone?: 'light' | 'dark' }) {
  return (
    <div className={`case-stat-grid ${tone}`}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

function Equalizer() {
  return (
    <div className="equalizer" aria-hidden="true">
      {EQUALIZER_BARS.map((height, index) => (
        <span key={index} className="eq-bar" style={{ height: `${height * 100}%`, animationDelay: `${index * 0.12}s` }} />
      ))}
    </div>
  )
}
