import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
  phone: z.string().min(10),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createCompanySchema = z.object({
  companyType: z.string().min(3),
  title: z.string().min(3),
  vknTckn: z.string().min(10).max(11),
  taxOffice: z.string().min(3),
  adress: z.string().min(3),
  email: z.string().email(3),
});

export const emailSchema = z.object({
  from: z.string().email().optional(),
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  changePasswordCode: z.string().min(1),
  userId: z.string().min(1),
});

export const inviteUserSchema = z.object({
  companyId: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(3),
  phone: z.string().min(10),
});

export const acceptInvitationSchema = z.object({
  inviteId: z.string().min(1),
  userId: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});