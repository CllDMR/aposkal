import { z } from "zod";

export const authCreateInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  changePasswordCode: z.string().min(1),
  userId: z.string().min(1),
});

export const resetPasswordSendInput = z.object({
  email: z.string().email(),
});

export const resetPasswordInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  changePasswordCode: z.string().min(1),
  userId: z.string().min(1),
});
