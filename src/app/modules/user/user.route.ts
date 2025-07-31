import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post("/register", validateRequest(createUserZodValidation), UserController.createUser);

router.get("/all-users", UserController.getAllUsers);


export const userRouter = router;