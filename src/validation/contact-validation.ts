import { z, ZodType } from "zod";

export class ContactValidation {
  static readonly CREATE: ZodType = z.object({
    first_name: z.string().min(1).max(30),
    last_name: z.string().min(1).max(30).optional(),
    email: z.string().min(1).max(40).email().optional(),
    phone: z.string().min(1).max(15).optional(),
  });
}
