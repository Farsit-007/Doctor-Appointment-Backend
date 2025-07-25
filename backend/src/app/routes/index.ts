import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { serviceRoutes } from '../modules/service/service.routes';
import { AvailabilityRoutes } from '../modules/availability/availability.routes';
import { appointmentRoutes } from '../modules/appointment/appointment.routes';

const router = Router();

const moduleRoutes = [
 
  {
    path: '/users',
    route: UserRoutes,
  },
    {
    path: '/auth',
    route: AuthRoutes,
  },
   {
    path: '/doctor',
    route: serviceRoutes,
  },
   {
    path: '/slot',
    route: AvailabilityRoutes,
  },
   {
    path: '/appointment',
    route: appointmentRoutes,
  },

]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
