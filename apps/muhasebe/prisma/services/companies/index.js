// use only server side code

import { createCompanySchema } from "@/validationSchemas";
import bcrypt from "bcrypt";
import { prisma } from "prismaClient";
import { v4 as uuidv4 } from "uuid";

import { createNewUser, getAuth } from ".././user/index.js";

export const getCompaniesByUid = async (userId) => {
  const companyIds = await prisma.companyUser.findMany({
    where: { userId, isActive: true },
    select: { companyId: true },
  });

  const companies = await prisma.company.findMany({
    where: { id: { in: companyIds.map((company) => company.companyId) } },
  });

  return companies;
};

export const getCompanyById = async ({
  companyId,
  userId,
  getSession = false,
}) => {
  if (!companyId)
    return {
      error: {
        message: "Company id is required",
        code: 400,
      },
    };

  let auth = null;

  if (getSession) {
    auth = await getAuth();
    userId = auth.user.id;
  }

  // convert companyId to int
  companyId = parseInt(companyId);

  // check if user is in company
  const companyUser = await prisma.companyUser.findFirst({
    where: { companyId, userId },
  });

  if (!companyUser)
    return {
      error: {
        message: "You are not authorized this company",
        code: 403,
      },
    };

  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  return {
    data: company,
    perm: companyUser,
    session: auth,
    queryTime: new Date().getTime(),
  };
};

export const getCompanyUsers = async ({ companyId }) => {
  companyId = parseInt(companyId);

  const companyUsers = await prisma.companyUser.findMany({
    where: { companyId },
  });

  const userIds = companyUsers.map((user) => user.userId);

  // exapt hashedPassword
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      phone: true,
      image: true,
    },
  });

  // companyUsers.forEach((user) => {
  //     user.user = users.find((u) => u.id === user.userId);
  // });

  const userData = [];

  users.forEach((user) => {
    const userCompany = companyUsers.find((u) => u.userId === user.id);
    userData.push({
      ...user,
      permission: userCompany,
    });
  });

  return userData;
};

export const checkPermission = async ({ companyId, userId }) => {
  companyId = parseInt(companyId);
  const companyUser = await prisma.companyUser.findFirst({
    where: { companyId, userId },
  });

  if (!companyUser)
    return {
      error: {
        message: "You are not authorized this company",
        code: 403,
      },
    };

  return companyUser;
};

export const createCompany = async ({ company, userId }) => {
  const validation = createCompanySchema.safeParse(company);
  if (!validation.success)
    return { error: validation.error.format(), code: 400 };

  const newCompany = await prisma.company.create({
    data: {
      companyType: company.companyType,
      title: company.title,
      vknTckn: company.vknTckn,
      taxOffice: company.taxOffice,
      adress: company.adress,
      email: company.email,
      createdById: userId,
    },
  });

  const newPerm = await prisma.companyUser.create({
    data: {
      companyId: newCompany.id,
      userId,
      role: "OWNER",
      isActive: true,
    },
  });

  return { newCompany, newPerm };
};

export const addUserToCompany = async ({
  companyId,
  email,
  role = "USER",
  name,
  phone,
  invitedBy,
}) => {
  companyId = parseInt(companyId);

  let userId = null;
  let invitedUser = null;

  // check email is used before
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // if user exists, get userId
  if (user) {
    userId = user.id;
    invitedUser = user;

    // check if user is in company
    const companyUser = await prisma.companyUser.findUnique({
      where: { companyId_userId: { companyId, userId } },
    });
    if (companyUser) return { error: "User already in company", code: 400 };
  } else {
    // create new user
    let password = uuidv4();
    password = password.slice(0, 8);
    const newUser = await createNewUser({ email, password, name, phone });
    if (newUser.error) return { error: newUser.error, code: 400 };
    userId = newUser.newUser.id;

    // update changePasswordCode
    const changePasswordCode = uuidv4();
    await prisma.user.update({
      where: { id: userId },
      data: { changePasswordCode },
    });
  }

  const inviteId = uuidv4();
  const newPerm = await prisma.companyUser.create({
    data: {
      companyId,
      userId,
      role,
      invitedAt: new Date(),
      invitedBy,
      inviteId,
    },
  });

  const companyData = await prisma.company.findUnique({
    where: { id: companyId },
    select: { title: true },
  });

  const companyTitle = companyData.title;

  const inviterUser = await prisma.user.findUnique({
    where: { id: invitedBy },
    select: { name: true },
  });

  const inviterName = inviterUser.name;
  return { newPerm, invitedUser, companyTitle, inviterName, inviteId };
};

