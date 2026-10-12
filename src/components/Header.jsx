import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { PHONE_DISPLAY } from '../content.js'
import { CallLink, SurveyLink } from './links.jsx'

const nav = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#services', label: 'Services' },
  { href: '#survey-includes', label: 'The survey' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-3 rounded-full border bg-white/90 pr-2 pl-4 backdrop-blur-md transition-[border-color,box-shadow] duration-300 sm:pl-6 ${
          scrolled ? 'border-line shadow-[0_10px_30px_-18px_rgba(14,42,71,0.45)]' : 'border-transparent'
        }`}
      >
        <a href="#top" className="shrink-0 rounded-md" aria-label="TASLEEH Facilities Management, back to top">
          <img
            src="/brand/logo-tasleeh.webp"
            alt="TASLEEH Facilities Management"
            width="442"
            height="131"
            className="h-8 w-auto sm:h-10"
          />
        </a>

        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
            {nav.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-full px-4 py-2 text-[0.9375rem] font-medium text-navy transition-colors hover:bg-concrete"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <CallLink
            location="header"
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="inline-flex h-[52px] min-w-[44px] items-center justify-center gap-2 rounded-full px-0 font-semibold text-navy transition-colors hover:bg-concrete sm:px-4"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-concrete">
              <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </CallLink>
          <SurveyLink label="sticky" location="header" className="btn btn-primary px-4 text-[0.9375rem] sm:px-6">
            Book a survey
          </SurveyLink>
        </div>
      </div>
    </header>
  )
}
