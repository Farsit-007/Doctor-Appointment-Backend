import { Schema, model } from 'mongoose';
import { TAppointment } from './appointment.interface';

const appointmentSchema = new Schema<TAppointment>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    selectedDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: Schema.Types.ObjectId,
      ref: 'Availability', 
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const Appointment = model<TAppointment>('Appointment', appointmentSchema);
 
