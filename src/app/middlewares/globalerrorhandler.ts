import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import AppError from "../errorHelpers/appError";

export const globalErrorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
    let port = 500;
    let mess = `Someting went wrong ${err.message}`;

    if(err instanceof AppError){
        port = err.statusCode;
        mess = err.message;
    }else if(err instanceof Error){
        port = 500;
        mess = err.message;
    }

    res.status(port).json({
        success : false,
        message : mess,
        err,
        stack : envVars.NODE_ENV === "development" ? err.stack : null
    })
}