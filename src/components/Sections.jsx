import {
  AirVent,
  BedDouble,
  BrickWall,
  Building2,
  ChevronDown,
  KeyRound,
  Leaf,
  Store,
  Truck,
  Users,
  X,
} from 'lucide-react'
import { ADDRESS_LINE, faqs } from '../content.js'
import { SurveyLink, Tick } from './links.jsx'

const iconProps = { 'aria-hidden': true, strokeWidth: 1.75 }

/* ---------------------------------------------------------------- Section 3 */

const audiences = [
  { icon: Building2, title: 'Property and facility managers', text: 'One partner instead of a contractor list.' },
  { icon: KeyRound, title: 'Building owners and landlords', text: 'Predictable costs and protected asset value.' },
  { icon: Users, title: 'Owners associations', text: 'Documented, scheduled maintenance for shared areas.' },
  { icon: BedDouble, title: 'Hotels and hospitality', text: 'Rooms back in service fast, guests undisturbed.' },
  { icon: Store, title: 'Offices and retail', text: 'Comfortable, working spaces with minimal downtime.' },
]

export function Audience() {
  return (
    <section aria-labelledby="audience-title" className="section bg-white">
      <div className="container-page">
        <h2 id="audience-title" className="h2 max-w-[40rem]">
          Built for the people who keep buildings running
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5">
          {audiences.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-xl border border-line bg-white p-5 lg:p-6">
              <Icon {...iconProps} className="h-7 w-7 text-navy" />
              <h3 className="mt-4 text-[1.0625rem] leading-snug font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 4 */

const reactive = [
  'Emergency call-out rates',
  'A different contractor for every trade',
  'Tenant complaints and lost goodwill',
  'No record of what was done, or when',
  "Costs you can't predict",
]
const planned = [
  'Scheduled visits at planned rates',
  'One contract and one number for every trade',
  'Faults caught before tenants notice',
  'A maintenance history for every asset',
  'A budget you can forecast',
]

export function CostOfWaiting() {
  return (
    <section aria-labelledby="cost-title" className="section bg-concrete">
      <div className="container-page">
        <h2 id="cost-title" className="h2 max-w-[44rem]">
          Reactive maintenance looks cheaper. It rarely is.
        </h2>
        <div className="mt-10 grid overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(14,42,71,0.06)] md:grid-cols-2 lg:mt-12">
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl font-semibold text-ink">Fix it when it breaks</h3>
            <ul className="mt-6 space-y-4">
              {reactive.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <X {...iconProps} strokeWidth={2.25} className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-4 border-amber bg-white p-6 sm:p-8 md:border-t-0 md:border-l-4 lg:p-10">
            <h3 className="text-xl font-semibold text-navy">Plan it with TASLEEH</h3>
            <ul className="mt-6 space-y-4">
              {planned.map((item) => (
                <li key={item} className="flex gap-3 font-medium text-ink">
                  <Tick className="mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-lg font-medium text-navy">Facility issues arise without warning. A plan means fewer of them do.</p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 5 */

const steps = [
  {
    title: 'Property survey',
    text: 'We walk the building with you and check AC, electrical, plumbing, roofs, drainage and common areas.',
  },
  {
    title: 'Maintenance plan',
    text: 'You receive a written plan covering what needs attention now and what should be scheduled through the year.',
  },
  {
    title: 'Planned maintenance',
    text: 'Our in-house teams carry out scheduled visits across every trade, under one contract.',
  },
  {
    title: 'Rapid response',
    text: 'When something does fail, one call to 800 222 333 reaches a team that responds at any time.',
  },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="steps-title" className="section bg-white">
      <div className="container-page">
        <h2 id="steps-title" className="h2 max-w-[40rem]">
          From survey to steady state in four steps
        </h2>
        <ol className="mt-10 grid gap-0 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {steps.map(({ title, text }, i) => (
            <li key={title} className="relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0">
              {/* Connector: vertical on mobile, horizontal on desktop */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-14 bottom-0 left-[1.4rem] w-px bg-line lg:top-[1.4rem] lg:right-[-2rem] lg:bottom-auto lg:left-16 lg:h-px lg:w-auto"
                />
              )}
              <span
                aria-hidden="true"
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-amber-dark text-2xl font-bold text-amber-dark"
              >
                {i + 1}
              </span>
              <div className="pt-1.5 lg:mt-6 lg:pt-0">
                <h3 className="text-lg font-semibold text-navy">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 6 */

const serviceGroups = [
  {
    icon: AirVent,
    title: 'MEP and technical',
    items: ['Air conditioning', 'Electricity', 'Plumbing', 'Appliance repair', 'TV and satellite'],
  },
  {
    icon: BrickWall,
    title: 'Building fabric',
    items: ['Carpentry', 'Painting', 'Tile fixing', 'Aluminium and glass', 'Façade cleaning'],
  },
  { icon: Leaf, title: 'Soft services', items: ['Housekeeping', 'Pest control', 'Landscaping', 'Car cleaning'] },
  { icon: Truck, title: 'Fit-out and moves', items: ['Fit-out', 'Handyman', 'Movers'] },
]

export function Services() {
  return (
    <section aria-labelledby="services-title" className="section bg-concrete">
      <div className="container-page">
        <h2 id="services-title" className="h2">
          17 services. One point of contact.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {serviceGroups.map(({ icon: Icon, title, items }) => (
            <div key={title} className="rounded-xl border border-line bg-white p-6">
              <Icon {...iconProps} className="h-7 w-7 text-amber-dark" />
              <h3 className="mt-4 text-lg font-semibold text-navy">{title}</h3>
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                {items.map((item) => (
                  <li key={item} className="text-[0.9375rem] text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-muted">Residential, commercial and hospitality clients, all through a single point of contact.</p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 7 */

export function CtaBand() {
  return (
    <section aria-label="Book your survey" className="on-amber bg-amber">
      <div className="container-page flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
        <p className="max-w-[40rem] text-xl leading-snug font-semibold text-navy sm:text-2xl">
          Book your survey in October and start the winter with a plan, not a backlog.
        </p>
        <SurveyLink label="band" className="btn btn-navy w-full shrink-0 sm:w-auto">
          Book a post-summer survey
        </SurveyLink>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 8 */

const surveyChecks = [
  'A walk-through of your property with a TASLEEH engineer',
  'AC systems: filters, coils, drain lines and condenser units',
  'Electrical panels and distribution after peak summer load',
  'Plumbing, drains and gully traps',
  'Roof and podium waterproofing ahead of the winter rains',
  'Common areas, finishes and any open tenant complaints',
  'A written summary and a maintenance plan proposal',
]

export function SurveyIncludes() {
  return (
    <section aria-labelledby="includes-title" className="section bg-white">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl bg-concrete">
          <img
            src="/survey.webp"
            srcSet="/survey-640.webp 640w, /survey.webp 1200w"
            sizes="(min-width: 1024px) 560px, 100vw"
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            alt="TASLEEH engineer recording findings on a tablet during a property survey"
            className="aspect-[4/3] h-auto w-full object-cover"
          />
        </div>
        <div>
          <h2 id="includes-title" className="h2">
            What happens on the survey
          </h2>
          <ul className="mt-8 space-y-4">
            {surveyChecks.map((item) => (
              <li key={item} className="flex gap-3 text-ink">
                <Tick className="mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 9 */

const stores = [
  {
    href: 'https://apps.apple.com/ae/app/tasleeh-facility/id1517201376',
    src: '/badge-app-store.svg',
    width: 140,
    alt: 'Download the TASLEEH app on the App Store',
  },
  {
    href: 'https://play.google.com/store/apps/details?id=com.tiger.tmf',
    src: '/badge-google-play.svg',
    width: 150,
    alt: 'Get the TASLEEH app on Google Play',
  },
  {
    href: 'https://appgallery.huawei.com/#/app/C103323711',
    src: '/badge-appgallery.svg',
    width: 150,
    alt: 'Explore the TASLEEH app on AppGallery',
  },
]

export function OccupantApp() {
  return (
    <section aria-labelledby="app-title" className="bg-navy py-14 text-white lg:py-16">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="max-w-[40rem]">
          <h2 id="app-title" className="text-2xl leading-tight font-bold tracking-tight text-white sm:text-[1.75rem]">
            Your residents and tenants can raise requests in the TASLEEH app
          </h2>
          <p className="mt-4 leading-relaxed text-white/85">
            Requests go straight to our team and are tracked to completion, so you see what was reported and what was fixed.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3">
          {stores.map(({ href, src, alt, width }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="block rounded-lg">
                <img src={src} alt={alt} width={width} height="46" loading="lazy" decoding="async" className="h-[46px] w-auto" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Section 10 */

export function About() {
  return (
    <section aria-labelledby="about-title" className="section bg-white">
      <div className="container-page">
        <div className="max-w-[48rem]">
          <h2 id="about-title" className="h2">
            The maintenance arm of a group that builds
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            TASLEEH is part of Tiger Holding, founded in 1976, with 270 completed projects and 12,000 employees across real
            estate, contracting, hospitality and facilities management. That gives us the resources of an established developer
            with the responsiveness you expect from a dedicated maintenance partner.
          </p>
          <p className="mt-6 text-sm text-muted">Office: {ADDRESS_LINE}</p>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Section 11 */

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="section bg-concrete">
      <div className="container-page">
        <h2 id="faq-title" className="h2">
          Questions owners and managers ask
        </h2>
        <div className="mt-10 max-w-[52rem] divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white lg:mt-12">
          {faqs.map(({ q, a }, i) => (
            <details key={q} open={i === 0} className="group">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left sm:px-7">
                <h3 className="text-[1.0625rem] leading-snug font-semibold text-navy">{q}</h3>
                <ChevronDown
                  {...iconProps}
                  strokeWidth={2}
                  className="h-5 w-5 shrink-0 text-navy transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="px-5 pb-6 leading-relaxed text-ink sm:px-7">{a}</p>
            </details>
          ))}
        </div>
        <SurveyLink label="faq" className="btn btn-primary mt-10 w-full sm:w-auto">
          Book a post-summer survey
        </SurveyLink>
      </div>
    </section>
  )
}
