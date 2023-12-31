import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { db } from "@acme/db";
import { Main } from "@acme/ui/atoms";

import { TenantAddUserForm } from "~/components/organisms/tenant-with-users/TenantAddUserForm";

export default async function SettingsTenantAddUserPage() {
  const session = await auth();
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
        <p>{tenantWithUsers.title}</p>
      </div>

      <TenantAddUserForm />
    </Main>
  );
}
