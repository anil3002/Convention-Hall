import React, { useCallback, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { enquirySchema, type EnquiryFormValues } from '@lib/validation'
import { buildWhatsAppURL } from '@lib/whatsapp'

// Toast dispatch (simple custom event)
const showToast = (message: string) => {
  document.dispatchEvent(new CustomEvent('toast:show', { detail: { message } }))
}

const EnquiryForm: React.FC = () => {
  const headingId = useId()
  const [fallback, setFallback] = useState<{ url: string; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    mode: 'onTouched',
  })

  const onSubmit = useCallback((data: EnquiryFormValues) => {
    const { url, message } = buildWhatsAppURL(data)
    const w = window.open(url, '_blank', 'noopener')
    if (w && !w.closed) {
      showToast('Opening WhatsApp to send your enquiry…')
      setFallback(null)
    } else {
      // Popup blocked: show fallback with copy and tel link
      setFallback({ url, message })
      showToast('WhatsApp popup blocked. Use fallback options below.')
    }
  }, [])

  const onError = useCallback(
    (formErrors: typeof errors) => {
      const first = Object.keys(formErrors)[0] as keyof EnquiryFormValues | undefined
      if (first) setFocus(first)
    },
    [setFocus]
  )

  return (
    <section id="enquiry" aria-labelledby={headingId} className="py-14 sm:py-16 bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-slate-900">
            Enquiry
          </h2>
          <p className="mt-2 text-slate-700">Send us your details and we’ll respond on WhatsApp.</p>
        </div>

        <form
          className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 max-w-3xl"
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-800">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              aria-invalid={!!errors.name || undefined}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              autoComplete="name"
              required
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-800">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              aria-invalid={!!errors.phone || undefined}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              inputMode="tel"
              autoComplete="tel"
              placeholder="e.g., +91 97000 29590"
              required
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-800">
                Booking date
              </label>
              <input
                id="date"
                type="date"
                {...register('date')}
                aria-invalid={!!errors.date || undefined}
                aria-describedby={errors.date ? 'date-error' : undefined}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                required
              />
              {errors.date && (
                <p id="date-error" className="mt-1 text-sm text-red-600">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-slate-800">
                Purpose
              </label>
              <select
                id="purpose"
                {...register('purpose')}
                aria-invalid={!!errors.purpose || undefined}
                aria-describedby={errors.purpose ? 'purpose-error' : undefined}
                className="mt-1 block w-full rounded-md border-slate-300 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                required
              >
                <option value="">Select…</option>
                <option>Wedding</option>
                <option>Reception</option>
                <option>Birthday</option>
                <option>Corporate</option>
                <option>Other</option>
              </select>
              {errors.purpose && (
                <p id="purpose-error" className="mt-1 text-sm text-red-600">
                  {errors.purpose.message as string}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-800">
              Message (optional)
            </label>
            <textarea
              id="message"
              rows={4}
              {...register('message')}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              placeholder="Any additional details…"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Send on WhatsApp
            </button>
            <a
              href="tel:+919700029590"
              className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              Call Us
            </a>
          </div>

          {fallback && (
            <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4">
              <p className="text-sm text-amber-900">
                Couldn’t open WhatsApp automatically. You can copy your enquiry or try the link below.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  onClick={() => {
                    navigator.clipboard.writeText(fallback.message)
                    showToast('Copied enquiry text to clipboard')
                  }}
                >
                  Copy message
                </button>
                <a
                  className="text-emerald-700 underline underline-offset-2"
                  href={fallback.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open WhatsApp link
                </a>
                <a className="text-slate-800 underline underline-offset-2" href="tel:+919700029590">
                  Or call +91 97000 29590
                </a>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default EnquiryForm
