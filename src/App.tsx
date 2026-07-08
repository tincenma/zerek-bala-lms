import './App.css'
import { CursorGlow, FadingLoopVideo } from './components/landing/effects'
import {
  ContactCTA,
  Courses,
  FAQ,
  Hero,
  Marquee,
  NavBar,
  Process,
  SiteFooter,
  Stories,
  Testimonials,
} from './components/landing/sections'

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

export default App
