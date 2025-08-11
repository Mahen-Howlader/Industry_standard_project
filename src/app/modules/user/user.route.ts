import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodValidation, updateUserZodValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();


router.post("/register", validateRequest(createUserZodValidation), UserController.createUser);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getAllUsers);
router.patch("/:id",validateRequest(updateUserZodValidation), checkAuth(...Object.values(Role)), UserController.updateUser);


export const userRouter = router; 