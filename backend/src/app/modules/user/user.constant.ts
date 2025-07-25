import { TRole } from "./user.interface"

export const Role: TRole[] = [ 'ADMIN','DOCTOR','PATIENT']

export const USER_ROLE = {
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR',
    PATIENT : 'PATIENT'
} as const