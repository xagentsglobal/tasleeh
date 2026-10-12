import { useEffect, useRef, useState } from 'react'
import { LoaderCircle, Phone } from 'lucide-react'
import { PHONE_DISPLAY, maintenanceSetups, propertyTypes, roles } from '../content.js'
import { trackFormStart, trackFormSubmitSuccess } from '../lib/analytics.js'
import { CallLink, Eyebrow, Tick } from './links.jsx'

const WEBHOOK = import.meta.env.VITE_FORM_WEBHOOK
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Lenient: optional leading +, then 9–15 digits with spaces, dashes or brackets.
const PHONE_RE = /^\+?[\d\s()-]+$/
const isPhone = (v) => PHONE_RE.test(v) && v.replace(/\D/g, '').length >= 9 && v.replace(/\D/g, '').length <= 15

const REQUIRED = {
  full_name: 'Enter your full name.',
  company: 'Enter your company or building name.',
  role: 'Select your role.',
  email: 'Enter your work email.',
  mobile: 'Enter your mobile number.',
  property_type: 'Select a property type.',
  location: 'Enter the property location.',
  maintenance_setup: 'Select your current maintenance setup.',
}

function validate(data) {
  const errors = {}
  for (const [name, message] of Object.entries(REQUIRED)) {
    if (!String(data.get(name) ?? '').trim()) errors[name] = message
  }
  const email = String(data.get('email') ?? '').trim()
  if (email && !EMAIL_RE.test(email)) errors.email = 'Enter a valid email address, like name@company.ae.'
  const mobile = String(data.get('mobile') ?? '').trim()
  if (mobile && !isPhone(mobile)) errors.mobile = 'Enter a valid mobile number, like +971 50 123 4567.'
  return errors
}

