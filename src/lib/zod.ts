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
      message: 'Pin Code must be of',
    })
    .int()
    .gte(100000) // Minimum value to ensure 6 digits
    .lte(999999), // Maximum value to ensure 6 digits
});

export type User = z.infer<typeof OnboardingUserSchema>;
