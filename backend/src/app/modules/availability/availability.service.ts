import { JwtPayload } from 'jsonwebtoken';
import { Availability } from './availability.model';
import { TAvailability } from './availability.interface';
import Service from '../service/service.model';
import AppError from '../../errors/AppError';
import { httpStatus } from '../../utils/httpStatus';

const createAvailabilityIntoDB = async (
  user: JwtPayload,
  payload: TAvailability,
) => {
  if (!user?.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  payload.doctor = user.id;

  const { timeSlot, date, service, doctor } = payload;

  const dateObj = new Date(date);
  const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

  const serviceInfo = await Service.findById(service);
  if (!serviceInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const slots = generateTimeSlots(
    timeSlot.start,
    timeSlot.end,
    serviceInfo.duration,
  );

  const availabilityDocs = slots.map((slotStr) => {
    const [start, end] = slotStr.split(' - ');
    return {
      doctor,
      service,
      date,
      day,
      timeSlot: { start, end },
    };
  });

  const result = await Availability.insertMany(availabilityDocs);
  return result;
};

export function generateTimeSlots(
  start: string,
  end: string,
  duration: number,
): string[] {
  const slots: string[] = [];

  // Parse "HH:mm" strings into total minutes
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  let current = startTotalMinutes;

  while (current + duration <= endTotalMinutes) {
    const slotStartHour = Math.floor(current / 60);
    const slotStartMinute = current % 60;

    const slotEndHour = Math.floor((current + duration) / 60);
    const slotEndMinute = (current + duration) % 60;

    const format = (h: number, m: number) =>
      `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

    const slot = `${format(slotStartHour, slotStartMinute)} - ${format(
      slotEndHour,
      slotEndMinute,
    )}`;

    slots.push(slot);
    current += duration;
  }

  return slots;
}

export const AvailabilityServices = {
  createAvailabilityIntoDB,
};
