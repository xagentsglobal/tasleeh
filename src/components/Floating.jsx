import { Mail, MessageCircle, Phone } from 'lucide-react'
import { EMAIL, PHONE_DISPLAY } from '../content.js'
import { CallLink, SurveyLink } from './links.jsx'
import { StoreBadges } from './Sections.jsx'

const footerNav = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#services', label: 'Services' },
  { href: '#survey-includes', label: 'The survey' },
  { href: '#faq', label: 'FAQ' },
]

export function Footer() {
  const linkClass = 'text-white/85 transition-colors hover:text-amber'
  return (
    <footer className="container-wide pb-28 lg:pb-4">
      <div className="overflow-hidden rounded-[var(--radius-card)] bg-navy-deep text-white">
        <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,5fr)_repeat(3,minmax(0,2fr))] lg:gap-10 lg:py-20">
          <div>
            <img
              src="/brand/logo-tasleeh-white.webp"
              alt="TASLEEH Facilities Management"
              width="442"
              height="131"
              loading="lazy"
              decoding="async"
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-[22rem] text-mist">
              TASLEEH Facilities Management · Part of Tiger Holding. Marina Pinnacle, Floor 28, Office 2801, Dubai.
            </p>
            <SurveyLink label="footer" className="btn btn-primary on-navy mt-8">
              Book a survey
            </SurveyLink>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-amber uppercase">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <CallLink location="footer" className={`inline-flex items-center gap-2 ${linkClass}`}>
                  <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  {PHONE_DISPLAY}
                </CallLink>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={`inline-flex items-center gap-2 ${linkClass}`}>
                  <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-[0.12em] text-amber uppercase">On this page</h2>
            <ul className="mt-5 space-y-3">
              {footerNav.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-amber uppercase">TASLEEH app</h2>
            <StoreBadges className="mt-5 flex-col items-start" />
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page flex flex-col gap-4 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} TASLEEH Facilities Management · Part of Tiger Holding</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href="https://tasleeh.net/PrivacyPolicy.html" className={linkClass}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://tasleeh.net/terms_en.html" className={linkClass}>
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** Mobile-only bottom bar; shown once the hero has scrolled away and hidden while the form is on screen. */
export function MobileBar({ visible }) {
  return (
    <div
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 rounded-full border border-line bg-white/95 p-1.5 shadow-[0_12px_40px_-12px_rgba(14,42,71,0.45)] backdrop-blur transition-[transform,opacity] duration-300 motion-reduce:transition-none lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[150%] opacity-0'
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="mx-auto grid max-w-[600px] grid-cols-[auto_1fr] gap-1.5">
        <CallLink location="sticky" className="btn btn-secondary px-5">
          <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          Call
        </CallLink>
        <SurveyLink label="sticky" location="mobile_bar" className="btn btn-primary">
          Book a survey
        </SurveyLink>
      </div>
    </div>
  )
}

const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')

/** Ready for a WhatsApp Business number; renders nothing until VITE_WHATSAPP_NUMBER is set. */
export function WhatsAppButton({ raised }) {
  if (!WHATSAPP_NUMBER) return null
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TASLEEH on WhatsApp"
      className={`fixed right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-[bottom] duration-200 hover:bg-amber hover:text-navy lg:bottom-6 ${
        raised ? 'bottom-24' : 'bottom-4'
      }`}
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
    </a>
  )
}
