import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import { envVars } from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";
import bcryptjs from 'bcryptjs';

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
    };
    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email as string
    };
    const hashedPassowrd = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
    // const isPasswordMatch = await bcryptjs.compare(password as string, hashedPassowrd)
    const user = await User.create({
        email,
        password: hashedPassowrd,
        auths: [authProvider],
        ...rest
    });


    return user;
};

const getUser = async () => {
    const users = await User.find();
    const totalUser = await User.countDocuments();
    console.log(totalUser);
    return {
        data: users,
        meta: {
            total: totalUser
        }
    };
};

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
    const ifUserExist = await User.findById(userId);
    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    };
    if (ifUserExist.isDeleted || ifUserExist.isActive === IsActive.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, "User Not Found");
    };
    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        };

        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
    };
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        };
    };
    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND);
    };
    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return newUpdateUser;
}

export const UserService = {
    createUser,
    getUser,
    updateUser
};