import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { genaretToken } from "../../utils/jwt";
import { envVars } from "../../../config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email dose not exist");
    };

    const isPasswordMatch = bcryptjs.compare(password as string, isUserExist.password as string);
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
    };
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };

    const accessToken = genaretToken(jwtPayload, envVars.JWT_ACCESS_SECREAT, envVars.JWT_ACCESS_EXPIRES);

    return {
        accessToken
    }
};

export const AuthService = {
    credentialsLogin
}