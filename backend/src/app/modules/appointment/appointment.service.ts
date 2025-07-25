import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { httpStatus } from '../../utils/httpStatus';
import { TAppointment } from './appointment.interface';
import { Appointment } from './appointment.model';
import { Availability } from '../availability/availability.model';
import mongoose, { Types } from 'mongoose';

const createAppointmentIntoDB = async (
  user: JwtPayload,
  payload: TAppointment,
) => {
  if (!user?.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  payload.patientId = user.id;

  const { doctorId, selectedDate, timeSlot } = payload;

  const slot = await Availability.findOne({
    _id: timeSlot,
    doctor: doctorId,
    isBooked: false,
  });

  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, 'This time slot is already booked');
  }

  const appointment = await Appointment.create(payload);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const appointment = await Appointment.create([payload], { session });
    if (!appointment.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create appointment',
      );
    }
    const updatedSlot = await Availability.findByIdAndUpdate(
      timeSlot,
      { isBooked: true },
      { new: true, session },
    );

    if (!updatedSlot) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update slot status',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return appointment[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_FOUND, error);
  }
};

export const appointmentServices = {
  createAppointmentIntoDB,
};
