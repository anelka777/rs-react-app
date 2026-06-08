import { z } from 'zod';

export const createFormSchema = (countries: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine((val) => val.length > 0 && val[0] === val[0].toUpperCase(), {
          message: 'First letter must be uppercase',
        }),

      age: z
        .number({ error: 'Age must be a number' })
        .min(0, 'Age must be positive')
        .int('Age must be a whole number'),

      email: z
        .string()
        .min(1, 'Email is required')
        .refine(
          (val) => {
            const parts = val.split('@');
            if (parts.length !== 2) {
              return false;
            }
            const [local, domain] = parts;
            if (!local || !domain) {
              return false;
            }
            if (!domain.includes('.')) {
              return false;
            }
            return true;
          },
          { message: 'Invalid email' }
        ),

      gender: z.enum(['male', 'female'], {
        message: 'Please select a gender',
      }),

      termsAccepted: z.literal(true, {
        message: 'You must accept the terms',
      }),

      password: z.string().min(1, 'Password is required'),

      confirmPassword: z.string().min(1, 'Please confirm your password'),

      country: z
        .string()
        .min(1, 'Country is required')
        .refine((val) => countries.includes(val), {
          message: 'Please select a valid country from the list',
        }),

      image: z.string().min(1, 'Image is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

export type FormData = z.infer<ReturnType<typeof createFormSchema>>;
