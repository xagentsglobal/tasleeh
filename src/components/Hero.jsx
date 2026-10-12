import { forwardRef } from 'react'
import { Phone } from 'lucide-react'
import { PHONE_DISPLAY } from '../content.js'
import { CallLink, Photo, SurveyButton, Tick } from './links.jsx'

const stats = [
  { value: '50', unit: ' years', label: 'Tiger Holding group experience' },
  { value: '40', unit: '+', label: 'Projects delivered' },
  { value: '14', unit: '+', label: 'Key clients' },
  { value: '17', unit: '', label: 'Services in-house' },
]

const Hero = forwardRef(function Hero(_, ref) {
  return (
    <>
      <section ref={ref} aria-labelledby="hero-title" className="container-wide pt-3">
        <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-navy text-white">
          <Photo
            name="hero"
            priority
            sizes="(min-width: 1400px) 1376px, 100vw"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          {/* The one permitted gradient: hero image overlay for legibility. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,29,51,0.55)_0%,rgba(9,29,51,0.72)_45%,rgba(9,29,51,0.95)_100%)] lg:bg-[linear-gradient(90deg,rgba(9,29,51,0.94)_0%,rgba(9,29,51,0.78)_42%,rgba(9,29,51,0.15)_80%)]"
          />

          <div className="grid min-h-[620px] items-end gap-10 px-5 pt-28 pb-6 sm:px-10 sm:pb-10 lg:min-h-[700px] lg:grid-cols-[minmax(0,1fr)_340px] lg:px-14 lg:pt-36 lg:pb-14">
            <div className="max-w-[44rem]">
              <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.75rem] font-semibold tracking-[0.14em] text-amber uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
                Post-summer property survey
              </p>
              <h1
                id="hero-title"
                className="mt-6 text-[2.25rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-[3.25rem] lg:text-[4rem]"
              >
                Planned maintenance for UAE buildings.{' '}
                <span className="text-white/75">One contract, one number, every trade.</span>
              </h1>
              <p className="mt-6 max-w-[36rem] text-[1.0625rem] leading-relaxed text-white/85 sm:text-lg">
                Summer has just pushed your AC, electrical and plumbing systems to their limit. We'll walk your property, find
                what it left behind, and hand you a maintenance plan that stops next summer's call-outs before they start.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <SurveyButton label="hero" className="on-navy w-full sm:w-auto">
                  Book a post-summer survey
                </SurveyButton>
                <CallLink
                  location="hero"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full font-semibold text-white underline decoration-1 underline-offset-[6px] hover:decoration-2 sm:justify-start"
                >
                  <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
                  Or call {PHONE_DISPLAY}
                </CallLink>
              </div>
              <p className="mt-5 text-sm text-mist">For residential, commercial and hospitality buildings in the UAE.</p>
            </div>

            {/* Glass summary card, echoing the reference's floating panels */}
            <div className="glass hidden rounded-[var(--radius-tile)] p-6 lg:block">
              <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-amber uppercase">The survey</p>
              <ul className="mt-4 space-y-3 text-[0.9375rem] text-white">
                {['No charge, no obligation', 'One point of contact', 'Part of Tiger Holding'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Tick onNavy />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="TASLEEH in numbers" className="container-page">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-4 lg:py-20">
          {stats.map(({ value, unit, label }) => (
            <div key={label} className="flex flex-col-reverse justify-end gap-2 border-l border-line pl-5 sm:pl-6">
              <dt className="max-w-[12rem] text-sm leading-snug text-muted">{label}</dt>
              <dd className="text-[2.75rem] leading-none font-semibold tracking-[-0.04em] text-navy lg:text-[3.75rem]">
                {value}
                <span className={unit === '+' ? 'text-amber-dark' : 'text-[0.4em] font-medium tracking-normal text-muted'}>
                  {unit}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
})

export default Hero
