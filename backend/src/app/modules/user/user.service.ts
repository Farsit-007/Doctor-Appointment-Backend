import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { httpStatus } from '../../utils/httpStatus';
import Doctor from '../doctor/doctor.model';
import { User } from './user.model';
import { TUser } from './user.interface';
import { USER_ROLE } from './user.constant';
import { TDoctor } from '../doctor/doctor.interface';
import { TPatient } from '../patient/patient.interface';
import Patient from '../patient/patient.model';

const createDoctorIntoDB = async (password: string, payload: TDoctor) => {
  const userData: Partial<TUser> = {};
  userData.password = password;
  userData.role = USER_ROLE.DOCTOR;
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.doctor = new Types.ObjectId(newUser[0]._id);
    const newDoctor = await Doctor.create([payload], { session });
    if (!newDoctor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newDoctor;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_FOUND, error);
  }
};

const createPatientIntoDB = async (password: string, payload: TPatient) => {
  const userData: Partial<TUser> = {};
  userData.password = password;
  userData.role = USER_ROLE.PATIENT;
  userData.email = payload.email;
  console.log(userData);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.patient = new Types.ObjectId(newUser[0]._id);
    const newDoctor = await Patient.create([payload], { session });
    if (!newDoctor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newDoctor;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_FOUND, error);
  }
};

export const userServices = {
  createDoctorIntoDB,createPatientIntoDB
};
