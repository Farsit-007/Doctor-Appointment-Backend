import { Router } from 'express';
import { appointmentController } from './appointment.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { validation } from '../../middleware/validation';
import { appointmentValidation } from './appointment.validation';

const router = Router();

// Define routes
router.post(
  '/',
  auth(USER_ROLE.PATIENT),
  validation(appointmentValidation),
  appointmentController.createAppointment,
);

export const appointmentRoutes = router;
