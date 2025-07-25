import { Router } from 'express';
import { serviceController } from './service.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/services',
  auth(USER_ROLE.DOCTOR),
  serviceController.createService,
);

router.get(
  '/services',
  serviceController.getAllService,
);

router.patch(
  '/services/:id',
  auth(USER_ROLE.DOCTOR),
  serviceController.updateService,
);
router.delete(
  '/services/:id',
  auth(USER_ROLE.DOCTOR),
  serviceController.createService,
);

export const serviceRoutes = router;
