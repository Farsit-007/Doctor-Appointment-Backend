import config from "../../config"
import { catchAsync } from "../../utils/catchAsync"
import { httpStatus } from "../../utils/httpStatus"
import sendResponse from "../../utils/sendResponse"
import { authServices } from "./auth.service"

const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUserWithDB(req.body)
    const { refreshToken, token } = result
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            token
        },
    })
})


export const authController={
  loginUser
}