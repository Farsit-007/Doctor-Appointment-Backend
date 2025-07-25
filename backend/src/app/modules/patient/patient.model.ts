import { Schema, model } from 'mongoose';
import { TPatient } from './patient.interface';

const patientSchema = new Schema<TPatient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    age: { type: String, required: true },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others'],
      default: 'Others',
    },
  },
  {
    timestamps: true,
  },
);

const Patient = model<TPatient>('Patient', patientSchema);

export default Patient;
