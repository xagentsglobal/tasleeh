import { MessageCircle, Phone } from 'lucide-react'
import { EMAIL, PHONE_DISPLAY } from '../content.js'
import { CallLink, SurveyLink } from './links.jsx'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy pt-10 pb-28 text-sm text-mist lg:pb-10">
      <div className="container-page flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-white">TASLEEH Facilities Management</span> · Part of Tiger Holding. Marina
            Pinnacle, Floor 28, Office 2801, Dubai.
          </p>
          <p>
            <CallLink location="footer" className="text-white underline-offset-4 hover:underline">
              {PHONE_DISPLAY}
            </CallLink>{' '}
            ·{' '}
            <a href={`mailto:${EMAIL}`} className="text-white underline-offset-4 hover:underline">
              {EMAIL}
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <SurveyLink label="footer" className="font-semibold text-amber underline-offset-4 hover:underline">
            Book a survey
          </SurveyLink>
          <a href="https://tasleeh.net/PrivacyPolicy.html" className="text-white underline-offset-4 hover:underline">
            Privacy Policy
          </a>
          <a href="https://tasleeh.net/terms_en.html" className="text-white underline-offset-4 hover:underline">
            Terms and Conditions
          </a>
        </nav>
      </div>
    </footer>
  )
}

/** Mobile-only bottom bar; shown once the hero has scrolled away and hidden while the form is on screen. */
export function MobileBar({ visible }) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(14,42,71,0.25)] backdrop-blur transition-transform duration-200 motion-reduce:transition-none lg:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="mx-auto grid max-w-[600px] grid-cols-[auto_1fr] gap-3">
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
