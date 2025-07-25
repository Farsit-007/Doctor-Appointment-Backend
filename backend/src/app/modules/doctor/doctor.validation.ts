import { z } from 'zod';

export const createDoctorValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    phone: z.string({ required_error: 'Phone is required' }),
    specialization: z.string({ required_error: 'specialization is required' }),
    hospitalName: z.string({ required_error: 'hospitalName is required' }),
    hospitalFloor: z.string({ required_error: 'hospitalFloor is required' }),
  }),
});
