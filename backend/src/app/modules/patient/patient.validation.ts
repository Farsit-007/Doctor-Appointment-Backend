import { z } from 'zod';

export const patientSchemaZod = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
 
    age: z.string().regex(/^\d+$/, 'Age must be numeric string'),
    gender: z.enum(['Male', 'Female', 'Others']),
  }),
});
