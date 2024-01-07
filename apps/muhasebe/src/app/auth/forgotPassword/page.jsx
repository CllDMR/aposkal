import { ForgotPasswordForm } from "@/components/auth";
import { db } from "@/lib/db";

export default async function Page({
  searchParams: { email, changePasswordCode },
}) {
  if (!email || !changePasswordCode) throw new Error("Insufficient data");

  const user = await db.user.findUnique({
    where: {
      email,
      changePasswordCode,
    },
  });

  if (!user) throw new Error("User is not available");

  return (
    <ForgotPasswordForm
      email={email}
      changePasswordCode={changePasswordCode}
      userId={user.id}
    />
  );
}
