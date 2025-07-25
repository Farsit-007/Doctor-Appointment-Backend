import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { availabilityControllerController } from './availability.controller';
import { validation } from '../../middleware/validation';
import { availabilityValidationSchema } from './availability.validation';

const router = Router();

// Define routes
router.post('/', validation(availabilityValidationSchema),auth(USER_ROLE.DOCTOR),availabilityControllerController.createAvailabilityController);

export const AvailabilityRoutes =  router;
