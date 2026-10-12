import { Phone } from 'lucide-react'
import { PHONE_DISPLAY } from '../content.js'
import { CallLink, SurveyLink } from './links.jsx'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container-page flex h-[72px] items-center justify-between gap-3">
        <a href="#top" className="shrink-0 rounded" aria-label="TASLEEH Facilities Management, back to top">
          <img src="/logo-tasleeh.svg" alt="TASLEEH Facilities Management" width="160" height="40" className="h-9 w-auto sm:h-10" />
        </a>
        <div className="flex items-center gap-2 sm:gap-5">
          <CallLink
            location="header"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg font-semibold text-navy hover:underline"
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </CallLink>
          <SurveyLink label="sticky" location="header" className="btn btn-primary px-4 text-[0.9375rem] sm:px-6 sm:text-base">
            Book a survey
          </SurveyLink>
        </div>
      </div>
    </header>
  )
}
