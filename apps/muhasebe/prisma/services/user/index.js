// use only server side code

import { authOptions } from "@/api/auth/authOptions";
import { registerUserSchema } from "@/validationSchemas";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { prisma } from 'prismaClient';
import { checkPermission } from "../companies/index";

export const createNewUser = async (body) => {

    const validation = registerUserSchema.safeParse(body);

    if (!validation.success)
        return { error: validation.error.errors, code: 400 };

    const createUserPhotoUrl = (displayName) => {
        if (!displayName) return null;
        const initials = displayName
            .match(/(\b\S)?/g)
            .join("")
            .match(/(^\S|\S$)?/g)
            .join("")
            .toUpperCase();

        const ppColor = Math.floor(Math.random() * (6 - 0 + 1) + 0);
        return (
            "https://i0.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/" +
            initials +
            "-" +
            ppColor +
            ".png?ssl=1"
        );
    };

    // check email is used before
    const isUserExist = await prisma.user.findUnique({
        where: { email: body.email },
    });

    if (isUserExist) return { error: "Bu eposta ile daha önce kayıt olunmuş. Giriş yapmayı deneyin.", code: 400 };

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            phone: body.phone,
            hashedPassword,
            image: createUserPhotoUrl(body.name),
        },
    });

    return { newUser };

}


export const getAuth = async (request = null, companyId = null) => {

    const authObject = {
        isAuth: false,
        session: null,
        user: null,
        perm: null,
    }

    if (request) {
        const BearerToken = request.headers.get("authorization");
        // burada bearer token varsa onu kullanıyoruz db'den kontrol ediyoruz
    }
    // yoksa sessiondan kontrol ediyoruz
    authObject.session = await getServerSession(authOptions);
    if (authObject?.session) authObject.isAuth = true;


    const user = await prisma.user.findUnique({
        where: { email: authObject.session.user.email },

        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            phone: true,
            image: true,
        },
    });

    if (user) authObject.user = user;

    if (user?.id && companyId) {
        const perm = await checkPermission({ companyId, userId: user.id });
        if (perm.error) {
            authObject.isAuth = false;
            return authObject;
        }
        authObject.perm = perm;
    }

    return authObject;
}

export const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email, },
    });
    return user;
}

