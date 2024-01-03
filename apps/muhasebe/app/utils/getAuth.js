import { authOptions } from "@/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "prismaClient";

// use only server side

const getAuth = async (req) => {
    const session = await getServerSession(authOptions);
    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
    });


    return {
        user: currentUser,
        session: session,
    }

}


export default getAuth;