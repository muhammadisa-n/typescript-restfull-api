import express from "express";
import morgan from "morgan";
export const web = express();
web.use(express.json());
web.use(morgan("dev"));
