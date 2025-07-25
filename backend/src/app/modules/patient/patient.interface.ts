import { Types } from "mongoose";

export type TGender = 'Male' | 'Female' | 'Others';
export interface TPatient {
  name: string;
  email: string;
  patient : Types.ObjectId,
  phone: string;
  age: string;
  gender: TGender;
}
