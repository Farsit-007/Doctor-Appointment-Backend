import { z } from 'zod';

export const appointmentValidation = z.object({
  body: z.object({
    doctorId: z.string({ required_error: 'Doctor id is required' }),
    serviceId: z.string({ required_error: 'service id is required' }),
    selectedDate: z.string({ required_error: 'selectedDate id is required' }),
    timeSlot: z.string({
      required_error: 'timeslot id is required' 
    }),
    status: z
      .enum(['pending', 'accepted', 'cancelled', 'completed'])
      .default('pending'),
  }),
});
