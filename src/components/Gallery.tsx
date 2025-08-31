import React, { useEffect, useMemo, useRef, useState } from 'react'
import manifest from '@assets/images/optimized/manifest.json'

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

type ImgItem = {
  key: string
  alt: string
  w: number
  h: number
  s800?: string
  s1200?: string
  s1600?: string
  fallback?: string
}

const useGalleryImages = (): ImgItem[] => {
  return useMemo(() => {
    const pick = (key: string, alt: string): ImgItem => {
      const sizes = (manifest as any)[key]?.sizes || {}
      return {
        key,
        alt,
        w: sizes[1600]?.width || sizes[1200]?.width || sizes[800]?.width || 1600,
        h: sizes[1600]?.height || sizes[1200]?.height || sizes[800]?.height || 900,
        s800: resolveUrl(sizes[800]?.src),
        s1200: resolveUrl(sizes[1200]?.src),
        s1600: resolveUrl(sizes[1600]?.src),
        fallback: resolveUrl(sizes[1200]?.src) || resolveUrl(sizes[800]?.src),
      }
    }
    return [
      pick('entrance', 'Grand entrance of KS Convention Hall'),
      pick('entry', 'Entry pathway leading to the hall'),
      pick('hallway', 'Spacious, well-lit hallway inside the venue'),
      pick('rooms', 'Comfortable rooms for guests and preparations'),
      pick('stage', 'Decorated stage area suitable for ceremonies'),
    ]
  }, [])
}

const Gallery: React.FC = () => {
  const [active, setActive] = useState<number | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const images = useGalleryImages()

  useEffect(() => {
    if (active !== null) {
      closeBtnRef.current?.focus()
    }
  }, [active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight' && active !== null) setActive((i) => (i! + 1) % images.length)
      if (e.key === 'ArrowLeft' && active !== null) setActive((i) => (i! - 1 + images.length) % images.length)
      if (e.key === 'Tab' && active !== null) {
        // simple focus trap: keep focus within overlay
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (document.activeElement === last && !e.shiftKey) {
          e.preventDefault()
          first.focus()
        } else if (document.activeElement === first && e.shiftKey) {
          e.preventDefault()
          last.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="py-14 sm:py-16 bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 id="gallery-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
            Gallery
          </h2>
          <p className="mt-2 text-slate-700">A glimpse of our spaces and facilities.</p>
        </div>

        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {images.map((img, idx) => (
            <li key={idx} className="relative">
              <button
                className="group block w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                onClick={() => setActive(idx)}
                aria-label={`Open image: ${img.alt}`}
              >
                <img
                  src={img.fallback}
                  srcSet={`${img.s800 || ''} 800w, ${img.s1200 || ''} 1200w, ${img.s1600 || ''} 1600w`}
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  decoding="async"
                  loading="lazy"
                  className="aspect-square h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active !== null && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={(e) => {
            if (e.target === overlayRef.current) setActive(null)
          }}
        >
          <div className="relative max-h-full max-w-5xl">
            <img
              src={images[active].s1600 || images[active].fallback}
              srcSet={`${images[active].s800 || ''} 800w, ${images[active].s1200 || ''} 1200w, ${images[active].s1600 || ''} 1600w`}
              sizes="(min-width: 1024px) 80vw, 90vw"
              alt={images[active].alt}
              width={images[active].w}
              height={images[active].h}
              decoding="async"
              loading="eager"
              className="max-h-[70vh] w-auto rounded-md shadow-2xl"
            />
            <div className="mt-3 text-center text-white/90 text-sm">{images[active].alt}</div>
            <div className="mt-4 flex items-center justify-between">
              <button
                ref={closeBtnRef}
                className="inline-flex items-center gap-1 rounded bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => setActive(null)}
              >
                Close
              </button>
              <div className="flex gap-2">
                <button
                  className="inline-flex items-center rounded bg-white/10 px-2.5 py-1.5 text-white ring-1 ring-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  onClick={() => setActive((i) => (i! - 1 + images.length) % images.length)}
                  aria-label="Previous image"
                >
                  ◀
                </button>
                <button
                  className="inline-flex items-center rounded bg-white/10 px-2.5 py-1.5 text-white ring-1 ring-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  onClick={() => setActive((i) => (i! + 1) % images.length)}
                  aria-label="Next image"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
