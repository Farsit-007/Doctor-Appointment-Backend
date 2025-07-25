import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import { appointmentServices } from './appointment.service';

const createAppointment = catchAsync(async (req, res) => {
  const result = await appointmentServices.createAppointmentIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Slot Created Successfully',
    data: result,
  });
});

export const appointmentController = {
  createAppointment,
};
