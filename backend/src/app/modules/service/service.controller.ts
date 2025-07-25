import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import { serviceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await serviceServices.createServiceIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service Created Successfully',
    data: result,
  });
});

const getAllService = catchAsync(async (req, res) => {
  const result = await serviceServices.getAllServiceIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service Retrived Successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const result = await serviceServices.updateServiceIntoDB(
    req.user,
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Updated Successfully',
    data: result,
  });
});

export const serviceController = {
  createService,
  updateService,
  getAllService,
};
