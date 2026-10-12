import {
  AirVent,
  ArrowUpRight,
  BedDouble,
  BrickWall,
  Building2,
  ClipboardList,
  KeyRound,
  Leaf,
  PhoneCall,
  Plus,
  ScanSearch,
  Store,
  Truck,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import { ADDRESS_LINE, faqs } from '../content.js'
import { Eyebrow, Photo, SurveyButton, SurveyLink, Tick } from './links.jsx'

const iconProps = { 'aria-hidden': true, strokeWidth: 1.75 }

/** Shared two-column section heading: label + H2 left, supporting text right. */
function SectionHead({ index, label, id, title, children, dark = false }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
      <div>
        <Eyebrow index={index} dark={dark}>
          {label}
        </Eyebrow>
        <h2 id={id} className={`h2 mt-5 text-balance ${dark ? 'text-white' : ''}`}>
          {title}
        </h2>
      </div>
      {children && <div className={`lead ${dark ? 'text-white/80' : ''}`}>{children}</div>}
    </div>
  )
}

/* ---------------------------------------------------------------- Section 3 */

const audiences = [
  { icon: Building2, title: 'Property and facility managers', text: 'One partner instead of a contractor list.' },
  { icon: KeyRound, title: 'Building owners and landlords', text: 'Predictable costs and protected asset value.' },
  { icon: Users, title: 'Owners associations', text: 'Documented, scheduled maintenance for shared areas.' },
  { icon: BedDouble, title: 'Hotels and hospitality', text: 'Rooms back in service fast, guests undisturbed.' },
  { icon: Store, title: 'Offices and retail', text: 'Comfortable, working spaces with minimal downtime.' },
]

