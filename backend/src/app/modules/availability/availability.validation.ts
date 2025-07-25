import { z } from 'zod';

export const availabilityValidationSchema = z.object({
  body: z.object({
    service: z.string({
      required_error: 'Service ID is required',
    }),
    date: z.string({
      required_error: 'Day is required',
    }) .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Date must be a valid YYYY-MM-DD format',
      }),
    timeSlot: z.object({
      start: z
        .string({
          required_error: 'Slot start time is required',
        })
        .regex(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          'Start time must be in HH:mm format',
        ),

      end: z
        .string({
          required_error: 'Slot end time is required',
        })
        .regex(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          'End time must be in HH:mm format',
        ),
    }),
  }),
});
