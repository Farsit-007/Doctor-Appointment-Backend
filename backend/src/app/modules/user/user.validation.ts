import { z } from 'zod';
const createAdmin = z.object({
  password: z.string({ required_error: 'Password is required' }),
  admin: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    contactNumber: z.string({ required_error: 'Number is required' }),
  }),
});

const createDoctor = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password required' }),
    doctor: z.object({
      name: z.string({ required_error: 'Name is required' }),
      email: z.string({ required_error: 'Email is required' }).email(),
      phone: z.string({ required_error: 'Number is required' }),
      specialization: z.string({
        required_error: 'specialization is required',
      }),
      hospitalName: z.string({ required_error: 'hospitalName is required' }),
      hospitalFloor: z.string({ required_error: 'hospitalFloor is required' }),
    }),
  }),
});

const createPatient = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password is required' }),
    patient: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
      gender: z.enum(['Male', 'Female', 'Others']),
    }),
  }),
});

export const usersValidations = {
  createPatient,
  createDoctor,
  createAdmin,
};
