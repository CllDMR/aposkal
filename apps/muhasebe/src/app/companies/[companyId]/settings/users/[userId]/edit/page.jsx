import { EditUser } from "@/components/settings-user-edit/EditUser";
import { getUserFromCompany } from "@/lib/services";

export const dynamic = "force-dynamic";

export default async function Component({ params }) {
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
}
