import { ArrowUpRight } from 'lucide-react'
import { PHONE_TEL } from '../content.js'
import { photoProps } from '../images.js'
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

/** Primary CTA with the round arrow chip used across the page. */
export function SurveyButton({ label, location, className = '', children }) {
  return (
    <SurveyLink label={label} location={location} className={`btn btn-primary pr-2 ${className}`}>
      <span className="pr-1">{children}</span>
      <span className="btn-icon mr-0" aria-hidden="true">
        <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.25} />
      </span>
    </SurveyLink>
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

/** Responsive photo from src/images.js. Lazy unless `priority`. */
export function Photo({ name, sizes, priority = false, className = '' }) {
  const { alt, ...props } = photoProps(name)
  return (
    <img
      {...props}
      alt={alt}
      sizes={sizes}
      loading={priority ? undefined : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
    />
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

/** Small rounded section label: index number + name. */
export function Eyebrow({ index, children, dark = false, className = '' }) {
  return (
    <p className={`eyebrow ${dark ? 'eyebrow-dark' : ''} ${className}`}>
      <span aria-hidden="true">{index}</span>
      <span>{children}</span>
    </p>
  )
}
