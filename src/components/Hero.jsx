import { forwardRef } from 'react'
import { Phone } from 'lucide-react'
import { PHONE_DISPLAY } from '../content.js'
import { CallLink, Photo, SurveyButton } from './links.jsx'

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
          {/* The one permitted gradient: hero image overlay, darker at the centre band for legibility. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,29,51,0.62)_0%,rgba(9,29,51,0.78)_55%,rgba(9,29,51,0.9)_100%)]"
          />

          <div className="mx-auto flex min-h-[560px] max-w-[52rem] flex-col items-center justify-center px-5 py-20 text-center sm:min-h-[600px] sm:px-10 lg:min-h-[640px] lg:py-24">
            <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.75rem] font-semibold tracking-[0.14em] text-amber uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
              Post-summer property survey
            </p>
            <h1 id="hero-title" className="mt-6 font-semibold text-balance">
              <span className="block text-[2.125rem] leading-[1.08] sm:text-[3rem] lg:text-[3.5rem]">
                Planned maintenance for UAE buildings.
              </span>
              <span className="mt-3 block text-xl font-medium tracking-normal text-amber sm:text-2xl">
                One contract, one number, every trade.
              </span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-white/80 sm:text-[1.0625rem]">
              Summer pushed your AC, electrical and plumbing to their limit. We'll find what it left behind and plan next
              year's maintenance before the call-outs start.
            </p>
            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
              <SurveyButton label="hero" className="on-navy w-full sm:w-auto">
                Book a post-summer survey
              </SurveyButton>
              <CallLink
                location="hero"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full font-semibold text-white underline decoration-1 underline-offset-[6px] hover:decoration-2"
              >
                <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
                Or call {PHONE_DISPLAY}
              </CallLink>
            </div>
            <p className="mt-6 text-sm text-mist">For residential, commercial and hospitality buildings in the UAE.</p>
          </div>
        </div>
      </section>

      <section aria-label="TASLEEH in numbers" className="container-page">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-4 lg:py-20">
          {stats.map(({ value, unit, label }) => (
            <div key={label} className="flex flex-col-reverse justify-end gap-2 border-l border-line pl-5 sm:pl-6">
              <dt className="max-w-[12rem] text-sm leading-snug text-muted">{label}</dt>
              <dd className="font-display text-[2.75rem] leading-none font-semibold text-navy lg:text-[3.75rem]">
                {value}
                <span className={unit === '+' ? 'text-amber-dark' : 'font-sans text-[0.35em] font-medium tracking-normal text-muted'}>
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
