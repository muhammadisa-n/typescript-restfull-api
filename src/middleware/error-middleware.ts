import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../helper/response-error";
export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error: ${JSON.stringify(err)} `,
    });
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};
