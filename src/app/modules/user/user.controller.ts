import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         //     throw new Error("Fake Error");
//         //    throw new AppError(httpStatus.BAD_REQUEST, "Fake Error");
//         const user = await UserService.createUser(req.body);
//         res.status(httpStatus.CREATED).json({
//             success: true,
//             message: "User created successfully",
//             data: user
//         });

//     } catch (error: any) {
//         next(error)
//     }
// };
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);
    sendResponse(res, {
        success : true,
        statusCode : httpStatus.CREATED,
        message : "User Create Successfully",
        data : user
    })
});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getUser();
    sendResponse(res, {
        success : true,
        statusCode : httpStatus.CREATED,
        message : "User Create Successfully",
        data : users.data,
        meta : users.meta
    })
});
  
export const UserController = {
    createUser,
    getAllUsers
};

// route matching -> controller -> service -> model -> DB 