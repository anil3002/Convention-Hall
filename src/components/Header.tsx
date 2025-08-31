import React, { useEffect, useMemo, useRef, useState } from 'react'
import logoUrl from '@assets/images/function_hall_logo.jpeg'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#location', label: 'Location' },
  { href: '#enquiry', label: 'Enquiry' },
]

const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [activeId, setActiveId] = useState<string>('')
  const menuRef = useRef<HTMLDivElement>(null)
  const sectionIds = useMemo(
    () => ['about', 'amenities', 'gallery', 'pricing', 'location', 'enquiry'],
    []
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [open])

  // Transparent header on top of hero; solid after scrolling
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Observe sections for active link highlighting
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: null,
        // Trigger a bit before the section top reaches the top (accounts for header)
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  // Sync with hash changes (manual navigation or on load)
  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) setActiveId(hash)
    }
    window.addEventListener('hashchange', updateFromHash)
    updateFromHash()
    return () => window.removeEventListener('hashchange', updateFromHash)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[70] transition-colors pt-safe ${
        atTop
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200'
      }`}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:px-3 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span
              className={`whitespace-nowrap font-brand brand-title font-normal text-3xl md:text-4xl ${
                atTop ? 'text-white' : 'text-slate-900'
              }`}
              aria-label="KS Convention Hall"
            >
              KS Convention Hall
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-1 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                  atTop
                    ? activeId === item.href.slice(1)
                      ? 'text-white font-semibold'
                      : 'text-white hover:text-white'
                    : activeId === item.href.slice(1)
                    ? 'text-slate-900 font-semibold'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                aria-current={activeId === item.href.slice(1) ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
              atTop
                ? 'border-white/40 text-white bg-slate-900/20 hover:bg-slate-900/30 ring-1 ring-inset ring-white/30'
                : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-100 ring-1 ring-inset ring-slate-200'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 5.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden ${open ? 'block' : 'hidden'} border-t ${
          atTop ? 'border-white/10 bg-slate-900/90 text-white' : 'border-slate-200 bg-white'
        } max-h-[80vh] overflow-y-auto pb-safe`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3" aria-label="Mobile">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`block rounded px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                    atTop
                      ? activeId === item.href.slice(1)
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white hover:bg-white/10'
                      : activeId === item.href.slice(1)
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                  onClick={() => setOpen(false)}
                  aria-current={activeId === item.href.slice(1) ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
