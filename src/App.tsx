import React, { useEffect, useState } from 'react'
import Header from '@components/Header'
import Hero from '@components/Hero'
import About from '@components/About'
import Amenities from '@components/Amenities'
import Gallery from '@components/Gallery'
import Pricing from '@components/Pricing'
import LocationMap from '@components/LocationMap'
import EnquiryForm from '@components/EnquiryForm'
import Footer from '@components/Footer'
import Toast from '@components/Toast'
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
import Splash from '@components/Splash'

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true)
  useEffect(() => {
    // Always show for ~3.4s
    const tHide = window.setTimeout(() => setShowSplash(false), 3400)
    return () => window.clearTimeout(tHide)
  }, [])
  // Lock scroll while splash is visible
  useEffect(() => {
    if (showSplash) {
      const { style: htmlStyle } = document.documentElement
      const { style: bodyStyle } = document.body
      const prevHtml = htmlStyle.overflow
      const prevBody = bodyStyle.overflow
      htmlStyle.overflow = 'hidden'
      bodyStyle.overflow = 'hidden'
      return () => {
        htmlStyle.overflow = prevHtml
        bodyStyle.overflow = prevBody
      }
    }
  }, [showSplash])
  // React 19 Document Metadata: title/meta/og/twitter
  return (
    <>
      <title>KS Convention Hall • Vinukonda, Andhra Pradesh</title>
      <meta
        name="description"
        content="Spacious, air-conditioned event venue in Vinukonda with 1000+ seating, dining hall, ample parking, décor & power backup. Enquire on WhatsApp: +91 97000 29590."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="KS Convention Hall • Vinukonda, Andhra Pradesh"
      />
      <meta
        property="og:description"
        content="Spacious, air-conditioned event venue in Vinukonda with 1000+ seating, dining hall, ample parking, décor & power backup. Enquire on WhatsApp: +91 97000 29590."
      />
      <meta property="og:image" content={resolveUrl((manifest as any)['stage']?.sizes?.[1200]?.src) || ''} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="KS Convention Hall • Vinukonda, Andhra Pradesh"
      />
      <meta
        name="twitter:description"
        content="Spacious, air-conditioned event venue in Vinukonda with 1000+ seating, dining hall, ample parking, décor & power backup. Enquire on WhatsApp: +91 97000 29590."
      />
      <meta name="twitter:image" content={resolveUrl((manifest as any)['stage']?.sizes?.[1200]?.src) || ''} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'KS Convention Hall',
          telephone: '+91 97000 29590',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Vinukonda',
            addressRegion: 'Andhra Pradesh',
            addressCountry: 'IN',
          },
          url: typeof window !== 'undefined' ? window.location.origin : 'https://example.com',
          sameAs: ['https://wa.me/919700029590'],
        })}
      </script>

      <Splash show={showSplash} />
      <Header />
      <main id="content" className="isolate">
        <Hero />
        <About />
        <Amenities />
        <Gallery />
        <Pricing />
        <LocationMap />
        <EnquiryForm />
      </main>
      <Footer />
      <Toast />
    </>
  )
}

export default App
