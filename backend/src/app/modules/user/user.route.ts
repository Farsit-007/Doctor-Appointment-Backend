import express from 'express';
import { userController } from './user.controller';
import { validation } from '../../middleware/validation';
import { usersValidations } from './user.validation';

const router = express.Router();

router.post(
  '/register-doctor',
  validation(usersValidations.createDoctor),
  userController.createDoctor,
);

router.post(
  '/register-patient',
  validation(usersValidations.createPatient),
  userController.createPatient,
);

export const UserRoutes = router;
