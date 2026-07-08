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
import { VIDEO_URL } from '../../data/landingContent'

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  delay?: number
  children: ReactNode
}

export function FadingLoopVideo() {
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
      <video ref={videoRef} src={VIDEO_URL} autoPlay muted playsInline preload="auto" className="fading-video" />
      <div className="video-fade" />
    </div>
  )
}

export function CursorGlow() {
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

export function RevealLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
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

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
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
