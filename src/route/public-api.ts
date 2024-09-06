import express, { Request, NextFunction, Response } from "express";
import { UserController } from "../controller/user-controller";
import { ResponseError } from "../helper/response-error";

export const publicRouter = express.Router();
publicRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json({
      data: {
        message: "Server It Works",
        author: "Muhammad Isa",
        api_version: "1.0.0",
      },
    })
    .end();
});
publicRouter.get("/api", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json({
      data: {
        message: "Api It Works",
        author: "Muhammad Isa",
        api_version: "1.0.0",
      },
    })
    .end();
});
publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/users/login", UserController.login);
