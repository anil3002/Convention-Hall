import React, { useEffect, useState } from 'react'

const Toast: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ message: string }>
      setMessage(ce.detail.message)
      setVisible(true)
      window.setTimeout(() => setVisible(false), 3000)
    }
    document.addEventListener('toast:show', handler as EventListener)
    return () => document.removeEventListener('toast:show', handler as EventListener)
  }, [])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4"
    >
      <div
        className={`pointer-events-auto max-w-lg transform rounded-md bg-slate-900/90 px-4 py-2 text-sm text-white shadow-lg ring-1 ring-white/10 transition-all ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        role="status"
      >
        {message}
      </div>
    </div>
  )
}

export default Toast

