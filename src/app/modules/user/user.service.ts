import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from "bcryptjs";

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
    const hashedPassowrd = await bcryptjs.hash(password as string, 10);
    // const isPasswordMatch = await bcryptjs.compare(password as string, hashedPassowrd)
    const user = await User.create({
        email,
        password : hashedPassowrd,
        auths : [authProvider],
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
}

export const UserService = {
    createUser,
    getUser
};