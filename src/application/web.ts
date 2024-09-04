import express from "express";
import morgan from "morgan";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
export const web = express();
web.use(express.json());
web.use(morgan("dev"));
web.use(publicRouter);
web.use(errorMiddleware);