export const getInvitation = async ({ inviteId, email }) => {
  const invitationObject = {
    isNewUser: false,
    invitedUser: null,
    companyUser: null,
  };

  invitationObject.invitedUser = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      phone: true,
      image: true,
      changePasswordCode: true,
    },
  });

  if (!invitationObject.invitedUser)
    return { error: "User not found", code: 404 };

  invitationObject.isNewUser = invitationObject.invitedUser.changePasswordCode
    ? true
    : false;

  invitationObject.companyUser = await prisma.companyUser.findUnique({
    where: { inviteId },
  });

  if (!invitationObject.companyUser)
    return { error: "Invitation not found", code: 404 };

  // check invitationObject.invitedUser.email === email
  if (invitationObject.invitedUser.email !== email)
    return { error: "Invitation not found", code: 404 };

  return invitationObject;
};

export const acceptInvite = async ({ inviteId, userId, email, password }) => {
  const invitedUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!invitedUser || invitedUser.email !== email)
    return { error: "User not found", code: 404 };

  const companyUser = await prisma.companyUser.findUnique({
    where: { inviteId },
  });

  if (!companyUser) return { error: "Invitation not found", code: 404 };

  if (!invitedUser.emailVerified) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
        emailVerifiedCode: null,
      },
    });
  }

  if (invitedUser.changePasswordCode) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        changePasswordCode: null,
        hashedPassword: await bcrypt.hash(password, 10),
      },
    });
  }

  await prisma.companyUser.update({
    where: { inviteId },
    data: {
      isActive: true,
      acceptedInviteAt: new Date(),
      inviteId: null,
    },
  });

  return { status: "success" };
};

export const getUserFromCompany = async ({ companyId, userId }) => {
  // convert companyId to int
  companyId = parseInt(companyId);

  const userObject = {
    user: null,
    companyUser: null,
    currentUserRole: null,
  };

  const currentUser = await getAuth();
  const currentUserId = currentUser?.user?.id;
  // userObject.currentUser = currentUser;
  if (!currentUserId) return { error: "User not found", code: 404 };

  const currentUserInCompany = await prisma.companyUser.findFirst({
    where: { companyId, userId: currentUserId },
  });

  userObject.currentUserRole = currentUserInCompany?.role;

  if (!currentUserInCompany) return { error: "User not authorized", code: 403 };

  userObject.user = await prisma.user.findUnique({
    where: { id: userId },

    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      phone: true,
      image: true,
    },
  });

  if (!userObject.user) return { error: "User not found", code: 404 };

  userObject.companyUser = await prisma.companyUser.findFirst({
    where: { companyId, userId },
  });

  if (!userObject.companyUser) return { error: "User not found", code: 404 };

  return userObject;
};

export const updateUserInCompany = async ({
  companyId,
  userId,
  isActive,
  role,
}) => {
  companyId = parseInt(companyId);

  const auth = await getAuth();
  const authUserId = auth.user.id;

  if (!authUserId) return { error: "1 User not authorized", code: 403 };

  // chek authUser authorise this company
  const authUserInCompany = await prisma.companyUser.findFirst({
    where: { companyId, userId: authUserId },
  });

  if (!authUserInCompany) return { error: "2 User not authorized", code: 403 };

  // check authUser role is OWNER or ADMIN

  if (authUserInCompany.role !== "OWNER" && authUserInCompany.role !== "ADMIN")
    return { error: "User not authorized", code: 403 };

  // check user is in company
  const userInCompany = await prisma.companyUser.findUnique({
    where: { companyId_userId: { companyId, userId } },
  });

  if (!userInCompany) return { error: "User not found", code: 404 };

  // check user role is OWNER owner can not be updated
  if (userInCompany.role === "OWNER")
    return { error: "3 User not authorized", code: 403 };
  // update user

  const updatedUser = await prisma.companyUser.update({
    where: { companyId_userId: { companyId, userId } },
    data: {
      isActive,
      role,
    },
  });

  return updatedUser;
};

export const removeUserFromCompany = async ({ companyId, userId }) => {
  companyId = parseInt(companyId);

  const auth = await getAuth();
  const authUserId = auth.user.id;

  if (!authUserId) return { error: "User not authorized", code: 403 };

  // chek authUser authorise this company
  const authUserInCompany = await prisma.companyUser.findFirst({
    where: { companyId, userId: authUserId },
  });

  if (!authUserInCompany) return { error: "User not authorized", code: 403 };

  // check authUser role is OWNER or ADMIN

  if (authUserInCompany.role !== "OWNER" && authUserInCompany.role !== "ADMIN")
    return { error: "User not authorized", code: 403 };

  // check user is in company
  const userInCompany = await prisma.companyUser.findUnique({
    where: { companyId_userId: { companyId, userId } },
  });

  if (!userInCompany) return { error: "User not found", code: 404 };

  // check user role is OWNER owner can not be updated
  if (userInCompany.role === "OWNER")
    return { error: "User not authorized", code: 403 };

  // remove user

  const removedUser = await prisma.companyUser.delete({
    where: { companyId_userId: { companyId, userId } },
  });

  return removedUser;
};
