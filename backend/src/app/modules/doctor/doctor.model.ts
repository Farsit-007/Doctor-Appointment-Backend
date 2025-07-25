import { Schema, model } from 'mongoose';
import { TDoctor } from './doctor.interface';

const doctorSchema = new Schema<TDoctor>(
  {
    name: { type: String, required: true },
    doctor: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    hospitalName: { type: String, required: true },
    hospitalFloor: { type: String, required: true },
  },
  {
    timestamps: true,
  },
  
);

const Doctor = model<TDoctor>('Doctor', doctorSchema);

export default Doctor;
