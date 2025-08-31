import React, { useId } from 'react'
import logoUrl from '@assets/images/function_hall_logo.jpeg'

type Props = { show: boolean }

const Splash: React.FC<Props> = ({ show }) => {
  const headingId = useId()
  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center transition-opacity duration-600 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      {/* Simple dark backdrop with subtle vignette */}
      <div className="absolute inset-0 splash-backdrop" />

      {/* Curtain-like side fades that dissolve before the overlay fades out */}
      <div className="curtain-fade left" aria-hidden="true" />
      <div className="curtain-fade right" aria-hidden="true" />
      <div className="curtain-fade-top" aria-hidden="true" />

      {/* Center logo only (accessible heading is visually hidden) */}
      <div className="relative z-10 mx-4 w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-6 text-center text-white shadow-2xl backdrop-blur splash-fade">
        <img
          src={logoUrl}
          alt="KS Convention Hall logo"
          width={96}
          height={96}
          className="mx-auto h-24 w-24 rounded-lg ring-1 ring-white/40"
        />
        <h1 id={headingId} className="mt-4 text-xl font-semibold tracking-tight">KS Convention Hall</h1>
        <p className="mt-1 text-sm text-white/90">Vinukonda, Andhra Pradesh</p>
        <p className="mt-1 text-xs text-white/80">Setting the stage for your celebration…</p>
      </div>
    </div>
  )
}

export default Splash
