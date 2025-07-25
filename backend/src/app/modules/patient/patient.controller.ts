import { Request, Response } from 'express';
import { patientService } from './patient.service';

export const patientController = {
  async getAll(req: Request, res: Response) {
    const data = await patientService.getAll();
    res.json(data);
  },
};
