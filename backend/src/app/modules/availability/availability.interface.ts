import { Types } from "mongoose";

export type TDay =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export interface TAvailability {
  doctor: Types.ObjectId;
  service: Types.ObjectId;
  day: TDay;
  date : string;
  timeSlot: {
    start: string; 
    end: string;
  };
  isBooked : boolean
}
