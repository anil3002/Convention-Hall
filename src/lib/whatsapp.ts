export type EnquiryPayload = {
  name: string
  phone: string
  date: string
  purpose: string
  message?: string | null
}

const PHONE = '919700029590'

export const buildWhatsAppMessage = (p: EnquiryPayload) => {
  const body = [
    'New Enquiry for KS Convention Hall',
    `Name: ${p.name}`,
    `Phone: ${p.phone}`,
    `Date: ${p.date}`,
    `Purpose: ${p.purpose}`,
    `Message: ${p.message && p.message.trim() ? p.message.trim() : '-'}`,
  ].join('\n')
  return body
}

export const buildWhatsAppURL = (p: EnquiryPayload) => {
  const message = buildWhatsAppMessage(p)
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
  return { url, message }
}

