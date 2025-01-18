import { z } from 'zod';
import { cities } from '@/constants/cities';
import { states } from '@/constants/states';

export const OnboardingUserSchema = z.object({
  firstName: z.string().min(2, 'First Name is required'),
  lastName: z.string().min(2, 'Last Name is required'),
  state: z.string().refine((state) => states.includes(state), {
    message: 'Invalid state selected',
  }),
  city: z.string().refine(
    (city) => cities.some((c) => c.city === city), // Ensure the city exists in the predefined data
    { message: 'Invalid city selected' },
  ),
  street: z.string().min(2, 'Address is required'),
  pincode: z
    .number({
      message: 'Pin Code must be of 6 digits',
    })
    .int()
    .gte(100000) // Minimum value to ensure 6 digits
    .lte(999999), // Maximum value to ensure 6 digits
});

export const InvoiceSchema = z.object({
  invoiceName: z.string().min(1, 'Invoice Name is required'),
  total: z.number().min(1, '1$ is minimum'),
  status: z.enum(['PAID', 'PENDING']).default('PENDING'),
  date: z.date({ message: 'Date is required' }),
  dueDate: z.number().min(0, 'Due Date is required'),
  fromName: z.string().min(1, 'Your name is required'),
  fromEmail: z.string().email('Invalid Email address'),
  fromStreet: z.string().min(1, 'Your street is required'),
  fromCity: z.string().min(1, 'Your city is required'),
  fromState: z.string().min(1, 'Your state is required'),
  fromPinCode: z
    .number({
      message: 'Pin Code must be of 6 digits',
    })
    .int()
    .gte(100000) // Minimum value to ensure 6 digits
    .lte(999999), // Maximum value to ensure 6 digits
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid Email address'),
  clientAddress: z.string().min(1, 'Client address is required'),
  currency: z.string().min(1, 'Currency is required'),
  invoiceNumber: z.number().min(1, 'Minimum invoice number of 1'),
  note: z.string().optional().nullable(),
  invoiceItemDescription: z.string().min(1, 'Description is required'),
  invoiceItemQuantity: z.number().min(1, 'Qunatity min 1'),
  invoiceItemRate: z.number().min(1, 'Rate min 1'),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
