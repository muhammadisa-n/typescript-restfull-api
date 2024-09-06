import { z, ZodType } from "zod";

export class ContactValidation {
  static readonly CREATE: ZodType = z.object({
    first_name: z.string().min(1).max(30),
    last_name: z.string().min(1).max(30).optional(),
    email: z.string().min(1).max(40).email().optional(),
    phone: z.string().min(1).max(15).optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    first_name: z.string().min(1).max(30),
    last_name: z.string().min(1).max(30).optional(),
    email: z.string().min(1).max(40).email().optional(),
    phone: z.string().min(1).max(15).optional(),
  });
  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
