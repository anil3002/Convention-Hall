import React from 'react'

const About: React.FC = () => (
  <section id="about" aria-labelledby="about-heading" className="py-14 sm:py-16 scroll-mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h2 id="about-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
          About KS Convention Hall
        </h2>
        <p className="mt-4 text-slate-700">
          Located in <span className="font-medium">Vinukonda, Andhra Pradesh</span>, KS Convention Hall is a
          spacious, centrally air-conditioned venue designed for unforgettable weddings, receptions,
          birthdays, and corporate gatherings. With 400+ seating capacity, a dedicated dining hall,
          and ample parking, we provide a comfortable and well-equipped space for your special day.
        </p>
      </div>
    </div>
  </section>
)

export default About