function todayIso() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function Field({ id, label, optional, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

/** Props shared by every control: wires ids, aria-invalid and aria-describedby. */
function controlProps(name, errors, { hint = false } = {}) {
  const id = `f-${name}`
  const describedBy = errors[name] ? `${id}-error` : hint ? `${id}-hint` : undefined
  return { id, name, 'aria-invalid': errors[name] ? true : undefined, 'aria-describedby': describedBy }
}

function SurveyForm({ onSuccess }) {
  const formRef = useRef(null)
  const started = useRef(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | error
  const [hidden, setHidden] = useState({ page_url: '', ...Object.fromEntries(UTM_KEYS.map((k) => [k, ''])) })
  const [minDate, setMinDate] = useState(undefined)

  // Read URL-dependent values after hydration so server and client markup match.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setHidden({ page_url: window.location.href, ...Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k) || ''])) })
    setMinDate(todayIso())
  }, [])

  const handleStart = () => {
    if (started.current) return
    started.current = true
    trackFormStart()
  }

  // Clear a field's error as soon as the user corrects it.
  const handleChange = (event) => {
    const { name } = event.target
    if (!errors[name]) return
    const next = validate(new FormData(formRef.current))
    setErrors((prev) => {
      const copy = { ...prev }
      if (next[name]) copy[name] = next[name]
      else delete copy[name]
      return copy
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return
    const form = formRef.current
    const data = new FormData(form)
    const found = validate(data)
    setErrors(found)
    const firstInvalid = Object.keys(REQUIRED).concat('email', 'mobile').find((k) => found[k])
    if (firstInvalid) {
      form.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    const payload = Object.fromEntries([...data.entries()].map(([k, v]) => [k, String(v).trim()]))
    payload.submitted_at = new Date().toISOString()

    try {
      if (WEBHOOK) {
        const res = await fetch(WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
      } else if (import.meta.env.DEV) {
        console.info('[survey] VITE_FORM_WEBHOOK is not set; payload would be:', payload)
      } else {
        throw new Error('VITE_FORM_WEBHOOK is not configured')
      }
      trackFormSubmitSuccess({ property_type: payload.property_type, role: payload.role })
      onSuccess()
    } catch (err) {
      console.error('[survey] submission failed', err)
      setStatus('error')
    }
  }

  return (
    <form
      id="survey"
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      onFocus={handleStart}
      onChange={handleChange}
      aria-label="Book a post-summer property survey"
      className="grid gap-5"
    >
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <Field id="f-full_name" label="Full name" error={errors.full_name}>
        <input type="text" autoComplete="name" required className="field-input" {...controlProps('full_name', errors)} />
      </Field>

      <Field id="f-company" label="Company or building name" error={errors.company}>
        <input type="text" autoComplete="organization" required className="field-input" {...controlProps('company', errors)} />
      </Field>

      <Field id="f-role" label="Your role" error={errors.role}>
        <select required defaultValue="" className="field-input" {...controlProps('role', errors)}>
          <option value="" disabled>
            Select your role
          </option>
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="f-email" label="Work email" error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" required className="field-input" {...controlProps('email', errors)} />
        </Field>
        <Field id="f-mobile" label="Mobile" hint="Include +971" error={errors.mobile}>
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+971 50 123 4567"
            required
            className="field-input"
            {...controlProps('mobile', errors, { hint: true })}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="f-property_type" label="Property type" error={errors.property_type}>
          <select required defaultValue="" className="field-input" {...controlProps('property_type', errors)}>
            <option value="" disabled>
              Select a property type
            </option>
            {propertyTypes.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field id="f-location" label="Location" error={errors.location}>
          <input
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. Dubai Marina"
            required
            className="field-input"
            {...controlProps('location', errors)}
          />
        </Field>
      </div>

      <Field id="f-size" label="Approximate size" optional hint="Number of units or square feet" error={errors.size}>
        <input type="text" className="field-input" {...controlProps('size', errors, { hint: true })} />
      </Field>

      <fieldset
        aria-describedby={errors.maintenance_setup ? 'f-maintenance_setup-error' : undefined}
        aria-invalid={errors.maintenance_setup ? true : undefined}
      >
        <legend className="field-label">
          Current maintenance setup<span className="sr-only"> (required)</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {maintenanceSetups.map((option, i) => (
            <label
              key={option}
              className="flex min-h-[50px] cursor-pointer items-center gap-3 rounded-xl border border-[#c3cad3] transition-colors hover:border-[#9aa5b2] px-3.5 py-2.5 text-[0.9375rem] has-[:checked]:border-navy has-[:checked]:bg-concrete"
            >
              <input
                type="radio"
                name="maintenance_setup"
                value={option}
                required
                id={i === 0 ? 'f-maintenance_setup' : undefined}
                className="h-[18px] w-[18px] shrink-0 accent-navy"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.maintenance_setup && (
          <p id="f-maintenance_setup-error" className="field-error">
            {errors.maintenance_setup}
          </p>
        )}
      </fieldset>

      <Field id="f-preferred_week" label="Preferred survey week" optional error={errors.preferred_week}>
        <input type="date" min={minDate} className="field-input" {...controlProps('preferred_week', errors)} />
      </Field>

      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-[#b42318] bg-[#fef3f2] px-4 py-3 text-sm font-medium text-[#912018]">
          We couldn't send your request. Please try again, or call{' '}
          <CallLink location="form_error" className="underline">
            {PHONE_DISPLAY}
          </CallLink>
          .
        </p>
      )}

      <div>
        <button type="submit" disabled={status === 'submitting'} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-80">
          {status === 'submitting' && <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin motion-reduce:animate-none" />}
          {status === 'submitting' ? 'Sending…' : 'Book my survey'}
        </button>
        <p className="mt-3 text-center text-sm text-muted">We'll call to confirm a time. Your details are used only to arrange the survey.</p>
      </div>
    </form>
  )
}

function SurveySuccess() {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div id="survey" ref={ref} tabIndex={-1} role="status" className="py-6 text-center focus:outline-none sm:py-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-concrete">
        <Tick className="h-7 w-7" />
      </div>
      <p className="mx-auto mt-6 max-w-[26rem] text-xl leading-snug font-semibold text-navy">
        Thank you. Your survey request is in. Our team will call you to confirm a time.
      </p>
      <CallLink location="form_success" className="btn btn-primary mt-8 w-full sm:w-auto">
        <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
        Call {PHONE_DISPLAY} now
      </CallLink>
    </div>
  )
}

const reassurance = ['No charge, no obligation', 'One point of contact', 'Part of Tiger Holding']

export default function SurveySection({ sectionRef }) {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section ref={sectionRef} aria-labelledby="book-title" className="container-wide pt-16 pb-3 lg:pt-24 lg:pb-4">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-navy text-white">
        <svg aria-hidden="true" className="absolute -top-48 -left-48 h-[560px] w-[560px] text-white/[0.05]" viewBox="0 0 200 200" fill="none">
          {[96, 76, 56, 36].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>
        <div className="relative container-page grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24">
          <div className="lg:sticky lg:top-28 lg:self-start lg:pt-2">
            <Eyebrow index="09" dark>
              Book a survey
            </Eyebrow>
            <h2
              id="book-title"
              className="mt-5 text-[2rem] leading-[1.08] font-semibold tracking-[-0.025em] text-balance sm:text-[2.5rem] lg:text-[3rem]"
            >
              Book your post-summer property survey
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              Tell us about the property and we'll arrange a time to walk it with you.
            </p>
            <ul className="mt-8 grid gap-3">
              {reassurance.map((item) => (
                <li key={item} className="glass flex items-center gap-3 rounded-full px-4 py-3 font-medium">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber/15">
                    <Tick onNavy className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex flex-wrap items-center gap-x-2 text-white/85">
              <Phone aria-hidden="true" className="h-[18px] w-[18px] text-amber" strokeWidth={2} />
              Prefer to talk? Call
              <CallLink
                location="form_aside"
                className="font-semibold text-white underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                {PHONE_DISPLAY}
              </CallLink>
            </p>
          </div>
          <div className="rounded-[var(--radius-tile)] bg-white p-5 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-9">
            {submitted ? <SurveySuccess /> : <SurveyForm onSuccess={() => setSubmitted(true)} />}
          </div>
        </div>
      </div>
    </section>
  )
}
