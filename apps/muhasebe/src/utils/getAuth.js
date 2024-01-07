import { authOptions } from "@/api/auth/authOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

// use only server side

const getAuth = async (req) => {
  const session = await getServerSession(authOptions);
  const currentUser = await db.user.findUnique({
    where: { email: session.user.email },
  });

  return {
    user: currentUser,
    session: session,
  };
};

export default getAuth;
