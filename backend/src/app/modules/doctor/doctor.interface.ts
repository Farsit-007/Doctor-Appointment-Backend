import { Types } from "mongoose";

export interface TDoctor {
  name: string;
  doctor: Types.ObjectId;
  email: string;
  phone: string;
  specialization: string;
  hospitalName: string;
  hospitalFloor: string;
}
