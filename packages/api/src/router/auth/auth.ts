import { hash } from "bcrypt";
import { nanoid } from "nanoid";

import { eq, schema } from "@acme/db";

import { authCreateInput, resetPasswordSendInput } from "../../inputs/auth/auth";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { sendEmailResetPassword, sendEmailResetPasswordVerified } from "../../utils/email";

export const authRouter = createTRPCRouter({
  register: protectedProcedure
    .input(authCreateInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.user.findFirst({
        where: eq(schema.user.id, input.userId),
      });
      // {
      //   email: input.email,
      //   changePasswordCode: input.changePasswordCode,
      //   id: input.userId,
      // },

      if (!user) throw new Error("Hatalı istek");

      const hashedPassword = await hash(input.password, 10);

      await ctx.db
        .update(schema.user)
        .set({
          password: hashedPassword,
          changePasswordCode: null,
        })
        .where(eq(schema.user.id, input.userId));

      // .update({
      // where: eq(schema.user.id, input.userId),

      // {
      //   email: input.email,
      //   changePasswordCode: input.changePasswordCode,
      //   id: input.userId,
      // },
      // });

      // await db.user.update({
      //   where: {
      //     id: user.id,
      //   },
      //   data: {
      //     hashedPassword,
      //     changePasswordCode: null,
      //   },
      // });

      await sendEmailResetPasswordVerified(user.name, user.email);
    }),

  resetPasswordSend: protectedProcedure
    .input(resetPasswordSendInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.user.findFirst({
        where: eq(schema.user.email, input.email),
      });

      if (!user) throw new Error("E posta bulunamadı. E postanızı kontrol edin");

      const changePasswordCode = nanoid();

      await ctx.db
        .update(schema.user)
        .set({
          changePasswordCode,
        })
        .where(eq(schema.user.id, user.id));

      // .update({
      // where: eq(schema.user.id, input.userId),

      // {
      //   email: input.email,
      //   changePasswordCode: input.changePasswordCode,
      //   id: input.userId,
      // },
      // });

      // await db.user.update({
      //   where: {
      //     id: user.id,
      //   },
      //   data: {
      //     hashedPassword,
      //     changePasswordCode: null,
      //   },
      // });

      await sendEmailResetPassword(user.name, user.email, changePasswordCode);
    }),
});
