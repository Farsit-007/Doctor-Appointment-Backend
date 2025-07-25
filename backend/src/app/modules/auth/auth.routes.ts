import { Router } from 'express';
import { validation } from '../../middleware/validation';
import { loginValidationSchema } from './auth.validation';
import { authController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validation(loginValidationSchema),
  authController.loginUser,
);

export const AuthRoutes = router;
