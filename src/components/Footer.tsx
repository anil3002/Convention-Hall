import React from 'react'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-600">© {year} KS Convention Hall. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="tel:+919700029590" className="text-sm font-medium text-slate-800 hover:underline">
              Call: +91 97000 29590
            </a>
            <a
              href="https://wa.me/919700029590"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

