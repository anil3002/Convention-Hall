import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(/^[0-9+ ]+$/, 'Only digits, spaces, and + allowed'),
  date: z.string().min(1, 'Booking date is required'),
  purpose: z
    .enum(['Wedding', 'Reception', 'Birthday', 'Corporate', 'Other'], {
      required_error: 'Purpose is required',
    }),
  message: z.string().optional().nullable(),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>

