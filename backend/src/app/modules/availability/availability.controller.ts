import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import { AvailabilityServices } from './availability.service';

const createAvailabilityController = catchAsync(async (req, res) => {
  const result = await AvailabilityServices.createAvailabilityIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Slot Created Successfully',
    data: result,
  });
});

export const availabilityControllerController = {
  createAvailabilityController,
};
