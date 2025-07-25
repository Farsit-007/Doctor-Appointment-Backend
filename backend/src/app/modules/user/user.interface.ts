import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TRole = 'ADMIN' | 'DOCTOR' | "PATIENT";

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role : TRole;
  isBlock: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>
   isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE;
