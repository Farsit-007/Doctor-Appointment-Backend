import { Schema, model, Types } from 'mongoose';
import { TAvailability } from './availability.interface';
import { boolean, string } from 'zod';

const singleSlotAvailabilitySchema = new Schema<TAvailability>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      enum: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      required: true,
    },
    timeSlot: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    isBooked :{
       type : Boolean,
       default: false
    }
  },
  {
    timestamps: true,
  },
);

export const Availability = model<TAvailability>(
  'Availability',
  singleSlotAvailabilitySchema,
);
