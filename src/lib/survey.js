import { trackCtaClick } from './analytics.js'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Click handler factory for every "Book a survey" link. The links are plain
 * href="#survey" anchors so they work without JS; with JS we track the click,
 * scroll to the form and move focus to its first field.
 */
export function goToSurvey(label, location) {
  return (event) => {
    trackCtaClick(label, location)
    const target = document.getElementById('survey')
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    const focusable = target.querySelector('input:not([type=hidden]), a, button') || target
    // Wait for the scroll to settle so focusing does not jump the page.
    window.setTimeout(() => focusable.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 500)
    if (window.location.hash !== '#survey') window.history.replaceState(null, '', '#survey')
  }
}
