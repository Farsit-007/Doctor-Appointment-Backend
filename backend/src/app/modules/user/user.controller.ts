import { catchAsync } from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createDoctor = catchAsync(async (req, res, next) => {
  const { password, doctor } = req.body;

  const result = await userServices.createDoctorIntoDB(password, doctor);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Doctor Registered Successfully',
    data: result,
  });
});

const createPatient = catchAsync(async (req, res, next) => {
  const { password, patient } = req.body;
 

  const result = await userServices.createPatientIntoDB(password, patient);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Patient Registered Successfully',
    data: result,
  });
});

export const userController = {
  createDoctor,
  createPatient,
};
