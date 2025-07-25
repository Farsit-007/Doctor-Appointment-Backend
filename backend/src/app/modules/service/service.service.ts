import { JwtPayload } from 'jsonwebtoken';
import { TService } from './service.interface';
import Service from './service.model';
import AppError from '../../errors/AppError';
import { httpStatus } from '../../utils/httpStatus';

const createServiceIntoDB = async (user: JwtPayload, payload: TService) => {
  if (!user?.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  payload.doctor = user.id;
  const result = await Service.create(payload);
  return result;
};

const getAllServiceIntoDB = async () => {
  const result = await Service.find();
  return result;
};

const updateServiceIntoDB = async (
  user: JwtPayload,
  id: string,
  payload: Partial<TService>,
) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }
  if (!(user.id === id)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const serviceServices = {
  createServiceIntoDB,
  updateServiceIntoDB,
  getAllServiceIntoDB,
};
