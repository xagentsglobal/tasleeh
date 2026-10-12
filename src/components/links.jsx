import { PHONE_TEL } from '../content.js'
import { trackCallClick } from '../lib/analytics.js'
import { goToSurvey } from '../lib/survey.js'

/** Anchor to the survey form. Works as a plain link without JS. */
export function SurveyLink({ label, location, className, children }) {
  return (
    <a href="#survey" onClick={goToSurvey(label, location)} className={className}>
      {children}
    </a>
  )
}

/** Click-to-call link for 800 222 333. */
export function CallLink({ location, className, children, ...rest }) {
  return (
    <a href={PHONE_TEL} onClick={() => trackCallClick(location)} className={className} {...rest}>
      {children}
    </a>
  )
}

/** Amber tick used in checklists. Pass onNavy for navy backgrounds. */
export function Tick({ onNavy = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-5 w-5 shrink-0 ${onNavy ? 'text-amber' : 'text-amber-dark'} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
