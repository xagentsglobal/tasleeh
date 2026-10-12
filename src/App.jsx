import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import {
  About,
  Audience,
  CostOfWaiting,
  CtaBand,
  Faq,
  HowItWorks,
  OccupantApp,
  Services,
  SurveyIncludes,
} from './components/Sections.jsx'
import SurveySection from './components/SurveySection.jsx'
import { Footer, MobileBar, WhatsAppButton } from './components/Floating.jsx'

/** True while the observed element intersects the viewport. */
function useInView(ref) {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return inView
}

export default function App() {
  const heroRef = useRef(null)
  const surveyRef = useRef(null)
  const heroInView = useInView(heroRef)
  const surveyInView = useInView(surveyRef)
  // surveyInView starts true; the bar only matters once the hero has gone, by which point it is accurate.
  const showBar = !heroInView && !surveyInView

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero ref={heroRef} />
        <Audience />
        <CostOfWaiting />
        <HowItWorks />
        <Services />
        <CtaBand />
        <SurveyIncludes />
        <OccupantApp />
        <About />
        <Faq />
        <SurveySection sectionRef={surveyRef} />
      </main>
      <Footer />
      <MobileBar visible={showBar} />
      <WhatsAppButton raised={showBar} />
    </>
  )
}
