import React, { useMemo } from 'react'
import manifest from '@assets/images/optimized/manifest.json'

// Map optimized asset relative paths from manifest to Vite URLs using import.meta.glob
const assetUrls = import.meta.glob('/src/assets/images/optimized/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const resolveUrl = (rel?: string) => {
  if (!rel) return undefined
  const normalized = rel.replace(/^\/?/, '')
  for (const [k, v] of Object.entries(assetUrls)) {
    if (k.endsWith(normalized)) return v as string
    if (k.endsWith('/' + normalized)) return v as string
  }
  return undefined
}

const whatsappUrl = 'https://wa.me/919700029590'

const Hero: React.FC = () => {
  const stage = useMemo(() => {
    const m = (manifest as any)['stage']?.sizes || {}
    return {
      s800: resolveUrl(m[800]?.src),
      s1200: resolveUrl(m[1200]?.src),
      s1600: resolveUrl(m[1600]?.src),
      w: m[1600]?.width || m[1200]?.width || m[800]?.width || 1600,
      h: m[1600]?.height || m[1200]?.height || m[800]?.height || 900,
      fallback: resolveUrl(m[1200]?.src) || resolveUrl(m[800]?.src),
    }
  }, [])

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden text-white"
    >
      {/* Responsive image as background layer */}
      <img
        src={stage.fallback}
        srcSet={`${stage.s800 || ''} 800w, ${stage.s1200 || ''} 1200w, ${stage.s1600 || ''} 1600w`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        alt="Decorated stage area at KS Convention Hall"
        width={stage.w}
        height={stage.h}
        decoding="async"
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-800/85" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-24 min-h-[100vh] flex items-center">
        <div className="max-w-2xl">
          <h1 id="hero-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">
            Elegant, Air‑Conditioned Venue for Grand Celebrations
          </h1>
          <p className="mt-4 text-slate-200">
            Host weddings, receptions, and corporate events at KS Convention Hall in Vinukonda.
            400+ guest seating, dining hall, ample parking, décor, and power backup.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`${whatsappUrl}?text=${encodeURIComponent('Hi, I would like to enquire about availability at KS Convention Hall.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Enquire on WhatsApp
            </a>
            <a
              href="#enquiry"
              className="inline-flex justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Book a Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
