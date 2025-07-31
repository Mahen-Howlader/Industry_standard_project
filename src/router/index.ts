import { Router } from "express";
import { userRouter } from "../app/modules/user/user.route";
import { AuthRouters } from "../app/modules/auth/auth.router";

export const router = Router();

const moduleRouter = [
    {
        path: "/user",
        router: userRouter
    },
    {
        path : "/auth",
        router : AuthRouters
    }
];

moduleRouter.forEach((route) => {
    router.use(route.path, route.router)
});