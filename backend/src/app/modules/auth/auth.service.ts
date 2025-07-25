
import config from "../../config"
import AppError from "../../errors/AppError"
import { httpStatus } from "../../utils/httpStatus"
import { User } from "../user/user.model"
import { TAuth } from "./auth.interface"
import { createToken } from "./auth.utils"

const loginUserWithDB = async (payload: TAuth) => {
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(payload.email)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
    }

    // checking if the user is blocked
    const userStatus = user?.isBlock
    if (userStatus) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
    }
    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

    const jwtPayload = {
        id : user._id,
        userEmail: user.email,
        role: user.role,
    }
    const token = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        '1d'
    )
    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        '7d'
    )
    return {
        token,refreshToken
    }
}

export const authServices = {
  loginUserWithDB
}