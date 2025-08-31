import React, { useId } from 'react'
import logoUrl from '@assets/images/function_hall_logo.jpeg'

type Props = {
  show: boolean
  open: boolean
}

const LoadingScreen: React.FC<Props> = ({ show, open }) => {
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
      {/* Curtain panels */}
      <div className={`curtain-panel left ${open ? 'open-left' : ''}`} aria-hidden="true" />
      <div className={`curtain-panel right ${open ? 'open-right' : ''}`} aria-hidden="true" />
      <div className="curtain-drape" aria-hidden="true" />

      {/* Centered content */}
      <div className="relative z-10 mx-4 w-full max-w-sm rounded-2xl border border-white/20 bg-black/20 p-6 text-center text-white shadow-2xl backdrop-blur">
        <img
          src={logoUrl}
          alt="KS Convention Hall logo"
          width={88}
          height={88}
          className="mx-auto h-22 w-22 rounded-lg ring-1 ring-white/40"
        />
        <h1 id={headingId} className="mt-4 text-xl font-semibold tracking-tight">
          KS Convention Hall
        </h1>
        <p className="mt-1 text-sm text-white/90">Vinukonda, Andhra Pradesh</p>
        <p className="mt-1 text-xs text-white/80">Setting the stage for your celebration…</p>
      </div>
    </div>
  )
}

export default LoadingScreen

