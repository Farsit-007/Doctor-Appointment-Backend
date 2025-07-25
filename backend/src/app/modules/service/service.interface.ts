import { Types } from "mongoose";

export interface TService {
  title: string;
  description: string;
  price: number;
  duration: number;
  doctor : Types.ObjectId
}
