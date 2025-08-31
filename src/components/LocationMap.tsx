import React from 'react'

const mapsEmbed =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('KS Convention Hall, Vinukonda, Andhra Pradesh') +
  '&output=embed'

const LocationMap: React.FC = () => (
  <section id="location" aria-labelledby="location-heading" className="py-14 sm:py-16 bg-white scroll-mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h2 id="location-heading" className="text-2xl font-semibold tracking-tight text-slate-900">Location</h2>
        <p className="mt-2 text-slate-700">Find us in Vinukonda, Andhra Pradesh.</p>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
        <iframe
          title="Google Map - KS Convention Hall, Vinukonda"
          src={mapsEmbed}
          width="100%"
          height="360"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-4">
        <a
          className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          href={
            'https://www.google.com/maps/dir/?api=1&destination=' +
            encodeURIComponent('KS Convention Hall, Vinukonda')
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>
      </div>
    </div>
  </section>
)

export default LocationMap
