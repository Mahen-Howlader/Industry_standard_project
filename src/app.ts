import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./router";
import { globalErrorHandler } from "./app/middlewares/globalerrorhandler";
import httpStatus from "http-status-codes";
import notFound from "./app/middlewares/notFound";
export const app = express();


app.use(express.json());
app.use(cors());
app.use("/api/v1", router);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
});
app.use(globalErrorHandler);
app.use(notFound);