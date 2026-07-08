import { useEffect, useState } from 'react'
import {
  ASSIGNMENTS,
  CASE_CLOCK_STATS,
  CASE_HOMEWORK_STATS,
  CASE_SCORE_STATS,
  EQUALIZER_BARS,
  HOMEWORK_BARS,
  NOTE_PHRASES,
  PROGRESS_METRICS,
  SCHEDULE_ITEMS,
  TOTAL_STUDY_SECONDS,
} from '../../data/landingContent'
import { CheckIcon } from './icons'

type CaseStat = Readonly<{
  value: string
  label: string
}>

export function StudyTimerMock() {
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
          <div>
            {minutes}:{shownSeconds}
          </div>
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

export function AssignmentsMock() {
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
            key={`${start}-${item.title}`}
            className={`notif ui-row ${index === 0 ? 'row-active' : ''}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <span className={`tag ${item.tag === 'NEW' ? 'tag-dark' : ''}`}>{item.tag}</span>
            <div className="row-main">
              <div>{item.title}</div>
              <span>{item.meta}</span>
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

export function ScheduleMock() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((current) => (current + 1) % 4), 1800)
    return () => window.clearInterval(id)
  }, [])

  const plan = SCHEDULE_ITEMS.map((row) => ({
    ...row,
    done: row.completedAtTick <= tick,
  }))

  return (
    <div className="ui-card ui-lift mock-card">
      <div className="card-topline">
        <span className="ui-chip">Today / course plan</span>
        <span className="microcopy">{plan.filter((row) => row.done).length}/5</span>
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

export function NotesMock() {
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

export function GoalsMock() {
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

export function PathMock() {
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
            <text x="40" y="50">
              Basics
            </text>
            <text x="150" y="50">
              Practice
            </text>
            <text x="230" y="50">
              Quiz
            </text>
            <text x="75" y="140">
              Project
            </text>
            <text x="185" y="140">
              Portfolio
            </text>
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

export function ProgressMock() {
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
        {PROGRESS_METRICS.map((metric) => (
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
      <CaseStatGrid stats={CASE_CLOCK_STATS} />
    </div>
  )
}

export function CaseScoreMock() {
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
      <CaseStatGrid stats={CASE_SCORE_STATS} tone="dark" />
    </div>
  )
}

export function CaseHomeworkMock() {
  return (
    <div className="ui-card case-card">
      <div className="card-topline">
        <span className="microcopy">Open tasks / 7wk</span>
        <span className="ui-chip">all clear</span>
      </div>
      <div className="homework-bars" aria-hidden="true">
        {HOMEWORK_BARS.map((value, index) => (
          <div key={index}>
            <span style={{ height: `${value * 4}px`, opacity: 0.2 + index * 0.12 }} />
            <small>W{index + 1}</small>
          </div>
        ))}
      </div>
      <CaseStatGrid stats={CASE_HOMEWORK_STATS} />
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
