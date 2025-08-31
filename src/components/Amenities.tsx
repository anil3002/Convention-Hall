import React from 'react'

const items = [
  { title: 'Central A/C', desc: 'Fully air-conditioned main hall for comfort.' },
  { title: '400+ Seating', desc: 'Spacious seating for grand celebrations.' },
  { title: 'Dining Hall', desc: 'Separate hygienic dining area.' },
  { title: 'Ample Parking', desc: 'Convenient on-site parking for guests.' },
  { title: 'Décor & Lighting', desc: 'Beautiful décor and premium lighting.' },
  { title: 'Backup Power', desc: 'Reliable generator for uninterrupted events.' },
  { title: 'Bridal Suite', desc: 'Private bridal dressing and rest area.' },
]

const Amenities: React.FC = () => (
  <section id="amenities" aria-labelledby="amenities-heading" className="py-14 sm:py-16 bg-white scroll-mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h2 id="amenities-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
          Amenities
        </h2>
        <p className="mt-2 text-slate-700">Thoughtfully designed features to elevate your event.</p>
      </div>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((i) => (
          <li
            key={i.title}
            className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm hover:shadow transition-shadow"
          >
            <h3 className="text-base font-semibold text-slate-900">{i.title}</h3>
            <p className="mt-1 text-sm text-slate-700">{i.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default Amenities
