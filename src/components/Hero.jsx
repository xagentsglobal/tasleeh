import { forwardRef } from 'react'
import { PHONE_DISPLAY } from '../content.js'
import { CallLink, SurveyLink } from './links.jsx'

const stats = [
  { value: '50 years', label: 'Tiger Holding group experience' },
  { value: '40+', label: 'Projects delivered' },
  { value: '14+', label: 'Key clients' },
  { value: '17', label: 'Services in-house' },
]

const Hero = forwardRef(function Hero(_, ref) {
  return (
    <>
      <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy text-white">
        {/* Mobile/tablet: photo sits behind the copy under a navy overlay. Desktop: photo fills the right half. */}
        <div className="absolute inset-0 -z-10 lg:left-1/2">
          <img
            src="/hero.webp"
            srcSet="/hero-640.webp 640w, /hero.webp 1200w"
            sizes="(min-width: 1024px) 50vw, 100vw"
            width="1200"
            height="900"
            alt="TASLEEH technician inspecting rooftop AC condenser units on a Dubai building"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,42,71,0.88)_0%,rgba(14,42,71,0.94)_100%)] lg:bg-[linear-gradient(90deg,rgba(14,42,71,0.55)_0%,rgba(14,42,71,0)_35%)]"
          />
        </div>

        <div className="container-page">
          <div className="py-16 sm:py-20 lg:w-1/2 lg:py-28 lg:pr-12">
            <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-amber uppercase">Post-summer property survey</p>
            <h1 id="hero-title" className="mt-4 text-[2rem] leading-[1.15] font-bold tracking-tight sm:text-[2.5rem] lg:text-[2.875rem]">
              Planned maintenance for UAE buildings. One contract, one number, every trade.
            </h1>
            <p className="mt-5 max-w-[36rem] text-[1.0625rem] leading-relaxed text-white/90 sm:text-lg">
              Summer has just pushed your AC, electrical and plumbing systems to their limit. We'll walk your property, find
              what it left behind, and hand you a maintenance plan that stops next summer's call-outs before they start.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <SurveyLink label="hero" className="btn btn-primary on-navy w-full sm:w-auto">
                Book a post-summer survey
              </SurveyLink>
              <CallLink
                location="hero"
                className="inline-flex min-h-[44px] items-center justify-center font-semibold text-white underline decoration-1 underline-offset-4 hover:decoration-2 sm:justify-start"
              >
                Or call {PHONE_DISPLAY}
              </CallLink>
            </div>
            <p className="mt-5 text-sm text-mist">For residential, commercial and hospitality buildings in the UAE.</p>
          </div>
        </div>
      </section>

      <section aria-label="TASLEEH in numbers" className="border-b border-line bg-white">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-4 lg:py-12">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col-reverse gap-1 lg:border-l lg:border-line lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <dt className="text-sm leading-snug text-muted">{label}</dt>
                <dd className="text-[1.875rem] leading-none font-bold tracking-tight text-navy sm:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
})

export default Hero
