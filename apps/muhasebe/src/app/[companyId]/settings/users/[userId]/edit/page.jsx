import { getUserFromCompany } from "@db/index";

import EditUser from "./EditUser";

const Component = async ({ params }) => {
  const companyId = params.companyId;
  const userId = params.userId;

  const res = await getUserFromCompany({
    companyId,
    userId,
  });

  const currentUserRole = res?.currentUserRole;
  const userData = res?.user;
  const companyUserData = res?.companyUser;

  return (
    <>
      <EditUser
        currentUserRole={currentUserRole}
        userData={userData}
        companyUserData={companyUserData}
      />
    </>
  );
};

export const dynamic = "force-dynamic";
export default Component;
