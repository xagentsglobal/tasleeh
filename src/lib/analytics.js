// Thin wrappers around the tags bootstrapped in index.html. Every call is a
// no-op when a tag is not configured, so the page works with tracking off.

const LINKEDIN_CONVERSION_ID = import.meta.env.VITE_LINKEDIN_CONVERSION_ID

function gaEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

/** label: hero | band | faq | footer | sticky. location distinguishes the sticky header from the mobile bar. */
export function trackCtaClick(label, location) {
  gaEvent('cta_click', { label, ...(location && { location }) })
}

export function trackCallClick(location) {
  gaEvent('call_click', { location })
}

export function trackFormStart() {
  gaEvent('form_start')
}

export function trackFormSubmitSuccess({ property_type, role }) {
  gaEvent('form_submit_success', { property_type, role })
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead')
  if (typeof window.lintrk === 'function' && LINKEDIN_CONVERSION_ID) {
    window.lintrk('track', { conversion_id: Number(LINKEDIN_CONVERSION_ID) })
  }
}
