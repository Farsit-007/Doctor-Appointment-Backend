import { Types } from 'mongoose';

export interface TAppointment {
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  selectedDate: Date;
  timeSlot: Types.ObjectId;
  patientId: Types.ObjectId;
  status: 'pending' | 'accepted' | 'cancelled' | 'completed';
}
