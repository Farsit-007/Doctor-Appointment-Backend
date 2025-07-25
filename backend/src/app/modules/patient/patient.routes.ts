import { Router } from 'express';
import { patientController } from './patient.controller';

const router = Router();

// Define routes
router.get('/', patientController.getAll);

export default router;
