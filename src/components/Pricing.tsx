import React from 'react'

const tiers = [
  { name: 'Weekday Events', details: 'Ideal for corporate and intimate functions.' },
  { name: 'Weekend Events', details: 'Perfect for weddings and receptions.' },
  { name: 'Full-Day Package', details: 'Includes hall, dining, and basic décor.' },
]

const Pricing: React.FC = () => (
  <section id="pricing" aria-labelledby="pricing-heading" className="py-14 sm:py-16 scroll-mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h2 id="pricing-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
          Pricing
        </h2>
        <p className="mt-2 text-slate-700">Simple, flexible options. Contact us for a tailored quote.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{t.name}</h3>
            <p className="mt-2 text-slate-700">{t.details}</p>
            <div className="mt-4">
              <span className="inline-flex items-center rounded bg-slate-900 px-3 py-1.5 text-sm font-medium text-white">
                Contact for quote
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Pricing