export function Audience() {
  const [lead, ...rest] = audiences
  const LeadIcon = lead.icon
  return (
    <section aria-labelledby="audience-title" className="section pt-4 lg:pt-8">
      <div className="container-page">
        <SectionHead index="01" label="Who it's for" id="audience-title" title="Built for the people who keep buildings running" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-[var(--radius-card)] bg-navy p-7 text-white sm:col-span-2 sm:p-8 lg:col-span-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-navy">
              <LeadIcon {...iconProps} className="h-6 w-6" />
            </span>
            <div className="mt-16">
              <h3 className="text-2xl leading-tight font-semibold">{lead.title}</h3>
              <p className="mt-3 text-white/80">{lead.text}</p>
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-[var(--radius-card)] bg-navy-soft sm:col-span-2 lg:col-span-8">
            <Photo
              name="audience"
              sizes="(min-width: 1160px) 740px, (min-width: 1024px) 64vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <p className="glass absolute bottom-4 left-4 rounded-full bg-navy/55 px-4 py-2 text-sm font-medium text-white sm:bottom-6 sm:left-6">
              One contract, one number, every trade.
            </p>
          </div>

          {rest.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-[var(--radius-tile)] border border-line bg-white p-6 transition-colors hover:border-navy/30 sm:col-span-1 lg:col-span-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-concrete text-navy transition-colors group-hover:bg-amber">
                <Icon {...iconProps} className="h-5 w-5" />
              </span>
              <h3 className="mt-8 text-[1.0625rem] leading-snug font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
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
    <section aria-labelledby="cost-title" className="container-wide">
      <div className="section rounded-[var(--radius-card)] bg-concrete">
        <div className="container-page">
          <SectionHead index="02" label="The cost of waiting" id="cost-title" title="Reactive maintenance looks cheaper. It rarely is." />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14">
            <div className="rounded-[var(--radius-card)] bg-white p-7 sm:p-10">
              <p className="inline-flex rounded-full bg-concrete px-3 py-1 text-[0.8125rem] font-medium text-muted">Reactive</p>
              <h3 className="mt-5 text-2xl font-semibold text-ink">Fix it when it breaks</h3>
              <ul className="mt-8 divide-y divide-line">
                {reactive.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 text-muted">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line">
                      <X {...iconProps} strokeWidth={2.25} className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] bg-navy p-7 text-white sm:p-10">
              <p className="inline-flex rounded-full bg-amber px-3 py-1 text-[0.8125rem] font-semibold text-navy">Planned</p>
              <h3 className="mt-5 text-2xl font-semibold">Plan it with TASLEEH</h3>
              <ul className="mt-8 divide-y divide-white/10">
                {planned.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 font-medium">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber/15">
                      <Tick onNavy className="h-4 w-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mx-auto mt-14 max-w-[46rem] text-center font-display text-[1.5rem] leading-snug font-medium text-balance text-navy sm:text-[1.875rem]">
            Facility issues arise without warning. <span className="text-muted">A plan means fewer of them do.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 5 */

const steps = [
  {
    icon: ScanSearch,
    title: 'Property survey',
    text: 'We walk the building with you and check AC, electrical, plumbing, roofs, drainage and common areas.',
  },
  {
    icon: ClipboardList,
    title: 'Maintenance plan',
    text: 'You receive a written plan covering what needs attention now and what should be scheduled through the year.',
  },
  {
    icon: Wrench,
    title: 'Planned maintenance',
    text: 'Our in-house teams carry out scheduled visits across every trade, under one contract.',
  },
  {
    icon: PhoneCall,
    title: 'Rapid response',
    text: 'When something does fail, one call to 800 222 333 reaches a team that responds at any time.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="steps-title" className="section">
      <div className="container-page">
        <SectionHead index="03" label="How a plan works" id="steps-title" title="From survey to steady state in four steps" />

        <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className={`relative flex flex-col rounded-[var(--radius-tile)] p-7 ${
                i === 0 ? 'bg-navy text-white' : 'border border-line bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className={`font-display text-[3.25rem] leading-none font-semibold tabular-nums ${
                    i === 0 ? 'text-amber' : 'text-amber-dark'
                  }`}
                >
                  0{i + 1}
                </span>
                <Icon {...iconProps} className={`h-6 w-6 ${i === 0 ? 'text-white/70' : 'text-navy/60'}`} />
              </div>
              <h3 className={`mt-10 text-lg font-semibold ${i === 0 ? 'text-white' : 'text-navy'}`}>
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className={`mt-2 text-[0.9375rem] leading-relaxed ${i === 0 ? 'text-white/80' : 'text-muted'}`}>{text}</p>
              {/* progress bar: filled up to this step */}
              <div aria-hidden="true" className={`mt-auto pt-8`}>
                <div className={`h-1 w-full overflow-hidden rounded-full ${i === 0 ? 'bg-white/15' : 'bg-concrete'}`}>
                  <div className="h-full rounded-full bg-amber" style={{ width: `${(i + 1) * 25}%` }} />
                </div>
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
    photo: 'svc-mep',
    title: 'MEP and technical',
    items: ['Air conditioning', 'Electricity', 'Plumbing', 'Appliance repair', 'TV and satellite'],
  },
  {
    icon: BrickWall,
    photo: 'svc-fabric',
    title: 'Building fabric',
    items: ['Carpentry', 'Painting', 'Tile fixing', 'Aluminium and glass', 'Façade cleaning'],
  },
  {
    icon: Leaf,
    photo: 'svc-soft',
    title: 'Soft services',
    items: ['Housekeeping', 'Pest control', 'Landscaping', 'Car cleaning'],
  },
  { icon: Truck, photo: 'svc-fitout', title: 'Fit-out and moves', items: ['Fit-out', 'Handyman', 'Movers'] },
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="container-wide">
      <div className="section rounded-[var(--radius-card)] bg-navy-deep text-white">
        <div className="container-page">
          <SectionHead index="04" label="Services" id="services-title" title="17 services. One point of contact." dark>
            Residential, commercial and hospitality clients, all through a single point of contact.
          </SectionHead>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {serviceGroups.map(({ icon: Icon, photo, title, items }) => (
              <article key={title} className="flex flex-col overflow-hidden rounded-[var(--radius-tile)] bg-white/[0.04] ring-1 ring-white/10">
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-soft">
                  <Photo
                    name={photo}
                    sizes="(min-width: 1160px) 268px, (min-width: 1024px) 23vw, (min-width: 640px) 48vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy">
                    <Icon {...iconProps} className="h-5 w-5" />
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-navy/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {items.length} services
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <li key={item} className="rounded-full border border-white/15 px-3 py-1 text-[0.8125rem] text-white/90">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 7 */

export function CtaBand() {
  return (
    <section aria-label="Book your survey" className="container-wide section pb-0 lg:pb-0">
      <div className="on-amber relative overflow-hidden rounded-[var(--radius-card)] bg-amber">
        {/* Decorative rings (no gradients) */}
        <svg aria-hidden="true" className="absolute -right-24 -bottom-40 h-[460px] w-[460px] text-navy/10" viewBox="0 0 200 200" fill="none">
          {[96, 76, 56, 36].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="1.5" />
          ))}
        </svg>
        <div className="relative container-page flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <p className="max-w-[42rem] font-display text-[1.625rem] leading-[1.2] font-semibold text-balance text-navy sm:text-[2.125rem]">
            Book your survey in October and start the winter with a plan, not a backlog.
          </p>
          <SurveyLink label="band" className="btn btn-navy w-full shrink-0 pr-2 sm:w-auto">
            <span className="pr-1">Book a post-summer survey</span>
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-navy">
              <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </span>
          </SurveyLink>
        </div>
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
    <section id="survey-includes" aria-labelledby="includes-title" className="section">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[var(--radius-card)] bg-concrete">
            <Photo
              name="survey"
              sizes="(min-width: 1160px) 548px, (min-width: 1024px) 46vw, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>
          <div className="glass absolute right-4 bottom-4 left-4 flex items-center gap-4 rounded-[var(--radius-tile)] bg-navy/70 p-4 text-white sm:right-auto sm:max-w-[320px]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber text-navy">
              <ScanSearch {...iconProps} className="h-5 w-5" />
            </span>
            <p className="text-sm leading-snug">
              <span className="block font-semibold">Post-summer property survey</span>
              <span className="text-white/80">No charge, no obligation</span>
            </p>
          </div>
        </div>
        <div>
          <Eyebrow index="05">The survey</Eyebrow>
          <h2 id="includes-title" className="h2 mt-5">
            What happens on the survey
          </h2>
          <ol className="mt-10 border-t border-line">
            {surveyChecks.map((item, i) => (
              <li key={item} className="flex items-start gap-5 border-b border-line py-4">
                <span aria-hidden="true" className="w-6 pt-0.5 text-sm font-semibold text-muted tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-ink">{item}</span>
                <Tick className="mt-0.5" />
              </li>
            ))}
          </ol>
          <SurveyButton label="survey_includes" className="mt-10 w-full sm:w-auto">
            Book a post-summer survey
          </SurveyButton>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Section 9 */

const stores = [
  {
    href: 'https://apps.apple.com/ae/app/tasleeh-facility/id1517201376',
    src: '/brand/badge-app-store.webp',
    width: 259,
    alt: 'Download the TASLEEH app on the App Store',
  },
  {
    href: 'https://play.google.com/store/apps/details?id=com.tiger.tmf',
    src: '/brand/badge-google-play.webp',
    width: 261,
    alt: 'Get the TASLEEH app on Google Play',
  },
  {
    href: 'https://appgallery.huawei.com/#/app/C103323711',
    src: '/brand/badge-appgallery.svg',
    width: 259,
    alt: 'Explore the TASLEEH app on AppGallery',
  },
]

export function StoreBadges({ className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {stores.map(({ href, src, width, alt }) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="block rounded-[10px]">
            <img src={src} alt={alt} width={width} height="92" loading="lazy" decoding="async" className="h-[46px] w-auto" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export function OccupantApp() {
  return (
    <section aria-labelledby="app-title" className="container-wide">
      <div className="grid overflow-hidden rounded-[var(--radius-card)] bg-navy text-white lg:grid-cols-2">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <Eyebrow index="06" dark>
            For your occupants
          </Eyebrow>
          <h2 id="app-title" className="mt-5 text-[1.75rem] leading-[1.12] font-semibold text-balance sm:text-[2.25rem]">
            Your residents and tenants can raise requests in the TASLEEH app
          </h2>
          <p className="mt-5 max-w-[34rem] leading-relaxed text-white/80">
            Requests go straight to our team and are tracked to completion, so you see what was reported and what was fixed.
          </p>
          <StoreBadges className="mt-8" />
        </div>
        <div className="relative min-h-[280px] bg-navy-soft">
          <Photo
            name="app"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Section 10 */

const groupFacts = [
  { value: '1976', label: 'Tiger Holding founded' },
  { value: '270', label: 'Completed projects' },
  { value: '12,000', label: 'Employees' },
]

export function About() {
  return (
    <section aria-labelledby="about-title" className="section">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <Eyebrow index="07">Who's behind it</Eyebrow>
            <h2 id="about-title" className="h2 mt-5 text-balance">
              The maintenance arm of a group that builds
            </h2>
          </div>
          <div>
            <p className="text-[1.125rem] leading-[1.65] text-ink sm:text-[1.3125rem]">
              TASLEEH is part of Tiger Holding, founded in 1976, with 270 completed projects and 12,000 employees across real
              estate, contracting, hospitality and facilities management.{' '}
              <span className="text-muted">
                That gives us the resources of an established developer with the responsiveness you expect from a dedicated
                maintenance partner.
              </span>
            </p>
            <p className="mt-6 text-sm text-muted">Office: {ADDRESS_LINE}</p>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[var(--radius-card)] bg-navy-soft lg:mt-16">
          <Photo name="about" sizes="(min-width: 1160px) 1112px, 100vw" className="aspect-[4/3] h-auto w-full object-cover sm:aspect-[21/9]" />
          <dl className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-2 sm:inset-x-6 sm:bottom-6 sm:gap-4 lg:right-auto lg:w-[640px]">
            {groupFacts.map(({ value, label }) => (
              <div key={label} className="glass flex flex-col-reverse gap-1 rounded-2xl bg-navy/55 p-3 text-white sm:p-5">
                <dt className="text-xs leading-snug text-white/80 sm:text-sm">{label}</dt>
                <dd className="font-display text-xl font-semibold sm:text-[2rem] sm:leading-none">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Section 11 */

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-wide">
      <div className="section rounded-[var(--radius-card)] bg-concrete">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow index="08">FAQ</Eyebrow>
            <h2 id="faq-title" className="h2 mt-5 text-balance">
              Questions owners and managers ask
            </h2>
            <SurveyButton label="faq" className="mt-8 w-full sm:w-auto">
              Book a post-summer survey
            </SurveyButton>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <details key={q} open={i === 0} className="group rounded-[var(--radius-tile)] bg-white open:shadow-[0_8px_30px_-20px_rgba(14,42,71,0.35)]">
                <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius-tile)] px-5 py-4 sm:px-7">
                  <h3 className="text-[1.0625rem] leading-snug font-semibold text-navy">{q}</h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-concrete text-navy transition-colors group-open:bg-navy group-open:text-white">
                    <Plus
                      {...iconProps}
                      strokeWidth={2}
                      className="h-[18px] w-[18px] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                    />
                  </span>
                </summary>
                <p className="px-5 pb-6 leading-relaxed text-muted sm:px-7 sm:pr-20">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
