import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { db } from "@acme/db";
import { Main } from "@acme/ui/atoms";

import { TenantAddUserForm } from "~/components/organisms/tenant-with-users/TenantAddUserForm";

export default async function SettingsTenantAddUserPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const tenantWithUsers = await db.query.tenant.findFirst({
    with: {
      usersToTenants: {
        with: { user: true },
      },
    },
    where: (tenants, { eq }) => eq(tenants.id, session.user.ti),
  });

  if (!tenantWithUsers) notFound();

  return (
    <Main>
      <div className="flex justify-between">
        <p>{tenantWithUsers.name}</p>
      </div>

      <TenantAddUserForm />
    </Main>
  );
}
