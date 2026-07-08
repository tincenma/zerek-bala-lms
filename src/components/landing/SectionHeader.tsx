import type { ReactNode } from 'react'
import { Reveal } from './effects'

export function SectionHeader({
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
